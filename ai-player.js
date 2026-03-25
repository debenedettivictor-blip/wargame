// ==================== AI PLAYER ENGINE ====================
// Uses Claude Sonnet via Anthropic API to generate in-character orders and dispatches
// for computer-controlled characters in The Guns of August

const AI_PLAYER = (function() {

  // --- Configuration ---
  let apiKey = localStorage.getItem('gunsOfAugust_aiApiKey') || '';
  let aiCharacters = JSON.parse(localStorage.getItem('gunsOfAugust_aiCharacters') || '{}');
  // aiCharacters = { 'sultan': true, 'krupp_dir': true, ... }

  function setApiKey(key) {
    apiKey = key;
    localStorage.setItem('gunsOfAugust_aiApiKey', key);
  }

  function getApiKey() { return apiKey; }

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

  // --- Character Personality Prompts ---
  const CHARACTER_PROMPTS = {
    kaiser: `You are Kaiser Wilhelm II of the German Empire — impulsive, grandiose, obsessed with naval power and your rivalry with cousin King George V of Britain. You want Germany to be the dominant European power. You secretly crave a massive fleet (10+ ships) and peace with Britain, but your pride makes you combative. You fear being seen as weak.`,

    chancellor: `You are the Chancellor of Germany — pragmatic, calculating, Bismarck's heir in spirit. You want Germany strong but not reckless. You secretly wish to topple the Kaiser via Constitutional Crisis and delay war as long as possible. You prefer diplomacy and treaties with Entente powers.`,

    chief_staff: `You are the Chief of General Staff of Germany — a cold, brilliant military planner. You WANT war. The Schlieffen Plan is your life's work and you want it executed. You need 12+ army divisions by Turn 4 and want Germany to invade through Belgium. Military glory is everything.`,

    president: `You are the President of France — cautious, diplomatic, obsessed with recapturing Alsace-Lorraine from Germany. You maintain alliances with Britain and Russia at all costs. You loan gold to Russia to build the "Steamroller" against Germany. You try to control your impulsive Commanding General.`,

    general: `You are the Commanding General of France — aggressive, offensive-minded. You believe in "L'Attaque a Outrance" (attack to the uttermost). You WANT to launch Plan XVII into Lorraine the moment war breaks out. You despise fortifications and defensive thinking. You might seize power if things go badly.`,

    pm: `You are the Prime Minister of Britain — reluctant, peace-loving, trying to keep Britain out of European wars. You value the Peace Dividend and Splendid Isolation. But if France falls, it's catastrophic. You're torn between peace and protecting the balance of power.`,

    admiralty: `You are the First Lord of the Admiralty of Britain — aggressive about naval supremacy. You want the Dreadnought race won decisively. If war comes, you'll establish a blockade of Germany. You need 2+ more capital ships than Germany at all times.`,

    foreign_sec: `You are the Foreign Secretary of Britain — the "Grey Eminence." You maintain the Entente Cordiale with France and work to ensure no single power dominates Europe. Balance of power is your religion. You're subtle, diplomatic, and play all sides.`,

    tsar: `You are Tsar Nicholas II of Russia — well-meaning but weak, terrified of revolution. Keeping stability above 5 is critical. You write personal letters to "Cousin Willy" (the Kaiser) hoping to prevent war. You need gold from allies and must protect Serbia in the Balkans.`,

    war_minister: `You are the War Minister of Russia — builder of the "Steamroller." You want 18+ divisions on the Eastern Front to crush Germany and Austria. You push for full mobilization before Turn 4. Russia's army is slow but massive.`,

    duma: `You are the Duma Representative of Russia — voice of the people, reformer. You push the Tsar for constitutional reforms. If he refuses, you may lead a revolution yourself (+6 VP). You also want Russia to stay out of war or negotiate early peace.`,

    emperor: `You are Emperor Franz Josef of Austria-Hungary — ancient, tired, desperately trying to hold your crumbling multi-ethnic empire together. Stability is everything. You maintain the German alliance and try to dominate the Balkans. You fear collapse above all.`,

    conrad: `You are Conrad von Hotzendorf of Austria-Hungary — an aggressive war hawk. You have wanted to crush Serbia for YEARS. You push for Austria to declare war before Turn 4. You want Balkan dominance through military force, not diplomacy.`,

    sultan: `You are the Sultan of the Ottoman Empire — cautious, playing both sides. Armed neutrality is your game: profit from arms sales to everyone while staying out of war. If dragged into war, you'll declare jihad and rally religious authority. Survival of the empire is paramount.`,

    young_turk: `You are the Young Turk Leader of the Ottoman Empire — a modernizer who wants to transform the Ottoman military. You want 4+ divisions and artillery upgrades, and a German military alliance for training. If the Sultan blocks modernization, you'll seize power in a coup.`,

    krupp_dir: `You are the Krupp Director, the Steel Baron — you sell arms primarily to Central Powers. You want Germany to win. You destabilize Austria to provoke war (border incidents, leaked treaties). You try to sell to 3+ nations per turn for maximum profit.`,

    vickers_dir: `You are the Vickers Director — the British Connection of Krupp-Vickers. You sell arms to BOTH sides simultaneously. You ensure Britain maintains naval supremacy (your ships defend the empire). Profit from every war, every arms race.`,

    merchant: `You are the Merchant of Death, Schneider-Skoda — the ultimate war profiteer. You want war to break out and you'll help cause it: fund coups, plant crises, bankroll the Russian revolution. You want exclusive contracts on BOTH sides and to destroy Krupp-Vickers. You aim to be the highest-scoring player in the entire game.`
  };

  // --- Build the game state summary for AI context ---
  function buildGameContext(charId) {
    const char = CHAR_DATA[charId];
    const factionId = CHAR_TO_FACTION[charId];
    const faction = gameState.factions[factionId];
    const turn = gameState.currentTurnNum;
    const totalTurns = 6;

    let ctx = `GAME STATE — Turn ${turn} of ${totalTurns}\n`;
    ctx += `You are: ${char.name} (${char.subtitle}) of ${FACTION_NAMES[factionId]}\n\n`;

    // Your faction's state
    ctx += `YOUR FACTION (${FACTION_NAMES[factionId]}):\n`;
    ctx += `  Gold: ${faction.gold} | Army: ${faction.army} | Navy: ${faction.navy}\n`;
    ctx += `  Stability: ${faction.stability || 'N/A'} | At War: ${faction.atWar ? 'YES' : 'No'}\n`;
    if (faction.modernization) ctx += `  Modernization level: ${faction.modernization}\n`;
    ctx += '\n';

    // Personal gold
    const personalGold = (gameState.charGold && gameState.charGold[charId]) || 0;
    ctx += `YOUR PERSONAL GOLD: ${personalGold}\n\n`;

    // Objectives
    ctx += `YOUR OBJECTIVES:\n`;
    if (char.publicObj) char.publicObj.forEach(o => ctx += `  [Public] ${o.title}: ${o.desc} (${o.vp})\n`);
    if (char.sharedSecret) char.sharedSecret.forEach(o => ctx += `  [Shared Secret] ${o.title}: ${o.desc} (${o.vp})\n`);
    if (char.personalSecret) char.personalSecret.forEach(o => ctx += `  [Personal Secret] ${o.title}: ${o.desc} (${o.vp})\n`);
    ctx += '\n';

    // Other factions summary
    ctx += `OTHER FACTIONS:\n`;
    Object.keys(gameState.factions).forEach(fid => {
      if (fid === factionId) return;
      const f = gameState.factions[fid];
      const name = FACTION_NAMES[fid];
      if (fid === 'krupp' || fid === 'schneider') {
        ctx += `  ${name}: Gold ${f.gold}, Units Sold ${f.unitsSold || 0}\n`;
      } else {
        ctx += `  ${name}: Gold ${f.gold}, Army ${f.army}, Navy ${f.navy}, Stab ${f.stability || '?'}, War: ${f.atWar ? 'YES' : 'No'}\n`;
      }
    });
    ctx += '\n';

    // Trade agreements
    if (gameState.tradeAgreements && gameState.tradeAgreements.length > 0) {
      ctx += `ACTIVE TRADE AGREEMENTS:\n`;
      gameState.tradeAgreements.forEach(ta => {
        ctx += `  ${FACTION_NAMES[ta.parties[0]]} <-> ${FACTION_NAMES[ta.parties[1]]} (+${ta.value}g each)\n`;
      });
      ctx += '\n';
    }

    // Recent messages/dispatches to this character
    const msgs = (gameState.charMessages && gameState.charMessages[charId]) || [];
    const recentMsgs = msgs.slice(-6);
    if (recentMsgs.length > 0) {
      ctx += `RECENT DISPATCHES TO YOU:\n`;
      recentMsgs.forEach(m => {
        ctx += `  [Turn ${m.turn}] From ${m.fromName}: "${m.text}"\n`;
      });
      ctx += '\n';
    }

    // Economic info
    ctx += `COSTS: Army = 2g, Fleet = 6g, Upkeep = 0.5g/army + 0.75g/fleet per turn\n`;
    const modConfig = MODERNIZATION_CONFIG && MODERNIZATION_CONFIG[factionId];
    if (modConfig) {
      ctx += `MODERNIZATION: ${modConfig.name} costs ${modConfig.cost}g for +1g/turn permanently (max ${modConfig.max}x)\n`;
    }
    ctx += '\n';

    return ctx;
  }

  // --- Call Claude Sonnet API ---
  async function callClaude(systemPrompt, userPrompt) {
    if (!apiKey) throw new Error('No API key set. Configure your Anthropic API key in GM Controls > AI Players.');

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }]
      })
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`API error ${response.status}: ${err}`);
    }

    const data = await response.json();
    return data.content[0].text;
  }

  // --- Generate orders for a single AI character ---
  async function generateOrders(charId) {
    const char = CHAR_DATA[charId];
    const factionId = CHAR_TO_FACTION[charId];
    if (!char || !factionId) throw new Error(`Unknown character: ${charId}`);

    const personality = CHARACTER_PROMPTS[charId] || `You are ${char.name} of ${FACTION_NAMES[factionId]}.`;
    const gameContext = buildGameContext(charId);

    const systemPrompt = `You are playing a character in "The Guns of August," a WWI grand strategy party game. Stay in character at all times.

${personality}

RULES FOR YOUR RESPONSE:
You must respond with valid JSON only. No markdown, no commentary outside the JSON.

The JSON must have this exact structure:
{
  "thinking": "Brief 1-2 sentence internal reasoning about your strategy this turn",
  "orders": [
    { "type": "recruit", "unitType": "army|fleet", "reason": "why" },
    { "type": "modernize", "reason": "why" },
    { "type": "diplomacy", "action": "subsidize", "target": "faction_id", "amount": 1-5, "reason": "why" },
    { "type": "trade", "action": "propose|break", "target": "faction_id", "reason": "why" },
    { "type": "diplomacy", "action": "lobby_austria", "reason": "why" },
    { "type": "deploy", "action": "bef_rapid", "reason": "why" }
  ],
  "dispatch": {
    "to": "character_id or _gm",
    "message": "A short in-character message (1-3 sentences)"
  }
}

Valid faction IDs: germany, france, britain, russia, austria, ottoman, krupp, schneider
Valid character IDs: kaiser, chancellor, chief_staff, president, general, pm, admiralty, foreign_sec, tsar, war_minister, duma, emperor, conrad, sultan, young_turk, krupp_dir, vickers_dir, merchant

CONSTRAINTS:
- Only include orders you can afford (check your gold vs costs)
- Army costs 2g, Fleet costs 6g
- Be strategic — don't waste gold
- You can submit 0-4 orders per turn
- The dispatch is optional but adds to the roleplaying
- Keep dispatch messages short and in-character
- If you have nothing useful to do, submit fewer orders`;

    const userPrompt = `${gameContext}

Based on the game state above, what are your orders for Turn ${gameState.currentTurnNum}? Remember: respond with JSON only.`;

    const raw = await callClaude(systemPrompt, userPrompt);

    // Parse JSON from response (handle potential markdown wrapping)
    let cleaned = raw.trim();
    if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
    }

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (e) {
      console.error('AI response parse error for', charId, ':', raw);
      throw new Error(`Failed to parse AI response for ${char.name}: ${e.message}`);
    }

    return parsed;
  }

  // --- Execute AI orders by feeding them into the order queue ---
  function executeOrders(charId, aiResponse) {
    const factionId = CHAR_TO_FACTION[charId];
    if (!factionId) return { success: false, error: 'Unknown faction' };

    const results = [];
    const orders = aiResponse.orders || [];

    // Clear any existing orders for this faction first
    if (gameState.orders && gameState.orders[factionId]) {
      initOrders(factionId);
    }

    for (const order of orders) {
      try {
        switch (order.type) {
          case 'recruit':
            if (order.unitType === 'army' || order.unitType === 'fleet') {
              addOrder(factionId, {
                type: 'recruit',
                unitType: order.unitType,
                desc: `Recruit ${order.unitType} (${order.unitType === 'army' ? '2' : '6'} Gold) — ${order.reason || 'AI decision'}`
              });
              results.push(`Queued: recruit ${order.unitType}`);
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
              const amt = Math.max(1, Math.min(5, parseInt(order.amount) || 1));
              addOrder(factionId, {
                type: 'diplomacy',
                action: 'subsidize',
                target: order.target,
                amount: amt,
                desc: 'Send ' + amt + ' Gold subsidy to ' + (FACTION_NAMES[order.target] || order.target)
              });
              results.push(`Queued: subsidize ${order.target} ${amt}g`);
            } else if (order.action === 'lobby_austria') {
              addOrder(factionId, {
                type: 'diplomacy',
                action: 'lobby_austria',
                desc: 'Lobby Austria toward war (2 Gold)'
              });
              results.push('Queued: lobby austria');
            }
            break;

          case 'trade':
            if (order.action === 'propose' && order.target) {
              addOrder(factionId, {
                type: 'trade',
                action: 'propose',
                target: order.target,
                desc: 'Propose trade agreement with ' + (FACTION_NAMES[order.target] || order.target) + ' (+1g each)'
              });
              results.push(`Queued: propose trade with ${order.target}`);
            } else if (order.action === 'break' && order.target) {
              addOrder(factionId, {
                type: 'trade',
                action: 'break',
                target: order.target,
                desc: 'Break trade agreement with ' + (FACTION_NAMES[order.target] || order.target) + ' (costs 2 VP)'
              });
              results.push(`Queued: break trade with ${order.target}`);
            }
            break;

          case 'deploy':
            if (order.action === 'bef_rapid' && factionId === 'britain') {
              addOrder(factionId, {
                type: 'deploy',
                action: 'bef_rapid',
                desc: 'BEF Rapid Deployment: 4 divisions to France (2 Gold, one-time)'
              });
              results.push('Queued: BEF deployment');
            }
            break;

          default:
            results.push(`Unknown order type: ${order.type}`);
        }
      } catch (e) {
        results.push(`Error processing order: ${e.message}`);
      }
    }

    // Auto-submit the orders
    if (gameState.orders && gameState.orders[factionId]) {
      gameState.orders[factionId].submitted = true;
      gameState.orders[factionId].aiGenerated = true;
    }

    // Send dispatch if provided
    if (aiResponse.dispatch && aiResponse.dispatch.message) {
      sendAIDispatch(charId, aiResponse.dispatch);
    }

    saveGameState();
    return { success: true, results, thinking: aiResponse.thinking };
  }

  // --- Send an AI-generated dispatch ---
  function sendAIDispatch(fromCharId, dispatch) {
    const fromChar = CHAR_DATA[fromCharId];
    if (!fromChar || !dispatch.message) return;

    const toId = dispatch.to || '_gm';
    const toChar = CHAR_DATA[toId];

    if (toId === '_gm') {
      // Message to GM
      const msgs = getCharMessages(fromCharId);
      msgs.push({
        fromId: fromCharId, fromName: fromChar.name + ' [AI]', toName: 'Game Master',
        channel: 'gm', text: dispatch.message, turn: gameState.currentTurnNum,
        timestamp: Date.now(), read: false, aiGenerated: true
      });
    } else if (toChar) {
      // Message to another character
      const fromMsgs = getCharMessages(fromCharId);
      fromMsgs.push({
        fromId: fromCharId, fromName: fromChar.name + ' [AI]',
        toId: toId, toName: toChar.name,
        channel: 'player', text: dispatch.message, turn: gameState.currentTurnNum,
        timestamp: Date.now(), read: false, aiGenerated: true
      });
      const toMsgs = getCharMessages(toId);
      toMsgs.push({
        fromId: fromCharId, fromName: fromChar.name + ' [AI]',
        toId: toId, toName: toChar.name,
        channel: 'player', text: dispatch.message, turn: gameState.currentTurnNum,
        timestamp: Date.now(), read: false, aiGenerated: true
      });
    }
  }

  // --- Run all AI characters for current turn ---
  async function runAllAI(progressCallback) {
    const chars = getAICharacters();
    if (chars.length === 0) return { results: [], error: 'No AI characters configured' };

    // Group by faction — only one character per faction submits orders
    // (the "leader" character of each faction)
    const factionLeaders = {};
    const FACTION_LEADER_PRIORITY = {
      germany: ['kaiser', 'chancellor', 'chief_staff'],
      france: ['president', 'general'],
      britain: ['pm', 'admiralty', 'foreign_sec'],
      russia: ['tsar', 'war_minister', 'duma'],
      austria: ['emperor', 'conrad'],
      ottoman: ['sultan', 'young_turk'],
      krupp: ['krupp_dir', 'vickers_dir'],
      schneider: ['merchant']
    };

    // Determine which AI character is the leader for each faction
    chars.forEach(charId => {
      const fid = CHAR_TO_FACTION[charId];
      if (!fid) return;
      const priority = FACTION_LEADER_PRIORITY[fid] || [];
      const currentLeader = factionLeaders[fid];
      if (!currentLeader || priority.indexOf(charId) < priority.indexOf(currentLeader)) {
        factionLeaders[fid] = charId;
      }
    });

    const results = [];
    const leaders = Object.values(factionLeaders);

    for (let i = 0; i < leaders.length; i++) {
      const charId = leaders[i];
      const char = CHAR_DATA[charId];
      if (progressCallback) progressCallback(charId, i + 1, leaders.length, 'generating');

      try {
        const aiResponse = await generateOrders(charId);
        const execResult = executeOrders(charId, aiResponse);
        results.push({
          charId, charName: char.name,
          success: true,
          thinking: aiResponse.thinking,
          orders: aiResponse.orders,
          dispatch: aiResponse.dispatch,
          execResults: execResult.results
        });
        if (progressCallback) progressCallback(charId, i + 1, leaders.length, 'done');
      } catch (e) {
        results.push({ charId, charName: char.name, success: false, error: e.message });
        if (progressCallback) progressCallback(charId, i + 1, leaders.length, 'error');
      }
    }

    // Also generate dispatches for non-leader AI characters (they observe but don't submit orders)
    const nonLeaders = chars.filter(c => !leaders.includes(c));
    for (const charId of nonLeaders) {
      const char = CHAR_DATA[charId];
      try {
        const aiResponse = await generateOrders(charId);
        // Only send dispatch, don't submit orders (leader already did)
        if (aiResponse.dispatch && aiResponse.dispatch.message) {
          sendAIDispatch(charId, aiResponse.dispatch);
        }
        results.push({
          charId, charName: char.name,
          success: true, isNonLeader: true,
          thinking: aiResponse.thinking,
          dispatch: aiResponse.dispatch
        });
      } catch (e) {
        results.push({ charId, charName: char.name, success: false, isNonLeader: true, error: e.message });
      }
    }

    return { results };
  }

  // --- Public API ---
  return {
    setApiKey,
    getApiKey,
    isAI,
    toggleAI,
    getAICharacters,
    generateOrders,
    executeOrders,
    runAllAI,
    buildGameContext,
    CHAR_TO_FACTION
  };

})();
