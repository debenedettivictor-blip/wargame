#!/usr/bin/env node
// V3.2 Balance Simulator — 10 games, turn-by-turn output
// V3.1: Russia cheap divs, Germany cancels Schlieffen if BEF, Austria peace VP +3
// V3.2: Germany Alsace defense bonus, Russia Tsar 10VP public + Balkan/Eastern objectives,
//        Austria/Germany foment revolution, Krupp arms-to-win, France/Britain fund Russia,
//        Russia secret obj = get gold from allies

const NUM_GAMES = 20;

function d6() { return Math.floor(Math.random() * 6) + 1; }
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
function pct(n, p) { return Math.round(n * p); }

// --- Starting state factory ---
function newGame() {
  return {
    turn: 1,
    factions: {
      germany:  { gold: 25, army: 14, navy: 4, vp: 0, stab: 8, atWar: false, warTurns: 0, mobTurn: 0, deployed: false, alsace: true, parisCaptured: false, schlieffenDone: false },
      france:   { gold: 20, army: 12, navy: 4, vp: 0, stab: 7, atWar: false, warTurns: 0, mobTurn: 0, deployed: false, lostAlsace: false, rebellion: false },
      britain:  { gold: 30, army: 8, navy: 14, vp: 0, stab: 9, atWar: false, warTurns: 0, mobTurn: 0, deployed: false, befSent: false },
      russia:   { gold: 18, army: 14, navy: 3, vp: 0, stab: 5, atWar: false, warTurns: 0, mobTurn: 0, deployed: false, revolution: false, allyGoldReceived: 0, easternWins: 0, balkanProtected: true },
      austria:  { gold: 14, army: 8, navy: 2, vp: 0, stab: 5, atWar: false, warTurns: 0, mobTurn: 0, deployed: false, collapsed: false, serbiaConquered: false },
      ottoman:  { gold: 10, army: 6, navy: 2, vp: 0, stab: 4, atWar: false, warTurns: 0, mobTurn: 0, deployed: false },
      krupp:    { gold: 22, vp: 0, sales: 0, cpArmsSold: 0 },
      schneider:{ gold: 16, vp: 0, sales: 0 },
    },
    warDeclaredTurn: 0,
    schlieffen: null, // null, 'success', 'fail'
    blockadeOn: false,
    franceFranceTroops: 0, // BEF in France
    befSize: 0, // size of BEF commitment
    franceLobbySpent: 0, // gold France spent lobbying Britain
    log: [],
  };
}

// Economy constants
const ECON = {
  germany:  { ind: 8, trade: 3, alsaceBonus: 4, peaceGold: 1, peaceVP: 1, maint: f => f.army*0.5 + f.navy*0.75 },
  france:   { ind: 5, trade: 3, peaceGold: 1, peaceVP: 0, maint: f => f.army*0.5 + f.navy*0.75 },
  britain:  { ind: 4, trade: 7, peaceGold: 2, peaceVP: 1, maint: f => f.army*0.5 + f.navy*0.75 },
  russia:   { ind: 5, trade: 2, peaceGold: 1, peaceVP: 2, maint: f => f.army*0.5 + f.navy*0.75 },
  austria:  { ind: 4, trade: 1, peaceGold: 1, peaceVP: 3, maint: f => f.army*0.5 + f.navy*0.75 },
  ottoman:  { ind: 2, trade: 2, straitsBonus: 2, peaceGold: 1, peaceVP: 1, maint: f => f.army*0.5 + f.navy*0.75 },
  krupp:    { ind: 2, trade: 0 },
  schneider:{ ind: 1, trade: 0 },
};

// Trade agreements (each gives +1g to both parties)
const TRADE_AGREEMENTS = [
  ['germany','austria'], ['france','russia'], ['britain','france'],
  ['germany','russia'], ['germany','ottoman'], ['britain','ottoman']
];

function tradeIncome(fid) {
  return TRADE_AGREEMENTS.filter(a => a.includes(fid)).length;
}

function computeIncome(g, fid) {
  const f = g.factions[fid];
  const e = ECON[fid];
  if (fid === 'krupp' || fid === 'schneider') return e.ind;

  let inc = e.ind + e.trade + tradeIncome(fid);
  // Territorial bonuses
  if (fid === 'germany' && f.alsace) inc += e.alsaceBonus;
  if (fid === 'france' && f.lostAlsace === false && g.factions.germany.alsace === false) inc += 4; // recaptured
  if (fid === 'ottoman') inc += (e.straitsBonus || 0);

  // War penalties
  if (f.atWar) {
    inc -= Math.round(e.trade * 0.5); // 50% trade loss
    inc -= 1; // exhaustion
    if (f.warTurns >= 2) inc -= 1; // unrest
  }

  // Blockade (Britain blockades Germany after war)
  if (fid === 'germany' && g.blockadeOn && f.atWar) {
    inc -= e.trade; // rest of trade gone
    if (f.warTurns >= 2) inc -= Math.round(e.ind * 0.35);
    if (f.warTurns >= 3) inc -= Math.round(e.ind * 0.25); // escalates to 60% total
  }

  // Peace dividend
  if (!f.atWar) inc += e.peaceGold;

  // Maintenance
  inc -= Math.round(e.maint(f));

  // Revolution / rebellion
  if (f.revolution) inc -= 2;
  if (f.rebellion) inc -= 2;
  if (f.collapsed) inc -= 2;

  return Math.round(inc);
}

// --- AI Decision Logic ---
// Simplified but plausible: arms dealers sell, nations buy, war starts T4

function simulateTurn(g) {
  const t = g.turn;
  const log = [];
  const majorFids = ['germany','france','britain','russia','austria','ottoman'];

  // --- Phase: Arms purchases (T1-T3) ---
  if (t <= 3) {
    // Krupp sells to Germany (2 divs/turn) — tracked as CP arms
    g.factions.krupp.gold += 4; g.factions.krupp.sales += 2; g.factions.krupp.cpArmsSold += 2;
    g.factions.germany.gold -= 4; g.factions.germany.army += 2;
    log.push(`Krupp sells 2 army to Germany (4g)`);

    // Schneider sells to France (2 divs T1-2, 1 div T3)
    const schnSale = t <= 2 ? 2 : 1;
    const schnCost = schnSale * 2;
    g.factions.schneider.gold += schnCost; g.factions.schneider.sales += schnSale;
    g.factions.france.gold -= schnCost; g.factions.france.army += schnSale;
    log.push(`Schneider sells ${schnSale} army to France (${schnCost}g)`);

    // Russia buys cheap divisions — 1.5g/div discount (Russian conscripts are cheap)
    // Russia takes Krupp loans to fund buildup, creating dealer income + Russian mass
    if (t === 1) {
      // T1: Russia buys 2 cheap divs from Krupp (3g total at 1.5g/div), Krupp loans 2g
      g.factions.krupp.gold += 3; g.factions.krupp.sales += 2;
      g.factions.russia.gold -= 3; g.factions.russia.army += 2;
      log.push(`Krupp sells 2 cheap army to Russia (3g at 1.5g/div)`);
    }
    if (t >= 2) {
      // T2-3: Russia buys 2 divs from Schneider (3g at 1.5g/div) + 1 from Krupp loan
      g.factions.schneider.gold += 3; g.factions.schneider.sales += 2;
      g.factions.russia.gold -= 3; g.factions.russia.army += 2;
      log.push(`Schneider sells 2 cheap army to Russia (3g at 1.5g/div)`);
      // Krupp extends loan: Russia gets 1 more div, owes Krupp later
      g.factions.krupp.gold += 2; g.factions.krupp.sales += 1;
      g.factions.russia.gold -= 2; g.factions.russia.army += 1;
      log.push(`Krupp loans Russia 1 army (2g) — debt fuels the Steamroller`);
    }
  }

  // --- Phase: Mobilization ---
  if (t === 2) {
    // Britain mobilizes T2 (50% chance — hawkish cabinet) to enable BEF by T4
    ['germany','france','russia'].forEach(fid => { g.factions[fid].mobTurn = t; });
    const britEarlyMob = Math.random() < 0.5;
    if (britEarlyMob) {
      g.factions.britain.mobTurn = t;
      log.push(`Germany, France, Russia, Britain begin mobilization (Britain: hawkish cabinet mobilizes early!)`);
    } else {
      log.push(`Germany, France, Russia begin mobilization`);
    }
  }
  if (t === 3) {
    const toMob = ['austria','ottoman'];
    if (g.factions.britain.mobTurn === 0) toMob.push('britain');
    toMob.forEach(fid => { g.factions[fid].mobTurn = t; });
    log.push(`${toMob.map(f => f.charAt(0).toUpperCase()+f.slice(1)).join(', ')} begin mobilization`);
  }

  // Deployment check: Germany/France ready 2 turns after mob. Others 3 turns.
  majorFids.forEach(fid => {
    const f = g.factions[fid];
    if (f.mobTurn === 0) return;
    const fastMob = (fid === 'germany' || fid === 'france');
    const readyTurn = f.mobTurn + (fastMob ? 2 : 2); // simplified: all ready 2 turns after mob
    if (t >= readyTurn) f.deployed = true;
  });

  // --- Phase: Krupp crisis actions (destabilize Austria) ---
  if (t === 1) {
    // Border incident on Austria
    g.factions.krupp.gold -= 2;
    g.factions.austria.stab -= 1;
    log.push(`Krupp: Border Incident on Austria (-1 stab → ${g.factions.austria.stab})`);
  }
  if (t === 2 && Math.random() < 0.6) {
    g.factions.krupp.gold -= 3;
    g.factions.austria.stab -= 1;
    log.push(`Krupp: Leaked Treaty on Austria (-1 stab → ${g.factions.austria.stab})`);
  }

  // --- Phase: Peace VP ---
  majorFids.forEach(fid => {
    const f = g.factions[fid];
    if (!f.atWar) {
      f.vp += ECON[fid].peaceVP;
    }
  });

  // Dealers get VP from sales
  ['krupp','schneider'].forEach(did => {
    if (g.factions[did].sales > 0) {
      g.factions[did].vp += 1; // crisis/sale VP
    }
  });

  // --- Phase: Income ---
  Object.keys(g.factions).forEach(fid => {
    const f = g.factions[fid];
    const inc = computeIncome(g, fid);
    f.gold += inc;
  });

  // --- Phase: War declaration (Turn 4) ---
  if (t === 4 && !g.warDeclaredTurn) {
    g.warDeclaredTurn = 4;
    // Central Powers declare war on Entente
    ['germany','austria'].forEach(fid => { g.factions[fid].atWar = true; g.factions[fid].warTurns = 0; });
    ['france','russia'].forEach(fid => { g.factions[fid].atWar = true; g.factions[fid].warTurns = 0; });

    // Ottoman joins Central Powers ~50% of time
    if (Math.random() < 0.5) {
      g.factions.ottoman.atWar = true; g.factions.ottoman.warTurns = 0;
      log.push(`Ottoman Empire joins Central Powers`);
    }

    // Austria war rally
    g.factions.austria.stab = clamp(g.factions.austria.stab + 2, 0, 10);
    log.push(`Austria war rally: stability +2 → ${g.factions.austria.stab}`);

    // --- Schlieffen Plan decision ---
    // Germany must CHOOSE: execute Schlieffen (invade Belgium → Britain joins) or defend (no Belgium → Britain likely stays out)
    const ger = g.factions.germany;
    const fra = g.factions.france;
    const brit = g.factions.britain;

    if (ger.army >= 16 && ger.deployed) {
      // --- STEP 1: France lobbies Britain for BEF ---
      // France spends gold pre-war (T1-3) convincing Britain to deploy BEF
      // Modeled as: France's diplomatic investment + Britain's readiness
      const franceLobbyGold = Math.min(4, Math.max(0, fra.gold)); // France invests up to 4g in diplomacy
      fra.gold -= franceLobbyGold;
      g.franceLobbySpent = franceLobbyGold;

      // BEF deployment chance: base 30% + 10% per gold France spent lobbying + 20% if Britain mob'd early
      const britishReady = brit.deployed;
      const befChance = clamp(0.3 + (franceLobbyGold * 0.10) + (britishReady ? 0.20 : 0), 0, 0.95);
      const befDeployed = Math.random() < befChance;

      if (befDeployed) {
        // Full BEF deployment — Britain commits big (10 divs if they have them, representing full expeditionary force)
        const befSize = Math.min(10, brit.army);
        g.franceFranceTroops = befSize;
        g.befSize = befSize;
        log.push(`**France lobbied Britain (${franceLobbyGold}g spent). BEF DEPLOYED: ${befSize} divisions cross the Channel!** (chance was ${Math.round(befChance*100)}%)`);
      } else {
        g.befSize = 0;
        log.push(`France lobbied Britain (${franceLobbyGold}g spent) but BEF NOT deployed (chance was ${Math.round(befChance*100)}%). France stands alone.`);
      }

      // --- STEP 2: Germany decides Schlieffen based on BEF presence ---
      if (befDeployed) {
        // Massive BEF in France — Schlieffen is suicide, Germany cancels
        g.schlieffen = 'cancelled';
        ger.schlieffenDone = false;
        log.push(`**SCHLIEFFEN PLAN CANCELLED!** ${g.befSize}-division BEF makes Belgium gamble impossible — Germany digs in.`);
        // No Belgium invasion → no casus belli
        if (Math.random() < 0.2) {
          brit.atWar = true; brit.warTurns = 0;
          log.push(`Britain declares war anyway (hawks: "we're already committed with ${g.befSize} divisions!")`);
        } else {
          g.franceFranceTroops = 0;
          log.push(`**Britain stays NEUTRAL.** BEF deterrent worked — no Belgium invasion, BEF withdraws. Parliament won't authorize offensive war.`);
        }
        log.push(`**WAR: Central Powers vs France/Russia. Germany on full defense.**`);
      } else {
        // No BEF — Germany executes Schlieffen through Belgium!
        log.push(`**WAR DECLARED! Germany executes SCHLIEFFEN PLAN through Belgium!**`);
        // Belgium invasion → Britain outraged, joins ~90%
        if (Math.random() < 0.9) {
          brit.atWar = true; brit.warTurns = 0;
          log.push(`**Britain joins! "Belgian neutrality is sacred!" — full BEF will deploy to France.**`);
          // Britain deploys full BEF to France for combat next turn (10 divs)
          g.befSize = Math.min(10, brit.army);
        } else {
          log.push(`Britain stays neutral despite Belgium (isolationists prevail — rare)`);
        }

        const germanWest = Math.min(ger.army, Math.round(ger.army * 0.75));
        // No BEF in France yet — Schlieffen races to Paris before they arrive
        let modifier = 0;
        if (germanWest >= 18) modifier += 1;
        if (germanWest > fra.army) modifier += 1;
        if (germanWest < fra.army) modifier -= 1;

        const roll = d6();
        const total = roll + modifier;
        ger.schlieffenDone = true;

        if (total >= 4) {
          g.schlieffen = 'success';
          ger.vp += 5;
          ger.parisCaptured = true;
          fra.vp -= 6;
          fra.stab = clamp(fra.stab - 3, 0, 10);
          fra.rebellion = true;
          log.push(`**SCHLIEFFEN PLAN SUCCEEDS!** Roll ${roll} + mod ${modifier} = ${total} ≥ 4. Paris falls! Germany +5 VP, France -6 VP, rebellion.`);
        } else {
          g.schlieffen = 'fail';
          ger.vp -= 3;
          ger.army -= 2;
          log.push(`**SCHLIEFFEN PLAN FAILS!** Roll ${roll} + mod ${modifier} = ${total} < 4. Germany -3 VP, loses 2 divisions.`);
        }
      }
    } else {
      log.push(`Germany cannot execute Schlieffen Plan (army: ${ger.army}, deployed: ${ger.deployed})`);
      if (Math.random() < 0.2) {
        brit.atWar = true; brit.warTurns = 0;
        log.push(`Britain joins anyway (hawks override)`);
      } else {
        log.push(`Britain stays neutral — no Belgian invasion`);
      }
    }

    // Britain blockades Germany IF at war
    if (g.factions.britain.atWar) {
      g.blockadeOn = true;
      log.push(`Britain blockades Germany`);
    }
  }

  // --- Phase: Combat (T4+) ---
  if (t >= 4 && g.warDeclaredTurn) {
    const ger = g.factions.germany;
    const fra = g.factions.france;
    const rus = g.factions.russia;
    const aus = g.factions.austria;
    const brit = g.factions.britain;
    const ott = g.factions.ottoman;

    // Increment war turns
    majorFids.forEach(fid => {
      if (g.factions[fid].atWar) g.factions[fid].warTurns++;
    });

    // Skip first-turn combat if Schlieffen resolved this turn
    if (t > 4 || g.schlieffen === 'fail') {
      // Russia pressing Eastern Front forces Germany to split forces
      const russianPressure = (rus.atWar && rus.deployed && rus.army >= 18);

      // --- Western Front: Germany vs France (+BEF) ---
      if (ger.army > 2 && fra.army > 0 && !fra.rebellion) {
        const gerWestPct = russianPressure ? 0.50 : 0.60;
        const gerWest = Math.round(ger.army * gerWestPct);
        if (russianPressure) log.push(`Russian Steamroller pressure! Germany forced to reinforce east — only ${Math.round(gerWestPct*100)}% committed west.`);

        const fraForce = fra.army + (fra.deployed ? 2 : 0); // fortress bonus
        // BEF: full expeditionary force (up to 10 divs) arrives after Schlieffen turn
        const befAvailable = (brit.atWar && brit.deployed && !brit.befSent && g.befSize > 0) ? g.befSize : 0;
        const befBonus = Math.min(befAvailable, brit.army);
        if (befBonus > 0) { brit.befSent = true; brit.army -= befBonus; log.push(`**BEF arrives on Western Front!** ${befBonus} British divisions reinforce France.`); }
        const fraTotal = fraForce + befBonus;

        // Germany defense: +5 Alsace fortifications (Metz/Strasbourg) + +3 general German defensive quality (superior training, interior lines)
        const alsaceDefense = ger.alsace ? 5 : 0;
        const germanDefense = 3; // Prussian defensive doctrine, interior rail lines
        const gerRoll = gerWest + alsaceDefense + germanDefense + d6();
        const fraRoll = fraTotal + d6();
        const margin = gerRoll - fraRoll;
        log.push(`Germany defense bonuses: Alsace +${alsaceDefense}, Prussian doctrine +${germanDefense}`);

        let gerLoss, fraLoss, result;
        if (margin >= 6) { result = 'Crushing German Victory'; gerLoss = pct(gerWest, 0.1); fraLoss = pct(fraTotal, 0.6); }
        else if (margin >= 3) { result = 'German Victory'; gerLoss = pct(gerWest, 0.25); fraLoss = pct(fraTotal, 0.4); }
        else if (margin >= -2) { result = 'Stalemate'; gerLoss = pct(gerWest, 0.15); fraLoss = pct(fraTotal, 0.15); }
        else if (margin >= -5) { result = 'French Victory'; gerLoss = pct(gerWest, 0.4); fraLoss = pct(fraTotal, 0.25); }
        else { result = 'Crushing French Victory'; gerLoss = pct(gerWest, 0.6); fraLoss = pct(fraTotal, 0.1); }

        ger.army -= Math.min(gerLoss, ger.army - 1);
        fra.army -= Math.min(fraLoss, fra.army);
        log.push(`Western Front: Ger ${gerWest} vs Fra ${fraTotal} → ${result} (margin ${margin}). Ger loses ${gerLoss}, Fra loses ${fraLoss}.`);

        // Alsace-Lorraine changes hands on French victory (one-time)
        if (margin <= -3 && ger.alsace) {
          ger.alsace = false;
          fra.lostAlsace = false;
          fra.vp += 5; // public capture bonus (one-time)
          fra.vp += 7; // secret La Revanche
          log.push(`France captures Alsace-Lorraine! +5 VP (public) + 7 VP (secret La Revanche) = +12 total`);
        }
      }

      // --- Eastern Front: Germany East vs Russia ---
      // Russia commits 70% of army to Eastern Front (aggressive — they WANT this fight)
      if (ger.army > 2 && rus.army > 2 && rus.atWar) {
        const gerEastPct = russianPressure ? 0.40 : 0.30; // Germany forced to match Russian pressure
        const gerEast = Math.round(ger.army * gerEastPct);
        const rusForce = Math.round(rus.army * 0.70); // Russia commits 70% — wants Eastern Front dominance
        const rusMod = rus.deployed ? 0 : -2;

        // German eastern defense: +2 (East Prussian fortifications, Tannenberg-style interior lines)
        const gerEastDefense = 2;
        const gerRoll = gerEast + gerEastDefense + d6();
        const rusRoll = rusForce + rusMod + d6();
        const margin = gerRoll - rusRoll;
        log.push(`Germany eastern defense bonus: +${gerEastDefense}`);

        let gerLoss, rusLoss, result;
        if (margin >= 6) { result = 'Crushing German Victory'; gerLoss = pct(gerEast, 0.1); rusLoss = pct(rusForce, 0.6); }
        else if (margin >= 3) { result = 'German Victory'; gerLoss = pct(gerEast, 0.25); rusLoss = pct(rusForce, 0.4); }
        else if (margin >= -2) { result = 'Stalemate'; gerLoss = pct(gerEast, 0.15); rusLoss = pct(rusForce, 0.15); }
        else if (margin >= -5) { result = 'Russian Victory'; gerLoss = pct(gerEast, 0.4); rusLoss = pct(rusForce, 0.25); }
        else { result = 'Crushing Russian Victory'; gerLoss = pct(gerEast, 0.6); rusLoss = pct(rusForce, 0.1); }

        ger.army -= Math.min(gerLoss, Math.max(0, ger.army - 1));
        rus.army -= Math.min(rusLoss, Math.max(0, rus.army - 1));
        // Track Russian Eastern Front victories
        if (margin <= -3) rus.easternWins++;
        log.push(`Eastern Front: Ger ${gerEast} vs Rus ${rusForce} → ${result} (margin ${margin}). Ger -${gerLoss}, Rus -${rusLoss}.`);
      }

      // --- Balkans: Austria vs Serbia + Russia ---
      if (aus.army > 1 && aus.atWar) {
        const ausForce = Math.round(aus.army * 0.6);
        const serbiaDiv = aus.serbiaConquered ? 0 : 3;
        const rusBalkan = Math.round(rus.army * 0.2);
        const enemyForce = serbiaDiv + rusBalkan;

        if (enemyForce > 0) {
          const ausRoll = ausForce + (aus.deployed ? 0 : -2) + d6();
          const enemyRoll = enemyForce + d6();
          const margin = ausRoll - enemyRoll;

          let ausLoss, enLoss, result;
          if (margin >= 6) { result = 'Crushing Austrian Victory'; ausLoss = pct(ausForce, 0.1); enLoss = pct(enemyForce, 0.6); }
          else if (margin >= 3) { result = 'Austrian Victory'; ausLoss = pct(ausForce, 0.25); enLoss = pct(enemyForce, 0.4); }
          else if (margin >= -2) { result = 'Stalemate'; ausLoss = pct(ausForce, 0.15); enLoss = pct(enemyForce, 0.15); }
          else if (margin >= -5) { result = 'Entente Victory'; ausLoss = pct(ausForce, 0.4); enLoss = pct(enemyForce, 0.25); }
          else { result = 'Crushing Entente Victory'; ausLoss = pct(ausForce, 0.6); enLoss = pct(enemyForce, 0.1); }

          aus.army -= Math.min(ausLoss, Math.max(0, aus.army - 1));
          rus.army -= Math.min(Math.round(enLoss * 0.5), Math.max(0, rus.army - 1));
          if (margin >= 3 && !aus.serbiaConquered) {
            aus.serbiaConquered = true;
            aus.vp += 2;
            rus.balkanProtected = false; // Russia failed to protect Slavic brothers
            log.push(`Austria conquers Serbia! +2 VP. Russia fails to protect the Balkans.`);
          }
          log.push(`Balkans: Aus ${ausForce} vs Entente ${enemyForce} → ${result} (margin ${margin}). Aus -${ausLoss}.`);
        }

        // Austria desertion
        aus.army = Math.max(1, aus.army - 1);
        log.push(`Austria desertion: -1 div. Army: ${aus.army}`);
      }

      // --- Ottoman front (if at war) ---
      if (ott.atWar && brit.atWar && brit.army > 2) {
        const ottForce = ott.army;
        const britForce = Math.min(3, brit.army);
        const ottRoll = ottForce + d6();
        const britRoll = britForce + d6();
        const margin = ottRoll - britRoll;

        let ottLoss, britLoss;
        if (margin >= 3) { ottLoss = pct(ottForce, 0.25); britLoss = pct(britForce, 0.4); }
        else if (margin >= -2) { ottLoss = pct(ottForce, 0.15); britLoss = pct(britForce, 0.15); }
        else { ottLoss = pct(ottForce, 0.4); britLoss = pct(britForce, 0.25); }

        ott.army = Math.max(1, ott.army - ottLoss);
        brit.army = Math.max(1, brit.army - britLoss);
        log.push(`Dardanelles: Ottoman ${ottForce} vs Britain ${britForce} → margin ${margin}. Ott -${ottLoss}, Brit -${britLoss}.`);
      }
    }

    // Stability degradation at war
    majorFids.forEach(fid => {
      const f = g.factions[fid];
      if (f.atWar && f.warTurns >= 2) {
        f.stab = clamp(f.stab - 1, 0, 10);
        if (fid === 'austria') f.stab = clamp(f.stab - 1, 0, 10); // nationality penalty
      }
      // Collapse check
      if (f.stab <= 0 && !f.collapsed) {
        f.collapsed = true;
        f.vp -= 5;
        log.push(`**${fid.toUpperCase()} COLLAPSES!** Stability 0 → -5 VP`);
      }
      // Russia revolution check (stab ≤ 2 after 2 war turns)
      if (fid === 'russia' && f.atWar && f.warTurns >= 3 && f.stab <= 3 && !f.revolution) {
        if (Math.random() < 0.4) {
          f.revolution = true;
          f.vp -= 3;
          log.push(`**RUSSIAN REVOLUTION!** -3 VP, -2 income ongoing`);
        }
      }
    });
  }

  // --- Dealer war dividends ---
  if (g.warDeclaredTurn && g.turn >= g.warDeclaredTurn) {
    const warsActive = majorFids.filter(f => g.factions[f].atWar).length;
    if (warsActive >= 4) {
      g.factions.krupp.gold += 2; g.factions.schneider.gold += 2;
      g.factions.krupp.vp += 1; g.factions.schneider.vp += 1;
    }

    // --- Krupp wartime arms to Germany/Austria (incentivized to help CP win) ---
    if (g.factions.krupp.gold >= 4 && g.factions.germany.atWar) {
      // Krupp sends 1 div to Germany, 1 to Austria during war
      g.factions.krupp.gold -= 4; g.factions.krupp.sales += 2; g.factions.krupp.cpArmsSold += 2;
      g.factions.germany.army += 1; g.factions.germany.gold -= 2;
      log.push(`Krupp wartime sale: 1 army to Germany (2g)`);
      if (g.factions.austria.atWar && g.factions.austria.army >= 2) {
        g.factions.austria.army += 1; g.factions.austria.gold -= 2;
        log.push(`Krupp wartime sale: 1 army to Austria (2g)`);
      }
    }

    // --- France/Britain fund Russia (keep Eastern Front alive) ---
    const rus = g.factions.russia;
    const fra = g.factions.france;
    const brit = g.factions.britain;
    if (rus.atWar && !rus.revolution) {
      // France sends 3g to Russia if France can afford it
      if (fra.atWar && fra.gold >= 6) {
        fra.gold -= 3;
        rus.gold += 3;
        rus.allyGoldReceived += 3;
        log.push(`France sends 3g to Russia (keep the Eastern Front open)`);
      }
      // Britain sends 4g to Russia if Britain can afford it
      if (brit.atWar && brit.gold >= 8) {
        brit.gold -= 4;
        rus.gold += 4;
        rus.allyGoldReceived += 4;
        log.push(`Britain sends 4g to Russia (sustain the Steamroller)`);
      }
    }

    // --- Austria/Germany foment Russian revolution ---
    const ger = g.factions.germany;
    const aus = g.factions.austria;
    if (rus.atWar && !rus.revolution && rus.stab <= 5) {
      // Germany spends 3g to destabilize Russia (Lenin's sealed train!)
      if (ger.gold >= 6 && Math.random() < 0.5) {
        ger.gold -= 3;
        rus.stab = clamp(rus.stab - 1, 0, 10);
        log.push(`Germany funds Russian agitators (-3g) → Russia stability -1 (now ${rus.stab})`);
      }
      // Austria intelligence ops
      if (aus.atWar && aus.gold >= 4 && Math.random() < 0.3) {
        aus.gold -= 2;
        rus.stab = clamp(rus.stab - 1, 0, 10);
        log.push(`Austria intelligence ops in Russia (-2g) → Russia stability -1 (now ${rus.stab})`);
      }
    }
  }

  // Snapshot faction state for display
  const snapshot = {};
  Object.keys(g.factions).forEach(fid => {
    snapshot[fid] = JSON.parse(JSON.stringify(g.factions[fid]));
  });
  g.log.push({ turn: t, events: log, snapshot });
  g.turn++;
}

// --- End-game scoring ---
function scoreGame(g) {
  const scores = {};
  const f = g.factions;

  // Germany: Alsace +8, strongest army +4, Paris +5 (already added), Schlieffen
  let gerSecret = 0;
  if (f.germany.alsace) gerSecret += 8;
  const armies = ['germany','france','britain','russia','austria','ottoman'].map(fid => ({fid, army: f[fid].army}));
  armies.sort((a,b) => b.army - a.army);
  if (armies[0].fid === 'germany') gerSecret += 4;
  // Germany bonus: +3 if Russia had revolution (fomented internal strife)
  if (f.russia.revolution) gerSecret += 3;
  scores.germany = f.germany.vp + gerSecret;

  // France: Alsace capture already counted (+5 public +7 secret in combat)
  let fraSecret = 0;
  // France bonus: +3 if Russia is still fighting (kept ally alive)
  if (f.russia.atWar && !f.russia.revolution) fraSecret += 3;
  // France bonus: +5 if Britain joined the war (successful diplomacy — "l'Entente Cordiale holds!")
  if (f.britain.atWar) fraSecret += 5;
  // France bonus: +3 if BEF was sent to France (convinced Britain to commit troops)
  if (f.britain.befSent) fraSecret += 3;
  scores.france = f.france.vp + fraSecret;

  // Britain: Kaiser Overthrown +7, Splendid Isolation +3, France Must Not Fall -7
  let britSecret = 0;
  if (f.germany.collapsed) britSecret += 7; // Kaiser Overthrown
  if (!f.britain.befSent) britSecret += 3; // Splendid Isolation
  if (f.france.rebellion) britSecret -= 7; // France Must Not Fall
  // Britain bonus: +3 if Russia is still fighting (kept Eastern Front alive)
  if (f.russia.atWar && !f.russia.revolution) britSecret += 3;
  scores.britain = f.britain.vp + britSecret;

  // --- RUSSIA ---
  let rusPublic = 0;
  // PUBLIC: +10 VP if Tsar stays in power (no revolution at game end) — EVERYONE KNOWS THIS
  if (!f.russia.revolution) rusPublic += 10;
  // Secret: +4 VP if protected Balkans (Serbia not conquered by Austria)
  let rusSecret = 0;
  if (f.russia.balkanProtected) rusSecret += 4;
  // Secret: +2 VP if won 2+ Eastern Front battles (dominated the front)
  if (f.russia.easternWins >= 2) rusSecret += 2;
  // Secret: +3 VP if received 8+ gold from allies (successful wartime diplomacy)
  if (f.russia.allyGoldReceived >= 8) rusSecret += 3;
  scores.russia = f.russia.vp + rusPublic + rusSecret;

  // Austria: +3 if Russia had revolution (helped cause internal strife)
  let ausSecret = 0;
  if (f.russia.revolution) ausSecret += 3;
  scores.austria = f.austria.vp + ausSecret;

  // Ottoman
  scores.ottoman = f.ottoman.vp;

  // Krupp: -8 VP if no wars. +5 VP if Central Powers (Germany) has most VP among nations at end (armed the winners)
  let kruppBonus = g.warDeclaredTurn ? 0 : -8;
  // Krupp gets +5 if Germany wins (arms led to victory), +2 if Austria wins
  const nationScores = { germany: f.germany.vp, france: f.france.vp, britain: f.britain.vp, russia: f.russia.vp, austria: f.austria.vp, ottoman: f.ottoman.vp };
  const topNation = Object.entries(nationScores).sort((a,b) => b[1] - a[1])[0][0];
  if (topNation === 'germany') kruppBonus += 5;
  else if (topNation === 'austria') kruppBonus += 3;
  // Krupp bonus for CP arms sold (incentivize arming Germany/Austria): +1 per 4 CP arms
  kruppBonus += Math.floor(f.krupp.cpArmsSold / 4);
  scores.krupp = f.krupp.vp + kruppBonus;

  // Schneider: -8 VP if no wars
  scores.schneider = f.schneider.vp + (g.warDeclaredTurn ? 0 : -8);

  return scores;
}

// --- Individual Player Scoring ---
// Each player gets: faction VP base + personal objectives + gold bonus (+25 if faction received gold)
// The faction's top scorer gets 1.5x multiplier
function scoreIndividualPlayers(g, factionScores) {
  const f = g.factions;
  const players = {};

  // Helper: personal objective rolls (simulated — in real game GM tracks these)
  function personalRoll(chance) { return Math.random() < chance; }

  // --- GERMANY players ---
  const gerBase = factionScores.germany;
  const gerGold = f.germany.gold;

  // Kaiser Wilhelm II
  let kaiserVP = gerBase;
  kaiserVP += 25; // gold bonus (Germany always receives gold from income/trade)
  if (f.germany.navy >= 10) kaiserVP += 4; // Navy Obsession
  if (!f.britain.atWar) kaiserVP += 3; // Cousin George — peace with Britain
  else kaiserVP -= 2; // at war with Britain
  if (personalRoll(0.2)) kaiserVP -= 2; // Fear of Weakness (20% chance Chancellor overrules)
  players.kaiser = { name: 'Kaiser Wilhelm II', faction: 'germany', vp: kaiserVP };

  // Chancellor
  let chanVP = gerBase;
  chanVP += 25;
  if (personalRoll(0.25)) chanVP += 4; // Topple the Kaiser (25% chance)
  if (personalRoll(0.2)) chanVP += 3; // Diplomatic Mastermind (20% chance)
  if (!f.germany.atWar || (g.warDeclaredTurn && g.warDeclaredTurn > 4)) chanVP += 2; // Delay the War
  players.chancellor = { name: 'The Chancellor', faction: 'germany', vp: chanVP };

  // Chief of General Staff
  let cosVP = gerBase;
  cosVP += 25;
  if (f.germany.schlieffenDone) { cosVP += 3; if (g.schlieffen === 'success') cosVP += 3; } // My Legacy
  if (f.germany.army >= 12) cosVP += 2; // Militarism
  cosVP += personalRoll(0.5) ? 2 : 1; // Kingmaker (50/50 Chancellor vs Kaiser)
  players.chief_staff = { name: 'Chief of General Staff', faction: 'germany', vp: cosVP };

  // --- FRANCE players ---
  const fraBase = factionScores.france;

  // President
  let presVP = fraBase;
  presVP += 25;
  if (f.russia.allyGoldReceived >= 5) presVP += 3; // The Banker
  if (personalRoll(0.4)) presVP += 2; // Fortress France (40% built forts)
  if (personalRoll(0.3)) presVP -= 2; else presVP += 2; // Control the General
  players.president = { name: 'The President', faction: 'france', vp: presVP };

  // Commanding General
  let genVP = fraBase;
  genVP += 25;
  if (f.france.atWar) { genVP += 3; if (!f.france.lostAlsace) genVP += 3; } // Plan XVII
  if (personalRoll(0.4)) genVP -= 1; // Offense Over Defense (40% forts built = penalty)
  if (f.france.army <= 8 && personalRoll(0.15)) genVP -= 3; // Military Coup (rare)
  players.general = { name: 'Commanding General', faction: 'france', vp: genVP };

  // --- BRITAIN players ---
  const britBase = factionScores.britain;

  // Prime Minister
  let pmVP = britBase;
  pmVP += 25;
  if (!f.britain.atWar) pmVP += 4; // Keep the Peace
  pmVP += 3; // Imperial Unity (colonies stable — always true in sim)
  players.pm = { name: 'Prime Minister', faction: 'britain', vp: pmVP };

  // First Lord of the Admiralty
  let admVP = britBase;
  admVP += 25;
  if (f.britain.navy >= f.germany.navy + 2) admVP += 4; // Dreadnought Race
  if (f.britain.atWar && g.blockadeOn) admVP += 3; // The Blockade
  players.admiralty = { name: 'First Lord of the Admiralty', faction: 'britain', vp: admVP };

  // Foreign Secretary
  let fsVP = britBase;
  fsVP += 25;
  if (personalRoll(0.5)) fsVP += 3; // Entente Cordiale (50% maintained)
  fsVP += 4; // Balance of Power (no single power dominates — usually true)
  players.foreign_sec = { name: 'Foreign Secretary', faction: 'britain', vp: fsVP };

  // --- RUSSIA players ---
  const rusBase = factionScores.russia;

  // Tsar Nicholas II
  let tsarVP = rusBase;
  tsarVP += 25;
  if (f.russia.stab >= 5) tsarVP += 4; // Dynasty
  if (personalRoll(0.1)) tsarVP += 5; // Cousin Nicky letter (rare)
  players.tsar = { name: 'Tsar Nicholas II', faction: 'russia', vp: tsarVP };

  // War Minister
  let wmVP = rusBase;
  wmVP += 25;
  if (f.russia.army >= 18) wmVP += 3; // The Steamroller
  if (f.russia.deployed) wmVP += 2; // Full Mobilization
  players.war_minister = { name: 'War Minister', faction: 'russia', vp: wmVP };

  // Duma Representative
  let dumaVP = rusBase;
  dumaVP += 25;
  if (f.russia.revolution) dumaVP += 6; // Led the revolution
  else if (personalRoll(0.2)) dumaVP += 4; // Reform accepted
  if (!f.russia.atWar) dumaVP += 3; // Peace Faction
  players.duma = { name: 'Duma Representative', faction: 'russia', vp: dumaVP };

  // --- AUSTRIA players ---
  const ausBase = factionScores.austria;

  // Emperor Franz Josef
  let empVP = ausBase;
  empVP += 25;
  if (!f.austria.collapsed) empVP += 5; // Habsburg Dynasty
  if (personalRoll(0.6)) empVP += 2; // German Alliance maintained
  players.emperor = { name: 'Emperor Franz Josef', faction: 'austria', vp: empVP };

  // Conrad von Hötzendorf
  let conVP = ausBase;
  conVP += 25;
  if (f.austria.serbiaConquered) conVP += 4; // Crush Serbia
  if (f.austria.atWar && (g.warDeclaredTurn && g.warDeclaredTurn <= 4)) conVP += 2; // War Hawk
  players.conrad = { name: 'Conrad von Hötzendorf', faction: 'austria', vp: conVP };

  // --- OTTOMAN players ---
  const ottBase = factionScores.ottoman;

  // Sultan
  let sulVP = ottBase;
  sulVP += 25;
  if (!f.ottoman.atWar) sulVP += 4; // Armed Neutrality
  if (f.ottoman.atWar) sulVP += 3; // Caliphate
  players.sultan = { name: 'The Sultan', faction: 'ottoman', vp: sulVP };

  // Young Turk Leader
  let ytVP = ottBase;
  ytVP += 25;
  if (f.ottoman.army >= 10) ytVP += 3; // Modernize
  if (personalRoll(0.4)) ytVP += 3; // German Alliance
  if (personalRoll(0.15)) ytVP += 2; // Seize Power
  players.young_turk = { name: 'Young Turk Leader', faction: 'ottoman', vp: ytVP };

  // --- ARMS DEALER players ---
  // Krupp Director
  let kdVP = factionScores.krupp;
  kdVP += 25;
  if (f.krupp.sales >= 6) kdVP += 3; // Monopoly (sold to 3+ nations)
  if (personalRoll(0.15)) kdVP += 2; // Sabotage Schneider
  players.krupp_dir = { name: 'Krupp Director', faction: 'krupp', vp: kdVP };

  // Vickers Director
  let vdVP = factionScores.krupp;
  vdVP += 25;
  if (g.warDeclaredTurn) vdVP += 4; // Entente Sales (sold to both sides)
  if (f.britain.navy >= 12) vdVP += 2; // British Interests
  players.vickers_dir = { name: 'Vickers Director', faction: 'krupp', vp: vdVP };

  // Schneider — Merchant of Death
  let merVP = factionScores.schneider;
  merVP += 25;
  if (g.warDeclaredTurn) merVP += 6; // War Architect
  if (personalRoll(0.3)) merVP += 4; // Puppet Master
  if (f.russia.revolution) merVP += 4; // Bankroll the Revolution
  if (personalRoll(0.15)) merVP += 3; // Destroy Krupp
  players.merchant = { name: 'Merchant of Death', faction: 'schneider', vp: merVP };

  // --- Apply 1.5x multiplier to faction winner ---
  // Group players by faction, find top scorer in each faction
  const factionGroups = {};
  for (const [pid, p] of Object.entries(players)) {
    if (!factionGroups[p.faction]) factionGroups[p.faction] = [];
    factionGroups[p.faction].push({ pid, ...p });
  }
  for (const [fac, group] of Object.entries(factionGroups)) {
    group.sort((a, b) => b.vp - a.vp);
    const winner = group[0];
    players[winner.pid].vp = Math.round(winner.vp * 1.5);
    players[winner.pid].factionWinner = true;
  }

  return players;
}

// --- Run simulations ---
console.log(`# The Guns of August — V3.5 Balance: ${NUM_GAMES}-Game Simulation\n`);
console.log('## V3.4 Changes');
console.log('- **Germany**: Alsace +5 defense, Prussian doctrine +3, East Prussia +2. Only attacks via Schlieffen.');
console.log('- **France**: Lobbies Britain for BEF (spends gold). +5 VP if Britain joins, +3 VP if BEF sent, +3 VP if Russia survives.');
console.log('- **BEF**: Now up to 10 divisions (full expeditionary force), not 4.');
console.log('- **Russia**: Commits 70% to Eastern Front. Steamroller (18+ divs) forces Germany to split 50/50 instead of 60/40.');
console.log('- **France peace VP**: 0 (must fight for everything)');
console.log('- **Diplomatic chain**: France lobbies Britain → BEF deployed → deters Schlieffen → Germany must convince Britain to stay out');
console.log('');

const allScores = [];
const allPlayerScores = [];

for (let game = 1; game <= NUM_GAMES; game++) {
  const g = newGame();
  console.log(`---\n## Game ${game}\n`);

  for (let turn = 1; turn <= 6; turn++) {
    simulateTurn(g);
  }

  // Print turn-by-turn
  for (const entry of g.log) {
    console.log(`### Turn ${entry.turn}`);
    const fids = ['germany','france','britain','russia','austria','ottoman','krupp','schneider'];
    for (const fid of fids) {
      const f = entry.snapshot[fid];
      if (fid === 'krupp' || fid === 'schneider') {
        console.log(`- **${fid.charAt(0).toUpperCase()+fid.slice(1)}**: Gold ${f.gold}. VP ${f.vp}. Sales: ${f.sales}.`);
      } else {
        console.log(`- **${fid.charAt(0).toUpperCase()+fid.slice(1)}**: Gold ${f.gold}. Army ${f.army}. VP ${f.vp}. Stab ${f.stab}.${f.atWar ? ' AT WAR (turn '+f.warTurns+').' : ' Peace.'}${f.rebellion ? ' REBELLION!' : ''}${f.collapsed ? ' COLLAPSED!' : ''}${f.revolution ? ' REVOLUTION!' : ''}`);
      }
    }
    for (const evt of entry.events) {
      console.log(`  - ${evt}`);
    }
    console.log('');
  }

  const scores = scoreGame(g);
  console.log('### Final Faction Scores');
  console.log('| Faction | Public VP | Secret Bonus | Total |');
  console.log('|---------|-----------|-------------|-------|');
  const fids = ['germany','france','britain','russia','austria','ottoman','krupp','schneider'];
  for (const fid of fids) {
    const pub = g.factions[fid].vp;
    const secret = scores[fid] - pub;
    console.log(`| ${fid.charAt(0).toUpperCase()+fid.slice(1)} | ${pub} | ${secret >= 0 ? '+' : ''}${secret} | **${scores[fid]}** |`);
  }
  console.log('');

  // Individual player scores
  const playerScores = scoreIndividualPlayers(g, scores);
  console.log('### Individual Player Scores');
  console.log('| Player | Faction | Base | +Gold | +Personal | x1.5? | **Total** |');
  console.log('|--------|---------|------|-------|-----------|-------|-----------|');
  const playersSorted = Object.entries(playerScores).sort((a,b) => b[1].vp - a[1].vp);
  for (const [pid, p] of playersSorted) {
    const factionBase = scores[p.faction];
    const goldBonus = 25;
    const personalBonus = p.factionWinner ? Math.round(p.vp / 1.5) - factionBase - goldBonus : p.vp - factionBase - goldBonus;
    const multiplier = p.factionWinner ? 'YES' : '';
    console.log(`| ${p.name} | ${p.faction} | ${factionBase} | +${goldBonus} | ${personalBonus >= 0 ? '+' : ''}${personalBonus} | ${multiplier} | **${p.vp}** |`);
  }
  console.log('');

  // Overall winner (individual)
  const topPlayer = playersSorted[0];
  console.log(`**FACTION WINNER: ${Object.entries(scores).sort((a,b) => b[1] - a[1])[0][0].toUpperCase()} (${Object.entries(scores).sort((a,b) => b[1] - a[1])[0][1]} VP)**`);
  console.log(`**INDIVIDUAL WINNER: ${topPlayer[1].name} (${topPlayer[1].vp} VP) \u2014 ${topPlayer[1].factionWinner ? '1.5x faction leader bonus!' : ''}`);
  console.log('');

  allScores.push(scores);
  allPlayerScores.push(playerScores);
}

// ==================== FACTION SUMMARY ====================
console.log(`---\n## Faction Summary: ${NUM_GAMES} Games\n`);
console.log('| Faction | Avg VP | Wins | Best | Worst |');
console.log('|---------|--------|------|------|-------|');
const fids = ['germany','france','britain','russia','austria','ottoman','krupp','schneider'];
for (const fid of fids) {
  const vpArr = allScores.map(s => s[fid]);
  const avg = (vpArr.reduce((a,b) => a+b, 0) / vpArr.length).toFixed(1);
  const wins = allScores.filter(s => {
    const sorted = Object.entries(s).sort((a,b) => b[1] - a[1]);
    return sorted[0][0] === fid;
  }).length;
  const best = Math.max(...vpArr);
  const worst = Math.min(...vpArr);
  console.log(`| ${fid.charAt(0).toUpperCase()+fid.slice(1)} | ${avg} | ${wins} | ${best} | ${worst} |`);
}

// ==================== INDIVIDUAL PLAYER SUMMARY ====================
console.log(`\n---\n## Individual Player Summary: ${NUM_GAMES} Games\n`);
console.log('| Player | Faction | Avg VP | Wins | Best | Worst |');
console.log('|--------|---------|--------|------|------|-------|');

// Collect all player IDs
const allPids = Object.keys(allPlayerScores[0]);
const playerSummaries = allPids.map(pid => {
  const vpArr = allPlayerScores.map(ps => ps[pid].vp);
  const avg = (vpArr.reduce((a,b) => a+b, 0) / vpArr.length).toFixed(1);
  const wins = allPlayerScores.filter(ps => {
    const sorted = Object.entries(ps).sort((a,b) => b[1].vp - a[1].vp);
    return sorted[0][0] === pid;
  }).length;
  const best = Math.max(...vpArr);
  const worst = Math.min(...vpArr);
  const name = allPlayerScores[0][pid].name;
  const faction = allPlayerScores[0][pid].faction;
  return { pid, name, faction, avg: parseFloat(avg), wins, best, worst };
}).sort((a, b) => b.avg - a.avg);

for (const p of playerSummaries) {
  console.log(`| ${p.name} | ${p.faction} | ${p.avg.toFixed(1)} | ${p.wins} | ${p.best} | ${p.worst} |`);
}

console.log('\n### Scoring Rules');
console.log('- **Base**: Faction VP (public + secret objectives)');
console.log('- **Gold Bonus**: +25 VP to every player for receiving gold');
console.log('- **Personal**: Individual secret objective bonuses/penalties');
console.log('- **1.5x Multiplier**: Top scorer within each faction gets 1.5x their total');
