// ==================== AI PLAYER ENGINE ====================
// Rule-based AI that runs entirely in the browser — no API calls, no external dependencies.
// Each character has personality-driven decision weights that guide strategic choices.

const AI_PLAYER = (function() {

  // --- Configuration ---
  let aiCharacters = JSON.parse(localStorage.getItem('gunsOfAugust_aiCharacters') || '{}');

  function isAI(charId) { return !!aiCharacters[charId]; }

  function toggleAI(charId) {
    if (aiCharacters[charId]) delete aiCharacters[charId];
    else aiCharacters[charId] = true;
    localStorage.setItem('gunsOfAugust_aiCharacters', JSON.stringify(aiCharacters));
  }

  function getAICharacters() { return Object.keys(aiCharacters).filter(k => aiCharacters[k]); }

  // Map character IDs to their faction IDs
  const CHAR_TO_FACTION = {
    kaiser: 'germany', chancellor: 'germany', chief_staff: 'germany',
    president: 'france', general: 'france',
    pm: 'britain', admiralty: 'britain', foreign_sec: 'britain',
    tsar: 'russia', war_minister: 'russia', duma: 'russia',
    emperor: 'austria', conrad: 'austria',
    sultan: 'ottoman', young_turk: 'ottoman',
    krupp_dir: 'krupp', vickers_dir: 'krupp', merchant: 'schneider'
  };

  function d6() { return Math.floor(Math.random() * 6) + 1; }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function chance(pct) { return Math.random() * 100 < pct; }

  // --- Character personality weights ---
  // Each character has preferences that shape their decisions:
  //   militarism: how much they want to build army (0-10)
  //   navalism: how much they want to build fleet (0-10)
  //   diplomacy: tendency to propose trade/subsidize (0-10)
  //   aggression: tendency toward war, lobbying, breaking treaties (0-10)
  //   economy: tendency to modernize (0-10)
  //   caution: tendency to save gold / do nothing (0-10)
  const PERSONALITIES = {
    kaiser:      { militarism: 6, navalism: 10, diplomacy: 3, aggression: 5, economy: 4, caution: 2 },
    chancellor:  { militarism: 3, navalism: 2, diplomacy: 9, aggression: 2, economy: 7, caution: 7 },
    chief_staff: { militarism: 10, navalism: 1, diplomacy: 1, aggression: 9, economy: 2, caution: 1 },
    president:   { militarism: 5, navalism: 2, diplomacy: 9, aggression: 3, economy: 6, caution: 5 },
    general:     { militarism: 10, navalism: 1, diplomacy: 1, aggression: 8, economy: 1, caution: 1 },
    pm:          { militarism: 2, navalism: 5, diplomacy: 8, aggression: 1, economy: 6, caution: 9 },
    admiralty:   { militarism: 2, navalism: 10, diplomacy: 3, aggression: 5, economy: 3, caution: 3 },
    foreign_sec: { militarism: 1, navalism: 3, diplomacy: 10, aggression: 2, economy: 5, caution: 6 },
    tsar:        { militarism: 3, navalism: 1, diplomacy: 6, aggression: 2, economy: 4, caution: 8 },
    war_minister:{ militarism: 10, navalism: 1, diplomacy: 2, aggression: 6, economy: 3, caution: 2 },
    duma:        { militarism: 1, navalism: 0, diplomacy: 7, aggression: 1, economy: 8, caution: 6 },
    emperor:     { militarism: 3, navalism: 1, diplomacy: 6, aggression: 2, economy: 5, caution: 9 },
    conrad:      { militarism: 9, navalism: 1, diplomacy: 1, aggression: 10, economy: 2, caution: 1 },
    sultan:      { militarism: 3, navalism: 2, diplomacy: 7, aggression: 1, economy: 6, caution: 8 },
    young_turk:  { militarism: 8, navalism: 2, diplomacy: 4, aggression: 5, economy: 7, caution: 2 },
    krupp_dir:   { militarism: 2, navalism: 1, diplomacy: 5, aggression: 7, economy: 3, caution: 4 },
    vickers_dir: { militarism: 1, navalism: 3, diplomacy: 7, aggression: 4, economy: 4, caution: 5 },
    merchant:    { militarism: 1, navalism: 1, diplomacy: 4, aggression: 9, economy: 3, caution: 2 }
  };

  // --- Dispatch templates per character ---
  const DISPATCHES = {
    kaiser: {
      targets: ['tsar', 'pm', '_gm'],
      templates: [
        { to: 'tsar', msgs: [
          "Dearest Nicky — Let us not be drawn into conflict by lesser nations. Our bond as cousins must endure.",
          "Cousin! I propose we discuss terms that benefit both our great empires. War serves neither of us.",
          "My dear Tsar — the arms merchants would profit from our quarrel. Let us deny them that satisfaction."
        ]},
        { to: 'pm', msgs: [
          "To the British government — Germany seeks only her rightful place among nations. Let us speak plainly.",
          "The German fleet sails in friendship! We desire commerce, not conflict, with our British cousins.",
          "I remind London that a strong Germany is a stable Europe. Cooperation, not containment."
        ]},
        { to: '_gm', msgs: [
          "The Kaiser inspects the fleet at Kiel and declares himself satisfied with Germany's growing naval might.",
          "Wilhelm hosts a grand review of the Imperial Army. Morale is excellent.",
          "The Kaiser sends a personal telegram expressing his desire for European peace — on German terms."
        ]}
      ]
    },
    chancellor: {
      targets: ['foreign_sec', 'president', '_gm'],
      templates: [
        { to: 'foreign_sec', msgs: [
          "Berlin would welcome a discreet conversation about mutual interests in maintaining stability.",
          "Perhaps we might find common ground. Germany does not wish to be encircled.",
          "The Chancellor proposes a private channel for frank discussion of the European situation."
        ]},
        { to: 'president', msgs: [
          "France and Germany need not be eternal enemies. Shall we discuss economic cooperation?",
          "The Chancellor suggests that trade between our nations benefits all of Europe.",
          "Berlin is open to negotiation on outstanding matters — if Paris is willing."
        ]},
        { to: '_gm', msgs: [
          "The Chancellor works behind the scenes to moderate the Kaiser's more impulsive tendencies.",
          "Diplomatic cables exchanged with several capitals. The Chancellor seeks balance.",
          "The Chancellor privately expresses concern about the pace of military buildup."
        ]}
      ]
    },
    chief_staff: {
      targets: ['conrad', '_gm'],
      templates: [
        { to: 'conrad', msgs: [
          "Our war plans require coordination. When Austria moves, Germany must be ready.",
          "The General Staff has completed planning. We await only the political decision.",
          "Berlin's military stands ready to support Vienna. The operational timeline is clear."
        ]},
        { to: '_gm', msgs: [
          "The General Staff conducts large-scale exercises simulating a two-front war.",
          "Military planning intensifies. Railway timetables for mobilization are updated.",
          "The Chief of Staff reviews contingency plans with growing satisfaction."
        ]}
      ]
    },
    president: {
      targets: ['tsar', 'pm', '_gm'],
      templates: [
        { to: 'tsar', msgs: [
          "France stands with Russia. Our alliance is the foundation of European balance.",
          "Paris proposes increased financial cooperation. Russian modernization serves us both.",
          "The Republic pledges continued support. Together we ensure peace through strength."
        ]},
        { to: 'pm', msgs: [
          "France values the Entente Cordiale above all. We must stand united.",
          "Should crisis come, Paris trusts London will honor our understanding.",
          "The President requests a frank exchange on the growing German naval program."
        ]},
        { to: '_gm', msgs: [
          "The President addresses the National Assembly on the need for national preparedness.",
          "French diplomats are active across European capitals, reinforcing alliances.",
          "Paris increases military spending while publicly calling for arms limitation talks."
        ]}
      ]
    },
    general: {
      targets: ['war_minister', '_gm'],
      templates: [
        { to: 'war_minister', msgs: [
          "When the hour comes, the French army will strike with fury. Plan XVII is ready.",
          "Russia must mobilize quickly. Germany cannot fight on two fronts if we coordinate.",
          "The Commanding General urges haste in military preparations. Time favors our enemies."
        ]},
        { to: '_gm', msgs: [
          "The General inspects frontier fortifications and pronounces them adequate — but offense wins wars.",
          "Military exercises emphasize aggressive tactics. The spirit of the offensive prevails.",
          "The Commanding General submits a memorandum: France must be ready to attack, not merely defend."
        ]}
      ]
    },
    pm: {
      targets: ['kaiser', 'president', '_gm'],
      templates: [
        { to: 'kaiser', msgs: [
          "His Majesty's Government desires peaceful relations with Germany. Let us avoid misunderstanding.",
          "London views the naval buildup with concern. Perhaps we can reach an understanding.",
          "Britain has no quarrel with Germany — provided Belgian neutrality is respected."
        ]},
        { to: 'president', msgs: [
          "Britain values the Entente but cannot commit to continental engagements prematurely.",
          "The Prime Minister assures Paris of British friendship, while counseling patience.",
          "London monitors events closely. Should the worst come, we will not stand idle."
        ]},
        { to: '_gm', msgs: [
          "The Prime Minister addresses Parliament, emphasizing Britain's commitment to peace.",
          "Cabinet debates the naval estimates. The peace faction remains influential.",
          "The PM privately hopes the European situation will resolve itself without British involvement."
        ]}
      ]
    },
    admiralty: {
      targets: ['pm', '_gm'],
      templates: [
        { to: 'pm', msgs: [
          "The navy requires additional dreadnoughts. We must maintain our two-power standard.",
          "If blockade becomes necessary, the fleet stands ready. But we need more capital ships.",
          "Naval intelligence reports German shipbuilding has accelerated. We must respond."
        ]},
        { to: '_gm', msgs: [
          "The Admiralty orders fleet exercises in the North Sea. Signal to all who observe.",
          "New warship orders placed at British yards. The fleet grows stronger.",
          "The First Lord reviews blockade contingency plans with quiet satisfaction."
        ]}
      ]
    },
    foreign_sec: {
      targets: ['chancellor', 'president', '_gm'],
      templates: [
        { to: 'chancellor', msgs: [
          "London seeks a frank exchange on the European balance. No power should dominate.",
          "The Foreign Secretary notes with interest Berlin's diplomatic overtures.",
          "Britain's position is clear: we support the balance of power, whoever threatens it."
        ]},
        { to: 'president', msgs: [
          "The Entente Cordiale remains the cornerstone of British foreign policy.",
          "The Foreign Secretary assures Paris that London watches the Rhine with keen interest.",
          "Our understanding with France grows stronger. Let us coordinate our diplomatic efforts."
        ]},
        { to: '_gm', msgs: [
          "The Foreign Secretary sends carefully worded dispatches to every major capital.",
          "Quiet diplomacy continues. The Grey Eminence plays a long game.",
          "The balance of power is maintained — for now. The Foreign Secretary remains vigilant."
        ]}
      ]
    },
    tsar: {
      targets: ['kaiser', 'president', '_gm'],
      templates: [
        { to: 'kaiser', msgs: [
          "Dear Willy — I write to you as family. Let our personal bond prevent catastrophe.",
          "Cousin, I beg you — restrain your generals. War between us would be a tragedy.",
          "The Tsar proposes a personal summit. Surely two emperors can settle what diplomats cannot."
        ]},
        { to: 'president', msgs: [
          "Russia values French friendship and investment. Our alliance is unshakeable.",
          "The Tsar thanks France for continued financial support. The Russian army grows stronger.",
          "Together we form a wall against aggression. Russia will not forget French loyalty."
        ]},
        { to: '_gm', msgs: [
          "The Tsar attends a military review but seems distracted by domestic concerns.",
          "Nicholas writes in his diary: 'God grant us peace. The people grow restless.'",
          "The imperial court buzzes with rumors of reform. The Tsar hesitates."
        ]}
      ]
    },
    war_minister: {
      targets: ['general', '_gm'],
      templates: [
        { to: 'general', msgs: [
          "The Steamroller builds momentum. When we coordinate our mobilization, Germany cannot stand.",
          "Russia's army grows daily. The War Minister urges France to prepare offensive plans.",
          "Our forces will be overwhelming — if given time. Hold the line until we arrive."
        ]},
        { to: '_gm', msgs: [
          "The War Minister oversees massive conscription drives. The Russian army expands rapidly.",
          "Railway construction accelerates toward the western frontier. The timetable tightens.",
          "Military exercises reveal the Steamroller's awesome potential — and its logistical challenges."
        ]}
      ]
    },
    duma: {
      targets: ['tsar', '_gm'],
      templates: [
        { to: 'tsar', msgs: [
          "Your Majesty, the people demand reform. Constitutional concessions will strengthen, not weaken, the throne.",
          "The Duma respectfully urges restraint in military spending. The people need bread, not guns.",
          "Reform or revolution — the choice is yours, Majesty. The Duma can help, if you let it."
        ]},
        { to: '_gm', msgs: [
          "The Duma Representative speaks passionately about reform to anyone who will listen.",
          "Underground pamphlets circulate. The reform movement grows despite official disapproval.",
          "The Duma debates fiercely. The moderates hold for now, but radical voices grow louder."
        ]}
      ]
    },
    emperor: {
      targets: ['kaiser', '_gm'],
      templates: [
        { to: 'kaiser', msgs: [
          "Austria relies on the German alliance. Together we maintain order in Central Europe.",
          "The Emperor thanks Berlin for its steadfast support. Our bond is unbreakable.",
          "Franz Josef reminds Germany: stability in Austria means stability for all."
        ]},
        { to: '_gm', msgs: [
          "The aged Emperor works tirelessly to hold his fractious empire together.",
          "Franz Josef approves modest military spending, ever cautious with the treasury.",
          "The Habsburg court functions with clockwork precision. The Emperor endures."
        ]}
      ]
    },
    conrad: {
      targets: ['chief_staff', 'emperor', '_gm'],
      templates: [
        { to: 'chief_staff', msgs: [
          "Serbia must be dealt with! Austria needs German support for a swift campaign.",
          "The moment approaches. Conrad urges Berlin to coordinate war planning immediately.",
          "Our patience with Serbian provocations has limits. Austria will act — with or without allies."
        ]},
        { to: 'emperor', msgs: [
          "Your Majesty, a show of force in the Balkans would restore imperial prestige.",
          "Conrad presents plans for a limited campaign against Serbia. Quick, decisive, surgical.",
          "The military situation demands action. Delay only emboldens our enemies."
        ]},
        { to: '_gm', msgs: [
          "Conrad von Hotzendorf submits yet another memorandum calling for war against Serbia.",
          "Austrian military exercises near the Serbian border send a clear message.",
          "The War Party in Vienna grows louder. Conrad's influence is rising."
        ]}
      ]
    },
    sultan: {
      targets: ['kaiser', 'pm', '_gm'],
      templates: [
        { to: 'kaiser', msgs: [
          "The Ottoman Empire values its friendship with Germany. The Baghdad Railway serves us both.",
          "The Sultan proposes expanded military cooperation. German officers are welcome in Constantinople.",
          "Armed neutrality benefits all parties. The Ottomans will not be drawn into European quarrels."
        ]},
        { to: 'pm', msgs: [
          "The Sublime Porte assures London that the Suez trade route remains secure.",
          "Ottoman neutrality serves British interests. Let us maintain our profitable arrangement.",
          "The Sultan desires only peace and prosperity for his realm."
        ]},
        { to: '_gm', msgs: [
          "The Sultan navigates between European powers, extracting concessions from each.",
          "Constantinople bustles with foreign diplomats. The Sick Man of Europe feels quite well, thank you.",
          "The Ottoman court weighs offers from all sides. Armed neutrality remains the policy."
        ]}
      ]
    },
    young_turk: {
      targets: ['kaiser', '_gm'],
      templates: [
        { to: 'kaiser', msgs: [
          "The Young Turks seek German military expertise. Help us modernize, and we will be firm allies.",
          "A strong Ottoman army serves German interests. We request artillery instructors and modern equipment.",
          "The modernizers in Constantinople look to Berlin as a model. An alliance benefits both."
        ]},
        { to: '_gm', msgs: [
          "The Young Turk movement gains influence. Modernization of the army is their top priority.",
          "Secret meetings in Constantinople. The Young Turks plan their next move carefully.",
          "Military reforms accelerate despite conservative opposition. The old order trembles."
        ]}
      ]
    },
    krupp_dir: {
      targets: ['kaiser', 'conrad', '_gm'],
      templates: [
        { to: 'kaiser', msgs: [
          "Krupp steel is the finest in Europe. The Kaiser's armies deserve the best.",
          "Our factories work day and night. Germany's arsenal grows. Krupp delivers.",
          "The arms race is good for business — and for Germany. Krupp stands ready."
        ]},
        { to: 'conrad', msgs: [
          "Austria-Hungary's military modernization requires Krupp artillery. We offer favorable terms.",
          "A strong Austrian army serves stability — and Krupp's order book. Let us do business.",
          "Krupp can supply divisions at competitive rates. The dual monarchy deserves modern arms."
        ]},
        { to: '_gm', msgs: [
          "Krupp directors meet privately to discuss market conditions. Arms sales are brisk.",
          "The Steel Baron reviews quarterly figures with satisfaction. War fears drive profits.",
          "Krupp lobbyists work the corridors of power in Berlin, Vienna, and Constantinople."
        ]}
      ]
    },
    vickers_dir: {
      targets: ['admiralty', '_gm'],
      templates: [
        { to: 'admiralty', msgs: [
          "Vickers shipyards stand ready to build dreadnoughts for His Majesty's Navy.",
          "Our naval guns are without peer. The Royal Navy's supremacy is Vickers' guarantee.",
          "The Dreadnought race requires investment. Vickers can deliver — at scale."
        ]},
        { to: '_gm', msgs: [
          "Vickers directors explore opportunities on both sides of the Channel.",
          "Arms exports to neutral nations are particularly profitable this quarter.",
          "The British Connection expands Krupp-Vickers' reach across Europe."
        ]}
      ]
    },
    merchant: {
      targets: ['president', 'tsar', '_gm'],
      templates: [
        { to: 'president', msgs: [
          "Schneider-Skoda offers France the finest artillery in Europe. Shall we discuss terms?",
          "The Merchant of Death provides what nations need. France needs arms. We have arms.",
          "Schneider's factories supply the Republic. A partnership forged in steel."
        ]},
        { to: 'tsar', msgs: [
          "Russia's vast armies need modern equipment. Schneider offers generous credit terms.",
          "The Steamroller requires fuel — Schneider-Skoda's guns and shells. Let us do business.",
          "A great empire deserves a great arsenal. Schneider can provide."
        ]},
        { to: '_gm', msgs: [
          "The Merchant of Death counts gold while Europe inches toward catastrophe.",
          "Schneider-Skoda's agents fan the flames of tension in every capital. Business is booming.",
          "Secret arms shipments cross borders under cover of darkness. Schneider profits from all sides."
        ]}
      ]
    }
  };

  // --- Objective analysis: scan what this character needs for VP ---
  function analyzeObjectives(charId, factionId) {
    var char = CHAR_DATA[charId];
    var f = gameState.factions[factionId];
    var needs = { army: false, fleet: false, peace: false, war: false, alliance: false,
                  subsidizeRussia: false, stability: false, modernize: false, navalSupremacy: false,
                  befDeploy: false, befBlock: false, lobbyAustria: false, tradeDeal: false };
    var allObjs = [].concat(char.publicObj || [], char.sharedSecret || [], char.personalSecret || []);

    allObjs.forEach(function(obj) {
      var d = (obj.desc + ' ' + obj.title).toLowerCase();
      // Army objectives
      if (d.includes('army') || d.includes('division') || d.includes('strongest') || d.includes('steamroller') || d.includes('18+') || d.includes('12+') || d.includes('mobiliz')) needs.army = true;
      // Navy objectives
      if (d.includes('navy') || d.includes('fleet') || d.includes('naval') || d.includes('dreadnought') || d.includes('ship') || d.includes('10+ ships')) needs.fleet = true;
      // Peace objectives
      if (d.includes('peace') || d.includes('not at war') || d.includes('not enter war') || d.includes('isolation') || d.includes('never send bef')) { needs.peace = true; needs.befBlock = true; }
      // War objectives
      if (d.includes('crush') || d.includes('invade') || d.includes('conquer') || d.includes('capture') || d.includes('schlieffen') || d.includes('plan xvii') || d.includes('war hawk') || d.includes('preemptive')) needs.war = true;
      // Alliance objectives
      if (d.includes('alliance') || d.includes('entente') || d.includes('maintain alliance') || d.includes('allied')) needs.alliance = true;
      // Subsidize Russia (France)
      if (d.includes('loan russia') || d.includes('gold from allies') || d.includes('fund russia') || d.includes('banker')) needs.subsidizeRussia = true;
      // Stability objectives
      if (d.includes('stability') || d.includes('revolution') || d.includes('collapse') || d.includes('dynasty') || d.includes('endure') || d.includes('reform')) needs.stability = true;
      // Modernization
      if (d.includes('moderniz') || d.includes('artillery upgrade') || d.includes('4+ division')) needs.modernize = true;
      // Naval supremacy
      if (d.includes('naval supremacy') || d.includes('largest navy') || d.includes('2+ more capital')) needs.navalSupremacy = true;
      // BEF
      if (d.includes('bef') || d.includes('ground troops') || d.includes('commit ground') || d.includes('continental war')) needs.befDeploy = true;
      // Blockade
      if (d.includes('blockade')) needs.navalSupremacy = true;
      // Trade / economics
      if (d.includes('trade') || d.includes('colonial') || d.includes('industrial')) needs.tradeDeal = true;
    });

    return needs;
  }

  // --- Core decision logic ---
  // VP-MAXIMIZING: every decision is driven by "does this help me score my personal objectives?"

  function generateOrders(charId) {
    const char = CHAR_DATA[charId];
    const factionId = CHAR_TO_FACTION[charId];
    if (!char || !factionId) return { thinking: 'Unknown character', orders: [], dispatch: null };

    const p = PERSONALITIES[charId];
    const f = gameState.factions[factionId];
    const turn = gameState.currentTurnNum;
    const isDealer = factionId === 'krupp' || factionId === 'schneider';
    const orders = [];
    let thinking = '';

    if (isDealer) {
      return generateDealerOrders(charId, factionId, f, turn, p);
    }

    // Analyze what this character's objectives actually require
    const needs = analyzeObjectives(charId, factionId);
    const gold = f.gold;
    const armyCost = 2;
    const fleetCost = 6;
    const modConfig = MODERNIZATION_CONFIG ? MODERNIZATION_CONFIG[factionId] : null;
    const currentMod = f.modernization || 0;
    const canModernize = modConfig && currentMod < modConfig.max && gold >= modConfig.cost;

    const isEarly = turn <= 2;
    const isMid = turn === 3 || turn === 4;
    const isLate = turn >= 5;
    const atWar = f.atWar;
    let budgetRemaining = gold;

    // --- Priority 1: Objective-critical actions ---

    // Characters who need army strength (Schlieffen, Steamroller, Strongest Army, etc.)
    if (needs.army && budgetRemaining >= armyCost) {
      var armyTarget = (charId === 'war_minister') ? 3 : (charId === 'chief_staff' || charId === 'general') ? 2 : 1;
      if (atWar) armyTarget += 1;
      var armyBuys = 0;
      for (var i = 0; i < armyTarget && budgetRemaining >= armyCost; i++) {
        orders.push({ type: 'recruit', unitType: 'army', reason: 'Objective: need military strength for VP' });
        budgetRemaining -= armyCost;
        armyBuys++;
      }
      if (armyBuys > 0) thinking += 'Building army to meet objectives (' + armyBuys + ' divs). ';
    }

    // Characters who need fleet (Kaiser's Navy Obsession, Admiralty's Dreadnought Race)
    if (needs.fleet && budgetRemaining >= fleetCost) {
      var fleetTarget = needs.navalSupremacy ? 2 : 1;
      // Kaiser: check if navy < 10 (his obsession target)
      if (charId === 'kaiser' && f.navy < 10) fleetTarget = Math.min(2, Math.floor(budgetRemaining / fleetCost));
      // Admiralty: check if we lead Germany by 2+
      if (charId === 'admiralty') {
        var gerNavy = gameState.factions.germany ? gameState.factions.germany.navy : 0;
        if (f.navy - gerNavy < 2) fleetTarget = 2;
      }
      var fleetBuys = 0;
      for (var j = 0; j < fleetTarget && budgetRemaining >= fleetCost; j++) {
        orders.push({ type: 'recruit', unitType: 'fleet', reason: 'Objective: fleet VP target' });
        budgetRemaining -= fleetCost;
        fleetBuys++;
      }
      if (fleetBuys > 0) thinking += 'Building fleet for VP objectives (' + fleetBuys + ' ships). ';
    }

    // Characters who need modernization (Young Turk, economy-focused)
    if (needs.modernize && canModernize && budgetRemaining >= modConfig.cost) {
      orders.push({ type: 'modernize', reason: 'Objective: modernization VP' });
      budgetRemaining -= modConfig.cost;
      thinking += 'Modernizing to score objective. ';
    } else if (canModernize && isEarly && budgetRemaining >= modConfig.cost + 4) {
      // Even without a specific objective, modernize early if we can afford it
      if (chance(p.economy * 10 + 20)) {
        orders.push({ type: 'modernize', reason: 'Long-term income investment' });
        budgetRemaining -= modConfig.cost;
        thinking += 'Investing in economy. ';
      }
    }

    // --- Priority 2: Objective-driven diplomacy ---

    // Characters who need alliances (President's Triple Entente, etc.)
    if (needs.alliance && isEarly && !atWar) {
      var tradeTargets = getTradeOpportunities(factionId);
      if (tradeTargets.length > 0) {
        var target = pick(tradeTargets);
        orders.push({ type: 'trade', action: 'propose', target: target, reason: 'Objective: maintain alliances for VP' });
        thinking += 'Proposing trade with ' + (FACTION_NAMES[target] || target) + ' for alliance VP. ';
      }
    }

    // Characters who should subsidize Russia (President's Banker objective)
    if (needs.subsidizeRussia && budgetRemaining >= 2) {
      var subsidyAmt = Math.min(3, Math.floor(budgetRemaining / 3));
      if (subsidyAmt >= 1) {
        orders.push({ type: 'diplomacy', action: 'subsidize', target: 'russia', amount: subsidyAmt, reason: 'Objective: loan gold to Russia for VP' });
        budgetRemaining -= subsidyAmt;
        thinking += 'Subsidizing Russia (' + subsidyAmt + 'g) for Banker objective. ';
      }
    }

    // Characters who want war (Conrad, Chief of Staff) — lobby Austria
    if (needs.war && !atWar && turn <= 4 && budgetRemaining >= 2) {
      if (factionId !== 'austria' && chance(p.aggression * 10)) {
        orders.push({ type: 'diplomacy', action: 'lobby_austria', reason: 'Objective: need war to score VP' });
        budgetRemaining -= 2;
        thinking += 'Lobbying Austria toward war for my objectives. ';
      }
    }

    // BEF deployment — characters who need it deployed vs those who score from blocking it
    if (factionId === 'britain' && isMid) {
      var befDeployed = f.upgrades && f.upgrades.bef_deployed;
      if (!befDeployed && budgetRemaining >= 2) {
        if (needs.befDeploy && !needs.befBlock && atWar) {
          orders.push({ type: 'deploy', action: 'bef_rapid', reason: 'Objective: deploy BEF for VP' });
          budgetRemaining -= 2;
          thinking += 'Deploying BEF to score VP. ';
        }
        // PM with peace/isolation objectives deliberately does NOT deploy
      }
    }

    // --- Priority 3: General diplomatic actions (non-objective but still useful) ---
    if (budgetRemaining >= 3 && !atWar && orders.length < 3) {
      var allies = getDefaultSubsidyTargets(factionId);
      if (allies.length > 0 && chance(p.diplomacy * 5)) {
        var allyTarget = pick(allies);
        var amt = Math.min(2, Math.floor(budgetRemaining / 3));
        if (amt >= 1) {
          orders.push({ type: 'diplomacy', action: 'subsidize', target: allyTarget, amount: amt, reason: 'Strengthening alliance for faction VP' });
          budgetRemaining -= amt;
          thinking += 'Supporting ' + (FACTION_NAMES[allyTarget] || allyTarget) + '. ';
        }
      }
    }

    // Trade proposals if we don't have one yet
    if (!needs.alliance && isEarly && !atWar && orders.filter(function(o){ return o.type === 'trade'; }).length === 0) {
      var potentialTrades = getTradeOpportunities(factionId);
      if (potentialTrades.length > 0 && chance(30)) {
        var tt = pick(potentialTrades);
        orders.push({ type: 'trade', action: 'propose', target: tt, reason: 'Extra income for future spending' });
        thinking += 'Proposing trade with ' + (FACTION_NAMES[tt] || tt) + '. ';
      }
    }

    // --- Priority 4: Strategic gold transfers (bribe key players who help your objectives) ---
    var personalGold = (gameState.charGold && gameState.charGold[charId]) || 0;
    if (personalGold >= 2) {
      var goldTarget = getGoldTransferTarget(charId, factionId, turn, atWar, p);
      if (goldTarget) {
        orders.push({
          type: 'gold_transfer',
          toCharId: goldTarget.to,
          amount: goldTarget.amount,
          reason: goldTarget.reason
        });
        thinking += goldTarget.thinkMsg + ' ';
      }
    }

    // --- Fallback: personality-driven spending if no objectives triggered ---
    if (orders.length === 0) {
      // Build something based on personality
      if (p.militarism >= 5 && budgetRemaining >= armyCost) {
        orders.push({ type: 'recruit', unitType: 'army', reason: 'General military buildup' });
        thinking += 'Building army (general strategy). ';
      } else if (p.navalism >= 5 && budgetRemaining >= fleetCost) {
        orders.push({ type: 'recruit', unitType: 'fleet', reason: 'General naval buildup' });
        thinking += 'Building fleet (general strategy). ';
      } else {
        thinking += 'Conserving resources — saving gold for VP bonus at endgame. ';
      }
    }

    // --- Generate dispatch ---
    const dispatch = generateDispatch(charId);

    return { thinking: thinking.trim(), orders, dispatch };
  }

  // --- Dealer-specific logic ---
  function generateDealerOrders(charId, factionId, f, turn, p) {
    const orders = [];
    let thinking = '';
    const budgetRemaining = f.gold;

    // Dealers don't recruit or modernize the same way — they mostly observe
    // But they can lobby and do diplomacy
    if (p.aggression >= 6 && turn <= 3 && budgetRemaining >= 2) {
      // Aggressive dealers lobby Austria toward war
      if (chance(p.aggression * 8)) {
        orders.push({ type: 'diplomacy', action: 'lobby_austria', reason: 'Stoking tensions for profit' });
        thinking += 'Lobbying Austria toward war. ';
      }
    }

    // Subsidize a faction to increase influence
    if (p.diplomacy >= 4 && budgetRemaining >= 3) {
      const targets = factionId === 'krupp'
        ? ['germany', 'austria', 'ottoman']
        : ['france', 'russia'];
      if (chance(p.diplomacy * 5)) {
        const target = pick(targets);
        const amount = Math.min(2, Math.floor(budgetRemaining / 4));
        if (amount >= 1) {
          orders.push({ type: 'diplomacy', action: 'subsidize', target: target, amount: amount, reason: 'Investing in client state' });
          thinking += `Subsidizing ${FACTION_NAMES[target]}. `;
        }
      }
    }

    // Dealers also send personal gold to grease palms
    var personalGold = (gameState.charGold && gameState.charGold[charId]) || 0;
    if (personalGold >= 2) {
      var goldTarget = getGoldTransferTarget(charId, factionId, turn, false, p);
      if (goldTarget) {
        orders.push({
          type: 'gold_transfer',
          toCharId: goldTarget.to,
          amount: goldTarget.amount,
          reason: goldTarget.reason
        });
        thinking += goldTarget.thinkMsg + ' ';
      }
    }

    if (!thinking) thinking = 'Observing the market and biding our time.';

    const dispatch = generateDispatch(charId);
    return { thinking: thinking.trim(), orders, dispatch };
  }

  // --- Helper: decide who to send personal gold to ---
  // OBJECTIVE-DRIVEN: each transfer targets someone who can help THIS character score VP
  function getGoldTransferTarget(charId, factionId, turn, atWar, p) {
    var personalGold = (gameState.charGold && gameState.charGold[charId]) || 0;
    if (personalGold < 2) return null;

    // VP-driven gold targets: who do I need to bribe and WHY does it help MY score?
    var GOLD_TARGETS = {
      // Kaiser: needs alliance VP (+1 each) → bribe Austria/Ottoman leaders to stay allied
      //         needs peace with Britain (+3 Cousin George) → bribe PM to stay friendly
      kaiser:      { targets: ['emperor', 'sultan', 'pm'], chance: 35,
        reason: 'Buying alliance loyalty — I need alliance VP and peace with Britain',
        thinkMsg: 'Bribing allies to secure my Alliance and Cousin George VP.' },

      // Chancellor: needs Entente treaty (+3 Diplomatic Mastermind) → bribe Foreign Sec or President
      //             needs to delay war (+2) → bribe cautious leaders
      chancellor:  { targets: ['foreign_sec', 'president', 'pm'], chance: 40,
        reason: 'Buying Entente goodwill — I need a treaty with them for +3 VP',
        thinkMsg: 'Sending gold to Entente — need a treaty for Diplomatic Mastermind VP.' },

      // Chief of Staff: needs war + Schlieffen executed → bribe Conrad to push Austria into war
      //                 needs 12+ army by T4 → bribe arms dealers for equipment
      chief_staff: { targets: ['conrad', 'krupp_dir'], chance: 45,
        reason: 'Funding war preparations — need Schlieffen executed for +6 VP',
        thinkMsg: 'Paying Conrad and Krupp to make war happen — my legacy depends on it.' },

      // President: needs Russia funded (+3 Banker) → send gold to Tsar/War Minister
      //            needs Britain committed (+3 Convince Britain) → bribe PM
      president:   { targets: ['tsar', 'war_minister', 'pm'], chance: 50,
        reason: 'Funding Russia per Banker objective (+3 VP) and lobbying Britain',
        thinkMsg: 'Sending gold to Russia — need 5+ total for Banker VP.' },

      // General: needs war and offensive action (+3/+6 Plan XVII) → fund war hawks
      general:     { targets: ['war_minister', 'conrad', 'chief_staff'], chance: 35,
        reason: 'Funding war hawks — I need war for Plan XVII VP (+6 if it succeeds)',
        thinkMsg: 'Paying war hawks to make the war happen — Plan XVII needs a war.' },

      // PM: needs peace (+4 Keep the Peace) → bribe others toward restraint
      //     needs no France collapse (-7 penalty) → support France
      pm:          { targets: ['chancellor', 'president', 'emperor'], chance: 25,
        reason: 'Buying peace — I lose VP if war comes, so paying for restraint',
        thinkMsg: 'Sending gold to encourage peace — my VP depends on avoiding war.' },

      // Admiralty: needs 2+ more ships than Germany (+4) → fund own faction
      //            needs blockade ready (+3) → invest in readiness
      admiralty:   { targets: ['vickers_dir', 'pm'], chance: 30,
        reason: 'Funding naval supremacy — need Dreadnought Race VP (+4)',
        thinkMsg: 'Investing in naval dominance for Dreadnought Race VP.' },

      // Foreign Sec: needs Entente maintained (+3) → support France
      //              needs balance of power (+4) → prevent any domination
      foreign_sec: { targets: ['president', 'tsar', 'chancellor'], chance: 35,
        reason: 'Maintaining balance of power — no single power can dominate for my +4 VP',
        thinkMsg: 'Funding balance of power — weakening whoever is strongest for my VP.' },

      // Tsar: needs stability > 5 (+4 Dynasty) → placate Duma
      //       needs no revolution (+10 Tsar Survives) → buy reform support
      tsar:        { targets: ['duma', 'war_minister'], chance: 40,
        reason: 'Buying stability — need Duma support to prevent revolution (my +10 VP at stake)',
        thinkMsg: 'Paying Duma to prevent revolution — 10 VP rides on this.' },

      // War Minister: needs 18+ divisions (+3 Steamroller) → buy from arms dealers
      //               needs Eastern Front wins (+2) → fund military coordination
      war_minister:{ targets: ['krupp_dir', 'merchant', 'general'], chance: 35,
        reason: 'Buying arms for the Steamroller — need 18+ divisions for +3 VP',
        thinkMsg: 'Paying arms dealers to build the Steamroller.' },

      // Duma: needs reform or revolution (+4/+6) → fund own cause or bribe Tsar
      duma:        { targets: ['tsar', 'merchant'], chance: 30,
        reason: 'Funding reform agenda — need Tsar to agree for +4 VP (or revolution for +6)',
        thinkMsg: 'Investing in reform or revolution — either path scores VP.' },

      // Emperor: needs alliance with Germany (+2) → keep Kaiser happy
      //          needs stability above 3 (+3) and no collapse (+5) → buy support
      emperor:     { targets: ['kaiser', 'chancellor', 'conrad'], chance: 30,
        reason: 'Keeping the empire together — need German alliance VP and stability',
        thinkMsg: 'Sending gold to maintain German alliance and buy stability.' },

      // Conrad: needs Serbia crushed (+4) and early war (+2) → fund war hawks
      conrad:      { targets: ['chief_staff', 'krupp_dir', 'merchant'], chance: 45,
        reason: 'Funding war preparations — need Serbia crushed for +4 VP and early war for +2',
        thinkMsg: 'Paying everyone who can make war happen — Serbia must fall.' },

      // Sultan: needs survival (+4) and armed neutrality (+4) → buy neutrality from both sides
      sultan:      { targets: ['kaiser', 'pm', 'president'], chance: 25,
        reason: 'Buying neutrality — armed neutrality scores +4 VP if I stay out of war',
        thinkMsg: 'Sending gifts to both sides to maintain profitable neutrality.' },

      // Young Turk: needs 4+ divs + artillery (+3) and German alliance (+3) → fund German ties
      young_turk:  { targets: ['chief_staff', 'krupp_dir', 'kaiser'], chance: 40,
        reason: 'Buying German military alliance — need it for +3 VP modernization objective',
        thinkMsg: 'Paying for German alliance and military training — +3 VP at stake.' },

      // Krupp: needs arms sales VP + German Victory (+5) → fund buyers and war hawks
      krupp_dir:   { targets: ['conrad', 'young_turk', 'chief_staff'], chance: 40,
        reason: 'Creating demand for arms — more war = more sales = more VP',
        thinkMsg: 'Investing in clients who will buy more arms — VP through sales.' },

      // Vickers: needs to sell to both sides (+4) and British naval supremacy (+2)
      vickers_dir: { targets: ['admiralty', 'young_turk', 'war_minister'], chance: 35,
        reason: 'Cultivating buyers on both sides — need dual-side sales for +4 VP',
        thinkMsg: 'Funding buyers on both sides for Entente Sales VP.' },

      // Merchant: needs war to break out (+6), fund revolution (+4), destroy Krupp (+3 each)
      merchant:    { targets: ['duma', 'conrad', 'chief_staff', 'young_turk'], chance: 50,
        reason: 'Fomenting war and revolution — War Architect +6 VP, Revolution +4 VP',
        thinkMsg: 'Bankrolling chaos — war, revolution, instability all score me VP.' }
    };

    var config = GOLD_TARGETS[charId];
    if (!config) return null;

    // Higher chance in later turns (more desperate to score) and when at war
    var adjustedChance = config.chance + (turn >= 4 ? 15 : 0) + (turn >= 5 ? 15 : 0) + (atWar ? 10 : 0);
    if (!chance(adjustedChance)) return null;

    var target = pick(config.targets);
    // Send 1-3 gold, scaled to what we have (never more than half our stash)
    // Send MORE in late game (urgency to score)
    var maxSend = Math.min(turn >= 5 ? 4 : 3, Math.floor(personalGold / 2));
    var amount = Math.max(1, Math.min(maxSend, Math.ceil(Math.random() * (turn >= 4 ? 3 : 2))));

    return {
      to: target,
      amount: amount,
      reason: config.reason,
      thinkMsg: config.thinkMsg
    };
  }

  // --- Helper: get natural subsidy targets for a faction ---
  function getDefaultSubsidyTargets(factionId) {
    const map = {
      germany: ['austria', 'ottoman'],
      france: ['russia', 'britain'],
      britain: ['france'],
      russia: ['france'],
      austria: ['germany'],
      ottoman: ['germany']
    };
    return map[factionId] || [];
  }

  // --- Helper: find factions we could propose trade with but don't already have agreements ---
  function getTradeOpportunities(factionId) {
    const existing = (gameState.tradeAgreements || [])
      .filter(ta => ta.parties.includes(factionId))
      .map(ta => ta.parties.find(p => p !== factionId));

    const potentials = {
      germany: ['austria', 'ottoman', 'russia', 'britain'],
      france: ['russia', 'britain', 'ottoman'],
      britain: ['france', 'ottoman', 'russia'],
      russia: ['france', 'britain'],
      austria: ['germany', 'ottoman'],
      ottoman: ['germany', 'britain', 'france']
    };

    return (potentials[factionId] || []).filter(t => !existing.includes(t));
  }

  // --- Generate an in-character dispatch ---
  function generateDispatch(charId) {
    const templates = DISPATCHES[charId];
    if (!templates) return null;

    // 60% chance to send a dispatch each turn
    if (!chance(60)) return null;

    const targetGroup = pick(templates.templates);
    const message = pick(targetGroup.msgs);

    return { to: targetGroup.to, message: message };
  }

  // --- Execute AI orders by feeding them into the order queue ---
  function executeOrders(charId, aiResponse) {
    const factionId = CHAR_TO_FACTION[charId];
    if (!factionId) return { success: false, error: 'Unknown faction' };

    const results = [];
    const orders = aiResponse.orders || [];

    // Clear any existing orders for this faction first
    initOrders(factionId);

    for (const order of orders) {
      try {
        switch (order.type) {
          case 'recruit':
            if (order.unitType === 'army' || order.unitType === 'fleet') {
              addOrder(factionId, {
                type: 'recruit',
                unitType: order.unitType,
                desc: 'Recruit ' + order.unitType + ' (' + (order.unitType === 'army' ? '2' : '6') + ' Gold) \u2014 ' + (order.reason || 'AI decision')
              });
              results.push('Queued: recruit ' + order.unitType);
            }
            break;

          case 'modernize':
            if (MODERNIZATION_CONFIG && MODERNIZATION_CONFIG[factionId]) {
              addOrder(factionId, {
                type: 'modernize',
                desc: MODERNIZATION_CONFIG[factionId].name + ' (' + MODERNIZATION_CONFIG[factionId].cost + ' Gold, +1g/turn permanently)'
              });
              results.push('Queued: modernize');
            }
            break;

          case 'diplomacy':
            if (order.action === 'subsidize' && order.target && order.amount) {
              var amt = Math.max(1, Math.min(5, parseInt(order.amount) || 1));
              addOrder(factionId, {
                type: 'diplomacy', action: 'subsidize', target: order.target, amount: amt,
                desc: 'Send ' + amt + ' Gold subsidy to ' + (FACTION_NAMES[order.target] || order.target)
              });
              results.push('Queued: subsidize ' + order.target + ' ' + amt + 'g');
            } else if (order.action === 'lobby_austria') {
              addOrder(factionId, {
                type: 'diplomacy', action: 'lobby_austria',
                desc: 'Lobby Austria toward war (2 Gold)'
              });
              results.push('Queued: lobby austria');
            }
            break;

          case 'trade':
            if (order.action === 'propose' && order.target) {
              addOrder(factionId, {
                type: 'trade', action: 'propose', target: order.target,
                desc: 'Propose trade agreement with ' + (FACTION_NAMES[order.target] || order.target) + ' (+1g each)'
              });
              results.push('Queued: propose trade with ' + order.target);
            } else if (order.action === 'break' && order.target) {
              addOrder(factionId, {
                type: 'trade', action: 'break', target: order.target,
                desc: 'Break trade agreement with ' + (FACTION_NAMES[order.target] || order.target) + ' (costs 2 VP)'
              });
              results.push('Queued: break trade with ' + order.target);
            }
            break;

          case 'deploy':
            if (order.action === 'bef_rapid' && factionId === 'britain') {
              addOrder(factionId, {
                type: 'deploy', action: 'bef_rapid',
                desc: 'BEF Rapid Deployment: 4 divisions to France (2 Gold, one-time)'
              });
              results.push('Queued: BEF deployment');
            }
            break;

          case 'gold_transfer':
            if (order.toCharId && order.amount > 0) {
              var fromGold = (gameState.charGold && gameState.charGold[charId]) || 0;
              var sendAmt = Math.min(order.amount, fromGold);
              if (sendAmt > 0) {
                var toCharData = CHAR_DATA[order.toCharId];
                // Transfer the gold
                gameState.charGold[charId] -= sendAmt;
                if (gameState.charGold[order.toCharId] === undefined) gameState.charGold[order.toCharId] = 0;
                gameState.charGold[order.toCharId] += sendAmt;
                // Log for both parties
                if (typeof addCharGoldLogEntry === 'function') {
                  addCharGoldLogEntry(charId, {
                    type: 'sent', amount: -sendAmt, otherCharId: order.toCharId,
                    desc: 'Sent ' + sendAmt + ' gold to ' + (toCharData ? toCharData.name : order.toCharId) + ' — ' + (order.reason || 'AI strategy')
                  });
                  addCharGoldLogEntry(order.toCharId, {
                    type: 'received', amount: sendAmt, otherCharId: charId,
                    desc: 'Received ' + sendAmt + ' gold from ' + char.name + ' [AI]'
                  });
                }
                // Send as player message so both see the transaction
                var transferText = '\u2694 Gold Transfer: ' + sendAmt + ' gold sent \u2014 ' + (order.reason || '');
                var senderMsgs = getCharMessages(charId);
                senderMsgs.push({
                  fromId: charId, fromName: char.name + ' [AI]',
                  toId: order.toCharId, toName: toCharData ? toCharData.name : order.toCharId,
                  channel: 'player', text: transferText, turn: gameState.currentTurnNum,
                  timestamp: Date.now(), read: false, aiGenerated: true
                });
                var recipMsgs = getCharMessages(order.toCharId);
                recipMsgs.push({
                  fromId: charId, fromName: char.name + ' [AI]',
                  toId: order.toCharId, toName: toCharData ? toCharData.name : order.toCharId,
                  channel: 'player', text: transferText, turn: gameState.currentTurnNum,
                  timestamp: Date.now(), read: false, aiGenerated: true
                });
                results.push('Gold transfer: ' + sendAmt + 'g to ' + (toCharData ? toCharData.name : order.toCharId));
              }
            }
            break;

          default:
            results.push('Unknown order type: ' + order.type);
        }
      } catch (e) {
        results.push('Error: ' + e.message);
      }
    }

    // Auto-submit
    if (gameState.orders && gameState.orders[factionId]) {
      gameState.orders[factionId].submitted = true;
      gameState.orders[factionId].aiGenerated = true;
    }

    // Send dispatch
    if (aiResponse.dispatch && aiResponse.dispatch.message) {
      sendAIDispatch(charId, aiResponse.dispatch);
    }

    saveGameState();
    return { success: true, results: results, thinking: aiResponse.thinking };
  }

  // --- Send an AI-generated dispatch ---
  function sendAIDispatch(fromCharId, dispatch) {
    var fromChar = CHAR_DATA[fromCharId];
    if (!fromChar || !dispatch.message) return;

    var toId = dispatch.to || '_gm';
    var toChar = CHAR_DATA[toId];

    if (toId === '_gm') {
      var msgs = getCharMessages(fromCharId);
      msgs.push({
        fromId: fromCharId, fromName: fromChar.name + ' [AI]', toName: 'Game Master',
        channel: 'gm', text: dispatch.message, turn: gameState.currentTurnNum,
        timestamp: Date.now(), read: false, aiGenerated: true
      });
    } else if (toChar) {
      var fromMsgs = getCharMessages(fromCharId);
      fromMsgs.push({
        fromId: fromCharId, fromName: fromChar.name + ' [AI]',
        toId: toId, toName: toChar.name,
        channel: 'player', text: dispatch.message, turn: gameState.currentTurnNum,
        timestamp: Date.now(), read: false, aiGenerated: true
      });
      var toMsgs = getCharMessages(toId);
      toMsgs.push({
        fromId: fromCharId, fromName: fromChar.name + ' [AI]',
        toId: toId, toName: toChar.name,
        channel: 'player', text: dispatch.message, turn: gameState.currentTurnNum,
        timestamp: Date.now(), read: false, aiGenerated: true
      });
    }
  }

  // --- Run all AI characters for current turn ---
  function runAllAI(progressCallback) {
    var chars = getAICharacters();
    if (chars.length === 0) return { results: [], error: 'No AI characters configured' };

    // Group by faction — only one character per faction submits orders
    var factionLeaders = {};
    var FACTION_LEADER_PRIORITY = {
      germany: ['kaiser', 'chancellor', 'chief_staff'],
      france: ['president', 'general'],
      britain: ['pm', 'admiralty', 'foreign_sec'],
      russia: ['tsar', 'war_minister', 'duma'],
      austria: ['emperor', 'conrad'],
      ottoman: ['sultan', 'young_turk'],
      krupp: ['krupp_dir', 'vickers_dir'],
      schneider: ['merchant']
    };

    chars.forEach(function(charId) {
      var fid = CHAR_TO_FACTION[charId];
      if (!fid) return;
      var priority = FACTION_LEADER_PRIORITY[fid] || [];
      var currentLeader = factionLeaders[fid];
      if (!currentLeader || priority.indexOf(charId) < priority.indexOf(currentLeader)) {
        factionLeaders[fid] = charId;
      }
    });

    var results = [];
    var leaders = Object.values(factionLeaders);

    for (var i = 0; i < leaders.length; i++) {
      var charId = leaders[i];
      var char = CHAR_DATA[charId];
      if (progressCallback) progressCallback(charId, i + 1, leaders.length, 'generating');

      try {
        var aiResponse = generateOrders(charId);
        var execResult = executeOrders(charId, aiResponse);
        results.push({
          charId: charId, charName: char.name,
          success: true,
          thinking: aiResponse.thinking,
          orders: aiResponse.orders,
          dispatch: aiResponse.dispatch,
          execResults: execResult.results
        });
        if (progressCallback) progressCallback(charId, i + 1, leaders.length, 'done');
      } catch (e) {
        results.push({ charId: charId, charName: char.name, success: false, error: e.message });
        if (progressCallback) progressCallback(charId, i + 1, leaders.length, 'error');
      }
    }

    // Non-leader AI characters just send dispatches
    var nonLeaders = chars.filter(function(c) { return leaders.indexOf(c) === -1; });
    for (var j = 0; j < nonLeaders.length; j++) {
      var nlCharId = nonLeaders[j];
      var nlChar = CHAR_DATA[nlCharId];
      try {
        var nlResponse = generateOrders(nlCharId);
        if (nlResponse.dispatch && nlResponse.dispatch.message) {
          sendAIDispatch(nlCharId, nlResponse.dispatch);
        }
        results.push({
          charId: nlCharId, charName: nlChar.name,
          success: true, isNonLeader: true,
          thinking: nlResponse.thinking,
          dispatch: nlResponse.dispatch
        });
      } catch (e) {
        results.push({ charId: nlCharId, charName: nlChar.name, success: false, isNonLeader: true, error: e.message });
      }
    }

    return { results: results };
  }

  // --- Public API ---
  return {
    isAI: isAI,
    toggleAI: toggleAI,
    getAICharacters: getAICharacters,
    generateOrders: generateOrders,
    executeOrders: executeOrders,
    runAllAI: runAllAI,
    CHAR_TO_FACTION: CHAR_TO_FACTION
  };

})();
