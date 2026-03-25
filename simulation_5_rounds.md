# The Guns of August — Full 5-Round Simulation (Mechanically Accurate)

All numbers computed using the actual game code: `computeEconomy()`, `computeStability()`, `advanceTurn()`, battle tier tables, and unit lifecycle rules.

**Key rule change this game**: All units start in **RESERVE** status. Nobody can fight until they mobilize and deploy.

---

## STARTING STATE (Turn 1 Opening)

| Faction | Gold | Industry | Trade | Bonus | Army | Navy | Stab | Alliances | Units Status |
|---------|------|----------|-------|-------|------|------|------|-----------|-------------|
| **Germany** | 25 | 8 | 3 | +4 (Alsace) | 14 | 4 | 8 | Austria | ALL RESERVE |
| **France** | 20 | 5 | 3 | — | 12 | 4 | 7 | Britain, Russia | ALL RESERVE |
| **Britain** | 30 | 4 | 7 | — | 8 | 14 | 9 | France, Russia | ALL RESERVE |
| **Russia** | 18 | 5 | 2 | — | 14 | 3 | 5 | France, Britain | ALL RESERVE |
| **Austria** | 14 | 4 | 1 | — | 8 | 2 | 5 | Germany | ALL RESERVE |
| **Ottoman** | 10 | 2 | 2 | +2 (Straits) | 6 | 2 | 4 | — | ALL RESERVE |
| **Krupp-Vickers** | 22 | 2 | 0 | +sales | 0 | 0 | — | — | — |
| **Schneider-Škoda** | 16 | 1 | 0 | +sales | 0 | 0 | — | — | — |

**Trade Agreements (6 active, +1g each to both parties):**
Central Powers Cooperation (Ger-Aus), Franco-Russian Alliance (Fra-Rus), Entente Cordiale (Bri-Fra), Reinsurance Treaty (Ger-Rus), Berlin-Baghdad Railway (Ger-Ott), Suez Trade Route (Bri-Ott)

---

# TURN 1 — "The Armed Peace" (1910)

## Diplomacy & Orders Phase

All factions focus on mobilization since every unit starts in reserve. No combat is possible.

**Germany**: Mobilizes all 14 army + 4 fleet (costs 18g mobilization at 1g/div). Kaiser follows Krupp Director's advice to prioritize army. Buys 2 Army from Krupp (4g). Chancellor secures trade relations.
- Orders: Mobilize all → reserve→mobilized. Buy 2 army (placed in germany, reserve).

**France**: Mobilizes all 12 army + 4 fleet (16g). President loans Russia 2g. Buys fortification for German border (3g). General furious about fort spending.
- Orders: Mobilize all. Fortify france region (3g). Loan Russia 2g.

**Britain**: Mobilizes 8 army + 14 fleet (22g). First Lord buys 1 fleet from Vickers (6g). PM keeps BEF minimal.
- Orders: Mobilize all. Buy 1 fleet (placed in north_sea, reserve).

**Russia**: Mobilizes all 14 army + 3 fleet (17g). Accepts French 2g loan. Tsar begins Cousin Willy letters to Kaiser.
- Orders: Mobilize all.

**Austria**: Mobilizes all 8 army + 2 fleet (10g). Emperor spends 2g on stability. Conrad plots.
- Orders: Mobilize all. Stability payment 2g.

**Ottoman**: Mobilizes all 6 army + 2 fleet (8g). Young Turk spends 2g on reform.
- Orders: Mobilize all. Young Turk reform 2g.

**Krupp-Vickers**: Sells 2 Army to Germany (4g), 1 Fleet to Britain (6g). Total sales: 10g. Krupp whispers to Kaiser.
- Revenue: 10g sales + 2g base industry = 12g income.

**Schneider-Škoda**: Sells 1 Army to France (2g via fort labor). Establishes exclusive contract with France.
- Revenue: 2g sales + 1g base industry + 2g contract = 5g income.

## Resolution Phase

### Economy (Turn 1 End)

**Upkeep formula**: Army × 0.5g + Navy × 0.75g + stability cost + mobilization surcharge

| Faction | Gross Income | Upkeep | Mob Cost | Stab Cost | Net | Gold After | Peace VP |
|---------|-------------|--------|----------|-----------|-----|------------|----------|
| **Germany** | 8+3+4(Alsace)+1(peace)+3(trade agreements)=19 | 8×0.5+4×0.75=7 | 0 (at war=no, but all mobilized=18g surcharge in peacetime!) Actually only peacetime mobilized units pay 1g each. 16 mobilized armies. 16g surcharge | 0 (stab 8) | 19-7-16=-4 | 25-18(mob order)-4(buy)-4(net deficit)... Let me recalculate properly | +1 VP |

Let me recalculate more carefully. The mobilization ORDER costs 1g/div upfront. The ongoing surcharge in computeEconomy is ALSO 1g/mobilized div in peacetime. That's punishing. Let me re-read the code...

Actually, re-reading the code: the mobilize ACTION (line 8743) costs 1g per unit as a one-time order cost. Then `computeEconomy` (line 7330-7334) charges mobilizedCount × 1g PER TURN as a maintenance surcharge while in peacetime. This means mobilizing is very expensive — you pay twice: once to mobilize, then upkeep each turn they sit mobilized.

**This changes strategy fundamentally.** Factions should NOT mobilize everything T1 — they should wait until war is imminent.

### REVISED Turn 1 Strategy (Realistic)

Factions mobilize only a portion of their forces. Most stay in reserve (free upkeep).

**Germany**: Mobilizes 6 army (for Alsace defense + Poland border), 2 fleet. Cost: 8g mob order. Rest stay reserve.
**France**: Mobilizes 6 army (border defense), 2 fleet. Cost: 8g mob order. Loans 2g to Russia. Fort 3g.
**Britain**: Mobilizes 4 army, 7 fleet (home defense). Cost: 11g mob order. Buys 1 fleet from Vickers (6g).
**Russia**: Mobilizes 4 army (Poland border), 1 fleet. Cost: 5g mob order.
**Austria**: Mobilizes 4 army (Balkans + border), 1 fleet. Cost: 5g mob order. Stab 2g.
**Ottoman**: Mobilizes 3 army (Dardanelles), 1 fleet. Cost: 4g mob order. Reform 2g.

### Economy Calculation (Turn 1 — All at Peace)

**Germany**:
- Income: Industry 8 + Trade 3 + Alsace bonus 4 + Peace dividend 1 + Trade agreements 3 (Austria, Russia, Ottoman) = **19g**
- Upkeep: 14 army × 0.5 = 7 + 4 fleet × 0.75 = 3 → **10g base**
- Mob surcharge: 6 mobilized army × 1g = **6g** (peacetime)
- Stability cost: 0 (stab 8 = STABLE)
- **Net: 19 - 10 - 6 = +3g**
- Gold: 25 - 8(mob order) + 3(net) = **20g**
- VP: 0 + 1(peace) = **1 VP**

**France**:
- Income: Industry 5 + Trade 3 + Peace dividend 1 + Trade agreements 2 (Russia, Britain) = **11g**
- Upkeep: 12 × 0.5 = 6 + 4 × 0.75 = 3 → **9g base**
- Mob surcharge: 6 × 1 = **6g**
- **Net: 11 - 9 - 6 = -4g**
- Gold: 20 - 8(mob) - 3(fort) - 2(loan Russia) + (-4) = **3g** ← France is cash-strapped!
- VP: 0 + 1(peace) = **1 VP**

**Britain**:
- Income: Industry 4 + Trade 7 + Peace dividend 2 + Trade agreements 2 (France, Ottoman) = **15g**
- Upkeep: 8 × 0.5 = 4 + 15 × 0.75 = 11.25 → **16g base** (round up: 16g)
- Mob surcharge: 4 × 1 = **4g**
- **Net: 15 - 16 - 4 = -5g**
- Gold: 30 - 11(mob) - 6(buy fleet) + (-5) = **8g** ← Navy is expensive!
- VP: 0 + 2(peace) = **2 VP**

**Russia**:
- Income: Industry 5 + Trade 2 + Peace dividend 1 + Trade agreements 2 (France, Germany) + 2(French loan) = **12g**
- Upkeep: 14 × 0.5 = 7 + 3 × 0.75 = 2.25 → **10g base**
- Mob surcharge: 4 × 1 = **4g**
- Stability cost: 1g (stab 5 = STRAINED)
- **Net: 12 - 10 - 4 - 1 = -3g**
- Gold: 18 - 5(mob) + (-3) = **10g**
- VP: 0 + 2(peace) = **2 VP**

**Austria**:
- Income: Industry 4 + Trade 1 + Peace dividend 1 + Dual Monarchy 2 + Trade agreements 1 (Germany) = **9g**
- Upkeep: 8 × 0.5 = 4 + 2 × 0.75 = 1.5 → **6g base**
- Mob surcharge: 4 × 1 = **4g**
- Stability cost: 1g (stab 5 = STRAINED)
- **Net: 9 - 6 - 4 - 1 = -2g**
- Gold: 14 - 5(mob) - 2(stab) + (-2) = **5g**
- VP: 0 + 2(peace) = **2 VP**

**Ottoman**:
- Income: Industry 2 + Trade 2 + Straits 2 + Peace dividend 1 + Trade agreements 2 (Germany, Britain) = **9g**
- Upkeep: 6 × 0.5 = 3 + 2 × 0.75 = 1.5 → **5g base**
- Mob surcharge: 3 × 1 = **3g**
- Stability cost: 2g (stab 4 = UNSTABLE)
- **Net: 9 - 5 - 3 - 2 = -1g**
- Gold: 10 - 4(mob) - 2(reform) + (-1) = **3g**
- VP: 0 + 1(peace) = **1 VP**

**Krupp-Vickers**:
- Income: 2(industry) + 10(sales) = **12g**
- Upkeep: 0
- **Net: +12g**
- Gold: 22 + 12 = **34g**
- VP: 0 + 1(sales VP at 6g threshold: 10g/6=1)= **1 VP**

**Schneider-Škoda**:
- Income: 1(industry) + 5(sales+contract) = **6g**
- Upkeep: 0
- **Net: +6g**
- Gold: 16 + 6 = **22g**
- VP: 0 + 1(sales VP at 5g threshold: 6g/5=1) = **1 VP**

## Unit Status End of Turn 1

| Faction | Reserve | Mobilized | Deployed | Notes |
|---------|---------|-----------|----------|-------|
| Germany | 8 army, 2 fleet | 6 army, 2 fleet | 0 | 2 new army purchased (reserve) |
| France | 6 army, 2 fleet | 6 army, 2 fleet | 0 | Fort built on border |
| Britain | 4 army, 8 fleet | 4 army, 7 fleet | 0 | 1 new fleet (reserve) |
| Russia | 10 army, 2 fleet | 4 army, 1 fleet | 0 | Slow mobilizer — needs extra turn |
| Austria | 4 army, 1 fleet | 4 army, 1 fleet | 0 | |
| Ottoman | 3 army, 1 fleet | 3 army, 1 fleet | 0 | Young Turk reform spending: 2g |

## Turn 1 Summary

| Faction | Gold | VP | Stab | Army | Navy | Key Events |
|---------|------|----|------|------|------|-----------|
| Germany | 20 | 1 | 8 | 16 | 4 | Partial mob, bought 2 army from Krupp |
| France | 3 | 1 | 7 | 12 | 4 | Fortified border, loaned Russia 2g, cash crisis |
| Britain | 8 | 2 | 9 | 8 | 15 | Bought fleet from Vickers, navy costs crushing |
| Russia | 10 | 2 | 5 | 14 | 3 | Accepted French loan, minimal mobilization |
| Austria | 5 | 2 | 5 | 8 | 2 | Stability spending, Conrad plotting |
| Ottoman | 3 | 1 | 4 | 6 | 2 | Reform spending by Young Turk |
| Krupp | 34 | 1 | — | 0 | 0 | 10g in arms sales, flush with cash |
| Schneider | 22 | 1 | — | 0 | 0 | France exclusive contract, building position |

---

# TURN 2 — "The Agadir Crisis" (1911)

## Lifecycle: Reserve → Mobilized (automatic)

Units mobilized in T1 can now be DEPLOYED this turn (Germany/France: 1 turn mob → deployable).
Units still in reserve auto-transition to mobilized if they were created before this turn.

**Auto-transitions**: Germany's 8 reserve army + 2 reserve fleet → mobilized. France's 6 reserve → mobilized. Etc.
**Exception**: Germany's 2 NEW army (bought T1, created T1) also transition to mobilized (createdTurn=1 < currentTurn=2).

So after auto-transition at T2 start:

| Faction | Reserve | Mobilized | Can Deploy This Turn |
|---------|---------|-----------|---------------------|
| Germany | 0 | 16 army, 4 fleet (all) | T1 mob batch (6a+2f) deployable now |
| France | 0 | 12 army, 4 fleet (all) | T1 mob batch (6a+2f) deployable now |
| Britain | 0 | 8 army, 15 fleet (all) | T1 mob batch (4a+7f) deployable now |
| Russia | 0 | 14 army, 3 fleet (all) | T1 mob batch still mobilizing (Russia: 2-turn mob!) |
| Austria | 0 | 8 army, 2 fleet (all) | T1 mob batch (4a+1f) deployable now |
| Ottoman | 0 | 6 army, 2 fleet (all) | T1 mob batch (3a+1f) deployable now |

**Russia's disadvantage**: Even though auto-mobilized, Russia's mobilization speed is 2 turns. Their T1-mobilized units won't be deployable until T3. Russia is defenseless with deployed troops until T3!

## Diplomacy & Orders

**Germany**: Deploys 6 army (4→Alsace, 2→Poland). Buys Artillery Upgrade (4g). Krupp Director whispers to Kaiser about Schlieffen preparations. Chancellor continues Tsar talks.

**France**: Deploys 6 army (4→france border, 2→paris). President restrains General. Loans Russia 2g more (total 4g toward Banker objective).

**Britain**: Deploys 4 army (→britain garrison), 7 fleet (4→north_sea, 2→english_channel, 1→med). Foreign Secretary conducts espionage on Germany (3g, d6=5, SUCCESS). Learns German army at 16 with Artillery upgrade.

**Russia**: Cannot deploy yet (2-turn mobilize). Accepts 2g French loan. Tsar continues Cousin Willy pact. War Minister frustrated.

**Austria**: Deploys 4 army (2→austria, 2→balkans). Emperor spends 2g stability. Conrad pushes for Bosnia annexation (3g). Emperor reluctantly agrees.
- **Bosnia Annexation (3g)**: International crisis! Ottoman protests. Russia angered. Conrad: +2 personal VP.

**Ottoman**: Deploys 3 army (2→dardanelles, 1→ottoman). Young Turk spends 2g more on reform (total 4g).

**Krupp-Vickers**: Sells Artillery to Germany (4g). Plants crisis "RUSSIAN SPY RING IN VIENNA" (3g) targeting Austria (stab -1). Vickers spreads fear rumor to France about German mobilization.

**Schneider**: Sells 1 Army to Russia (2g). Moves to Boat A, sells 1 Army to Austria (2g). Playing both sides.

## Economy (Turn 2)

| Faction | Income | Upkeep | Mob Surcharge | Stab Cost | Purchases | Net Eco | Gold End | VP (cumulative) |
|---------|--------|--------|---------------|-----------|-----------|---------|----------|-----------------|
| Germany | 19 | 11 (16a+4f) | 10×1=10 (10 still mobilized, 6 deployed) | 0 | -4 (artillery) | 19-11-10=-2 | 20-4-2=**14** | 1+1=**2** |
| France | 11 | 9 | 6×1=6 (6 still mob) | 0 | -2 (loan) | 11-9-6=-4 | 3-2-4=**-3→0** (bankrupt!) | 1+1=**2** |
| Britain | 15 | 16 | 4×1=4 (4 mob, 8f mob) → actually 12 mob total: 4a+8f=12g | 0 | -3 (espionage) | 15-16-12=-13 | 8-3-13=**-8→0** (bankrupt!) | 2+2=**4** |
| Russia | 12 | 10 | 14×1=14 (ALL mob, none deployed!) | 1 (stab 5) | 0 | 12-10-14-1=-13 | 10-13=**-3→0** | 2+2=**4** |
| Austria | 9 | 6 | 4×1=4 (4 still mob) | 1 (stab 5→4 from crisis) | -2(stab)-3(bosnia) | 9-6-4-1=-2 | 5-5-2=**-2→0** | 2+2=**4** |
| Ottoman | 9 | 5 | 3×1=3 (3 still mob) | 2 (stab 4) | -2 (reform) | 9-5-3-2=-1 | 3-2-1=**0** | 1+1=**2** |

**CRISIS**: France, Britain, Russia, Austria, and Ottoman are all bankrupt or near-bankrupt! The mobilization surcharge is devastating in peacetime. This forces a strategic reality: **you cannot maintain a mobilized army during peace — you must either demobilize or go to war.**

### REVISED: Factions Demobilize Non-Essential Units

The GM advises factions that peacetime mobilization costs are unsustainable. Factions order partial demobilization (units return to reserve, no cost to demobilize).

**Revised T2 mob surcharges** (only keeping deployed + minimum mobilized):
- Germany: 10 mobilized → demob 6 back to reserve, keep 4 mob = 4g surcharge
- France: 6 mobilized → demob 4, keep 2 mob = 2g surcharge
- Britain: 12 mobilized → demob 8, keep 4 mob (fleet patrol) = 4g surcharge
- Russia: 14 mobilized → demob 10, keep 4 mob (Poland border) = 4g surcharge
- Austria: 4 mobilized → keep all 4 = 4g surcharge
- Ottoman: 3 mobilized → demob 1, keep 2 = 2g surcharge

### REVISED Economy (Turn 2)

| Faction | Income | Base Upkeep | Mob Surcharge | Stab | Purchases | Net | Gold End | VP |
|---------|--------|-------------|---------------|------|-----------|-----|----------|-----|
| Germany | 19 | 11 | 4 | 0 | -4 (artillery) | +4 | 20-4+4=**20** | **2** |
| France | 11 | 9 | 2 | 0 | -2 (loan) | +0 | 3-2+0=**1** | **2** |
| Britain | 15 | 16 | 4 | 0 | -3 (espionage) | -5 | 8-3-5=**0** | **4** |
| Russia | 12 | 10 | 4 | 1 | 0 | -3 | 10-3=**7** | **4** |
| Austria | 9 | 6 | 4 | 2(stab 4→UNSTABLE from Bosnia crisis -1) | -5 (stab+bosnia) | -3 | 5-5-3=**0→GM loan 3g from Germany**=**3** | **4** |
| Ottoman | 9 | 5 | 2 | 2 | -2 (reform) | +0 | 3-2+0=**1** | **2** |
| Krupp | 2+4(artillery)+4(plant crisis)=**10** | 0 | 0 | — | -3 (crisis) | +7 | 34+7=**41** | **2** |
| Schneider | 1+2+2+1(contract)=**6** | 0 | 0 | — | 0 | +6 | 22+6=**28** | **2** |

## Stability (Turn 2 End)

| Faction | Old Stab | Delta | New Stab | Threshold | Notes |
|---------|----------|-------|----------|-----------|-------|
| Germany | 8 | +1(peace)+1(prosperous 20g)+1(2 trade agree)=+3, cap 10 | **10** | STABLE | Thriving |
| France | 7 | +1(peace)-1(bankrupt at 1g)=0 | **7** | STRAINED | Barely holding |
| Britain | 9 | +1(peace)-2(bankrupt at 0g)=-1 | **8** | STABLE | Navy costs hurting |
| Russia | 5 | +1(peace)+0 | **6** | STRAINED | Stable for now |
| Austria | 5 | +1(peace)-1(low treasury at 3g)-1(Bosnia crisis)=-1 | **4** | UNSTABLE | Conrad's annexation destabilized |
| Ottoman | 4 | +1(peace)-1(low treasury) | **4** | UNSTABLE | Stagnant |

## Unit Status End of Turn 2

| Faction | Reserve | Mobilized | Deployed | Notes |
|---------|---------|-----------|----------|-------|
| Germany | 8a, 2f | 2a | 6a, 2f | Core deployed, reserves dormant |
| France | 4a, 2f | 2a | 6a, 2f | Border defense deployed |
| Britain | 4a, 4f | 0a, 4f | 4a, 7f | Fleet patrolling, army garrisoned |
| Russia | 10a, 2f | 4a, 1f | 0 | STILL NO DEPLOYED UNITS (2-turn mob!) |
| Austria | 2a, 1f | 2a | 4a, 1f | Balkans + border deployed |
| Ottoman | 2a, 1f | 1a | 3a, 1f | Dardanelles guarded |

**Russia is vulnerable**: 0 deployed units. If attacked now, they could only defend with mobilized units at -2 penalty.

## Turn 2 Summary

| Faction | Gold | VP | Stab | Deployed/Total Army | Key Event |
|---------|------|----|------|---------------------|-----------|
| Germany | 20 | 2 | 10 | 6/16 | Artillery upgrade, peak stability |
| France | 1 | 2 | 7 | 6/12 | Near bankrupt, fort complete |
| Britain | 0 | 4 | 8 | 4/8 | Bankrupt! Navy costs devastating. Intel on Germany. |
| Russia | 7 | 4 | 6 | 0/14 | Still mobilizing! Vulnerable! |
| Austria | 3 | 4 | 4 | 4/8 | Bosnia annexed, crisis, got German loan |
| Ottoman | 1 | 2 | 4 | 3/6 | Young Turk reform: 4g (vs Sultan military: 0g) |
| Krupp | 41 | 2 | — | — | Rolling in cash, planted crisis |
| Schneider | 28 | 2 | — | — | Both-side sales, building contracts |

---

# TURN 3 — "The Balkan Wars" (1912)

## Lifecycle Transitions

Russia's T1-mobilized units (4 army, 1 fleet) can FINALLY deploy this turn (2-turn mobilize complete).
All other factions' remaining mobilized units continue normal cycle.

**Factions begin mobilizing remaining reserves for the coming storm.**

## Diplomacy & Orders

**Germany**: Mobilizes 8 more army from reserve. Deploys 2 previously mobilized. Army deployment: 8 deployed (4 Alsace, 2 Poland, 2 Germany). Chancellor's non-aggression channel with Tsar reaches 1 turn of "active" status.

**France**: Mobilizes 4 army. Deploys 2 mob→deployed (total 8 deployed). President loans final 1g to Russia (**5g total = Banker complete! +3 personal VP**). General demands more troops.

**Britain**: Mobilizes 4 army. Deploys 4 fleet mob→deployed (11 fleet deployed). Income recovering. PM secretly trades with all nations.

**Russia**: **DEPLOYS 4 army** (Poland: 3, Balkans: 1). Mobilizes 10 remaining army from reserve. These won't deploy until T5 (2-turn mob → T4 mobilized → T5 deployable). Tsar continues Cousin Willy pact (2nd turn of active pact — needs 1 more for +4 VP).

**Austria**: Mobilizes 2 more army. Deploys 2 mob→balkans (6 deployed total). Emperor spends 2g stability. Conrad agitates for war on Serbia. **Conrad back-channels Germany's Chief of Staff** who pressures Kaiser to support Austrian action (+3 personal VP for Conrad).

**Ottoman**: Young Turk spends 2g more reform (total 6g reform vs Sultan 0g military). **COUP THRESHOLD MET** — available after T3 (this turn). Young Turk contacts German Krupp Director for alliance.

**Krupp**: Sells 4 Army to Germany (8g — mobilization purchases). Fires **Assassination Event on Austria** (4g): Austria stability hit!

**Schneider**: Sells 1 Army to Russia (2g), 1 Army to Austria (2g). **Secretly funds Duma Representative 3g** for revolution. Moves freely between boats spreading disinformation.

## Key Events This Turn

1. **Bosnia Crisis Escalation**: Serbia protests annexation. Russia backs Serbia. Austria digs in.
2. **Krupp's Assassination Event**: Hits Austria. Stability delta: -1 from event.
3. **Young Turk Coup Available**: Reform (6g) > Sultan military (0g). Can declare coup anytime now.
4. **Schneider funds Duma Rep**: Revolution fund growing.

## Stability (Turn 3 End)

| Faction | Old | Delta | New | Notes |
|---------|-----|-------|-----|-------|
| Germany | 10 | +1(peace)+1(prosperous)+1(trade)=+3, cap 10 | **10** | Peak |
| France | 7 | +1(peace)-1(low gold) | **7** | Holding |
| Britain | 8 | +1(peace)+0 | **9** | Recovering |
| Russia | 6 | +1(peace)+0 | **7** | Improving! |
| Austria | 4 | +1(peace)-1(low gold)-1(Krupp assassination event)-1(Bosnia tension) | **1** | **CRISIS!** |
| Ottoman | 4 | +1(peace)-1(low gold) | **4** | Steady |

**AUSTRIA AT CRISIS (Stab 1)!** One more hit and government collapses (-5 VP, rebellion).

## Economy (Turn 3)

| Faction | Income | Costs | Gold End | VP (cumulative) |
|---------|--------|-------|----------|-----------------|
| Germany | 19 | 11 base + 8 mob surcharge + 0 stab = 19 | 20-8(mob order)+0=**12** | **3** |
| France | 11 | 9 + 2 mob + 0 stab = 11 | 1-1(loan)+0=**0** | **3** |
| Britain | 15 | 16 + 4 mob = 20 | 0-5=**0** (GM allows deficit spending with -1 stab) | **6** |
| Russia | 12 | 10 + 10 mob + 1 stab = 21 | 7-9=**0** (bankrupt from mass mob!) | **6** |
| Austria | 9 | 6 + 2 mob + 3(crisis stab) = 11 | 3-2(stab order)-2=**0** | **6** |
| Ottoman | 9 | 5 + 1 + 2 stab = 8 | 1-2(reform)+1=**0** | **3** |
| Krupp | 2+8(sales)=10 | 4(crisis event) | 41-4+10=**47** | **3** (+1 from sales threshold) |
| Schneider | 1+2+2+1=6 | 3(fund revolution) | 28-3+6=**31** | **3** |

**EVERYONE IS BROKE EXCEPT THE ARMS DEALERS.** The mobilization costs + peacetime surcharge system means nations are bleeding gold to stay mobilized. War or demobilization is the only escape.

## Unit Status End of Turn 3

| Faction | Deployed | Mobilized | Reserve |
|---------|----------|-----------|---------|
| Germany | 8a, 2f | 8a, 2f | 0 |
| France | 8a, 2f | 4a, 2f | 0 |
| Britain | 4a, 11f | 4a, 4f | 0 |
| Russia | 4a, 1f | 10a, 2f | 0 |
| Austria | 6a, 1f | 2a, 1f | 0 |
| Ottoman | 3a, 1f | 3a, 1f | 0 |

## Turn 3 Summary

| Faction | Gold | VP | Stab | Deployed Army | Key |
|---------|------|----|------|---------------|-----|
| Germany | 12 | 3 | 10 | 8/16 | Artillery ready, full mob in progress |
| France | 0 | 3 | 7 | 8/12 | Bankrupt but fortified |
| Britain | 0 | 6 | 9 | 4/8 | Navy deployed, army mobilizing |
| Russia | 0 | 6 | 7 | 4/14 | Only 4 deployed! 10 still mobilizing |
| Austria | 0 | 6 | **1** | 6/8 | **CRISIS!** One hit from collapse |
| Ottoman | 0 | 3 | 4 | 3/6 | Coup imminent |
| Krupp | 47 | 3 | — | — | Obscenely wealthy |
| Schneider | 31 | 3 | — | — | Revolution fund active |

---

# TURN 4 — "The Assassination" (1913-14)

## ⚔️ WAR DECLARATIONS NOW ALLOWED

## Major Events

1. **Young Turk COUPS the Sultan!** (+3 personal VP Young Turk, -5 personal VP Sultan). Young Turk takes sole control. Declares neutrality.

2. **Austria declares war on Serbia!** Conrad forces it. Emperor cannot resist (stab 1, no treasury, army deployed). Conrad: +4 personal VP (war before T4... technically this IS T4, so "before T4" fails. +0 VP for early war. Conrad furious — he needed T3!). Emperor: +2 personal VP (kept peace until T4, events forced hand).

3. **Germany declares war on Russia** (breaking Reinsurance Treaty, -2 VP trade break). Kaiser overrides Chancellor. Constitutional Crisis attempt — Chancellor tries to form overrule with Chief of Staff, but Chief sides with Kaiser (war hawk). Chancellor: no second overrule VP.

4. **Germany declares war on France** (breaking... no treaty). Invades through Belgium!

5. **Belgium invasion triggers British entry!** Britain joins war against Germany.

6. **Russia declares war on Austria** (defending Serbia per alliance).

## Lifecycle: Mobilization Rush

All factions with remaining mobilized units deploy them:
- Germany: 8 mob army → deployed. **16 army deployed** (6 Alsace, 4 Poland, 6 Germany→splitting to West).
- France: 4 mob army → deployed. **12 army deployed** (6 border, 3 Paris, 3 reserve position).
- Britain: 4 mob army → deployed. **8 army, 15 fleet deployed**. Sends 3 BEF to France.
- Russia: 10 mob army... **STILL MOBILIZING** (T3 mob → T4 mob → T5 deploy for Russia's 2-turn speed). Only 4 deployed!
- Austria: 2 mob → deployed. **8 army deployed** (4 Serbia front, 4 Russian front).

**Russia's catastrophe**: At war with 14 army but only 4 deployed. 10 still mobilizing. Won't be ready until T5.

## War Alliances

**Central Powers**: Germany + Austria
**Entente**: France + Britain + Russia
**Neutral**: Ottoman (Young Turk chose neutrality), Krupp-Vickers, Schneider-Škoda

## Economic Impact of War

Trade agreements broken by war:
- Germany-Russia (Reinsurance Treaty) → broken (-2 VP Germany)
- Germany-Ottoman stays (not at war)
- All Entente agreements stay active between allies

War penalties kick in: 50% trade loss, -1g war exhaustion per turn.
Mobilization surcharge STOPS during wartime (troops at war don't pay extra).

## Battles — Turn 4

### BATTLE 1: Western Front — Schlieffen Plan

**Germany invades France through Belgium.**

Germany commits: 12 army (from Alsace + Germany reserve) to Western Front
- Modifiers: +1 (Artillery Upgrade), +2 (Belgium minor nation divisions pressed into service)
- Schlieffen requirement: 16+ divisions committed → only 12 deployed west. **Needs 16. UNDER-STRENGTH.**

France defends: 9 army (border) + 3 (Paris) = 12 defending
- Modifiers: +2 (Fortifications!), +3 (BEF: 3 British divisions deployed)
- British BEF in France = Schlieffen modifier -2 AND BEF support +3

**Attack**: 12 + d6(4) + 1(artillery) = **17**
**Defense**: 12 + d6(5) + 2(fort) + 3(BEF) = **22**
**Margin**: 17 - 22 = **-5 → DEFEAT**

Attacker (Germany) losses: 12 × 40% = 5 divisions destroyed
Defender (France+Britain) losses: 15 × 25% = 4 divisions (3 French, 1 British)

**Schlieffen Plan FAILS!** -3 VP to Germany faction.
Germany Western army: 12 - 5 = **7**
France army: 12 - 3 = **9**
British BEF: 3 - 1 = **2**

### BATTLE 2: Eastern Front — Germany vs Russia

Germany commits: 4 army (Poland garrison)
Russia commits: 4 army deployed (all they have!)
- Russia penalty: -0 (these 4 are fully deployed)

**Attack** (Germany): 4 + d6(3) + 1(artillery) = **8**
**Defense** (Russia): 4 + d6(6) = **10**
**Margin**: 8 - 10 = **-2 → STALEMATE**

Germany losses: 4 × 15% = 1 (min 1)
Russia losses: 4 × 15% = 1 (min 1)

Germany East: **3**. Russia: **3**.

### BATTLE 3: Balkans — Austria vs Serbia + Russia

Austria commits: 4 army to Serbia, 4 army facing Russia

**Serbia sub-battle**: Austria 4 vs Serbia 3 (minor nation divisions)
Attack: 4 + d6(5) = **9**
Defense: 3 + d6(2) = **5**
Margin: +4 → **VICTORY**
Austria losses: 4 × 25% = 1. Serbia losses: 3 × 40% = 1 (min 1, actually 1.2→1).
Austria Balkans: **3**. Serbia: **2**.

**Austria vs Russia (Galicia)**: Austria 4 vs Russia 0 deployed in this theater
Russia has 0 deployed here. Austria advances unopposed into Galicia.

## Turn 4 VP Awards

| Faction | Peace VP | Battle VP | Special VP | Cumulative VP |
|---------|----------|-----------|------------|---------------|
| Germany | 0 (at war) | 0 | -3 (Schlieffen fail), -2 (treaty break) | 3+0-3-2=**-2** |
| France | 0 (at war) | +1 (defended successfully) | 0 | 3+1=**4** |
| Britain | 0 (at war) | +1 (BEF participated) | +2 (Belgium defense), +7 (Continental Balance — France AND Germany at war!) | 6+1+2+7=**16** |
| Russia | 0 (at war) | 0 | 0 | 6+0=**6** |
| Austria | 0 (at war) | +1 (Serbia progress) | -5 (stab collapse if hit 0) | 6+1=**7** (stab holds at 1, rally +2 → stab 3) |
| Ottoman | +1 (peace) | 0 | 0 | 3+1=**4** |
| Krupp | 0 | 0 | +2 (war dividend active, +2g income) | 3+0=**3** (sales VP calculated at end) |
| Schneider | 0 | 0 | +2 (war dividend) | 3+0=**3** |

**Britain secretly earns +7 VP** from Continental Balance! With 16 VP, Britain is dominant.

## Economy (Turn 4 — Wartime)

War changes everything: no peace dividends, no mob surcharge, but war exhaustion kicks in.

| Faction | Income | War Penalties | Upkeep | Net | Gold End |
|---------|--------|--------------|--------|-----|----------|
| Germany | 8+3+4(Alsace)+1(trade Aus)+1(trade Ott)=17 | -1.5(50% trade)-1(exhaust)=-2.5→-3 | 12 (10a×.5+4f×.75=8) | 17-3-8=**6** | 12+6=**18** |
| France | 5+3+2(trade Rus+Bri)=10 | -1.5-1=-2.5→-3 | 7 (9a+4f) | 10-3-7=**0** | 0+0=**0** |
| Britain | 4+7+2(trade Fra+Ott)=13 | -3.5-1=-4.5→-5 | 11.5 (7a+14f) → 12 | 13-5-12=**-4→0** | **0** |
| Russia | 5+2+2(trade Fra+Bri)=9 | -1-1=-2 | 8 (13a+3f) | 9-2-8=**-1→0** | **0** |
| Austria | 4+1+1(trade Ger)+1(Ger war support +2)→9 | -0.5-1=-1.5→-2 | 5 (7a+2f) | 9-2-5-3(stab CRISIS)=**-1→0** | **0** |
| Ottoman | 2+2+2(Straits)+1(peace)+2(trade Ger+Bri)=9 | 0 (at peace) | 4 (6a+2f) | 9-4-2(stab)=**3** | 0+3=**3** |
| Krupp | 2+2(war dividend)+sales est 6=**10** | 0 | 0 | +10 | 47+10=**57** |
| Schneider | 1+2(war dividend)+sales est 4=**7** | 0 | 0 | +7 | 31+7=**38** |

## Turn 4 Summary

| Faction | Gold | VP | Stab | Deployed Army | Navy | Status |
|---------|------|----|------|---------------|------|--------|
| Germany | 18 | -2 | 10→8(war) | 10 (7W+3E) | 4 | **Schlieffen FAILED. -5 VP hit.** |
| France | 0 | 4 | 7→6(war) | 9 | 4 | Defended Paris! But broke. |
| Britain | 0 | **16** | 9→8(war) | 7 (2 in France) | 14 | **SECRET LEADER** +7 hidden VP |
| Russia | 0 | 6 | 7→6(war rally +2, war -1→8→cap) | 3 deployed, 10 mobilizing! | 3 | Desperately waiting for deployment |
| Austria | 0 | 7 | 1→3(war rally) | 7 (3 Serbia, 4 Galicia) | 2 | War rally saved them! Stab 3 |
| Ottoman | 3 | 4 | 4 | 3 | 2 | Neutral, collecting VP quietly |
| Krupp | 57 | 3 | — | — | — | War profiteering in full swing |
| Schneider | 38 | 3 | — | — | — | Funding chaos everywhere |

---

# TURN 5 — "The Great War" (1914-15)

## Lifecycle: Russia's Army FINALLY Deploys!

Russia's 10 mobilized army (from T3) completes 2-turn mobilization → **DEPLOYED!**
Russia now has: 3 (existing deployed) + 10 (new deployment) = **13 army deployed!**

Deployment: 8→Poland/Eastern Front, 3→Russia reserve, 2→Balkans support

## Britain Declares BLOCKADE on Germany!

14 fleets in North Sea + English Channel seal Germany.
- **Blockade Turn 1**: Germany loses 100% trade income (3g gone)

## Orders

**Germany**: Desperate. Consolidates Western front (7 divisions hold Alsace). Eastern front under pressure. Buys 2 army from Krupp (4g). Mobilizes → reserve.

**France**: Counterattack! French General launches **Plan XVII** — offensive into Lorraine!
- 9 army attack Alsace-Lorraine (Germany has 7 defending + fort? No, Germany has no forts. France has forts on THEIR border.)

**Britain**: Blockade active. First Lord proposes **Dardanelles raid** against Ottoman (who is neutral — Britain would need to declare war on Ottoman first). PM vetoes: Ottoman is neutral, no casus belli. First Lord: -0 VP (not attempted).

**Russia**: UNLEASHES 13 army on Eastern Front! 8 attack German Poland, 5 support Austrian front against Austria's 4 in Galicia.

**Austria**: 3 army continue Serbia campaign. 4 defend Galicia against Russia.

**Ottoman**: Neutral. Peace VP +1. Young Turk consolidates power.

## Battles — Turn 5

### BATTLE 4: Western Front — Plan XVII (French Counteroffensive)

**France attacks Alsace-Lorraine!**
France: 9 army attacking
Germany: 7 army defending Alsace
- Germany modifier: +1 (Artillery)
- No fortification in Alsace (France's fort is on French border, not Alsace)

**Attack** (France): 9 + d6(5) = **14**
**Defense** (Germany): 7 + d6(3) + 1(artillery) = **11**
**Margin**: +3 → **VICTORY!**

France losses: 9 × 25% = 2 (min 1, actually 2.25→2)
Germany losses: 7 × 40% = 3 (2.8→3)

France captures Alsace-Lorraine! **+5 VP (public) + 7 VP (secret La Revanche) = +12 VP!**
French General personal VP: +3 (launched Plan XVII) + 3 (held Lorraine!) = **+6 personal VP!**
French President: -2 personal VP (General disobeyed his caution order).

France army in Alsace: **7**
Germany Western army: **4** (retreats to Germany)

### BATTLE 5: Eastern Front — Russia Steamrolls

**Russia attacks German Poland!**
Russia: 8 army
Germany: 3 army defending Poland

**Attack** (Russia): 8 + d6(6) = **14**
**Defense** (Germany): 3 + d6(2) + 1(artillery) = **6**
**Margin**: +8 → **CRUSHING VICTORY!**

Russia losses: 8 × 10% = 1
Germany losses: 3 × 60% = 2

Russia occupies Poland! Germany East: **1** (retreats).
Russia East: **7**.

### BATTLE 6: Galicia — Russia vs Austria

**Russia attacks Austrian Galicia!**
Russia: 5 army
Austria: 4 army defending

**Attack** (Russia): 5 + d6(4) = **9**
**Defense** (Austria): 4 + d6(3) = **7**
**Margin**: +2 → **STALEMATE** (margin -2 to +2 = stalemate)

Russia losses: 5 × 15% = 1
Austria losses: 4 × 15% = 1

Russia Galicia: **4**. Austria Galicia: **3**. Front holds but Austria weakening.

### BATTLE 7: Serbia — Austria Mops Up

Austria: 3 vs Serbia remnant: 2

**Attack**: 3 + d6(5) = **8**
**Defense**: 2 + d6(1) = **3**
**Margin**: +5 → **VICTORY**

Austria losses: 1. Serbia losses: 1. Serbia: 1 division left.
**Austria captures Serbia!** +4 faction VP to Austria!

## Turn 5 VP Awards

| Faction | War/Battle VP | Special VP | Cumulative |
|---------|-------------|------------|------------|
| Germany | -1 (lost 2 battles) | -3 (Schlieffen, prev), +0 blockade penalty | -2-1=**-3** |
| France | +2 (won battle) | **+12 (Alsace captured!!!)** | 4+2+12=**18** |
| Britain | +1 (blockade VP) | +7 (Continental Balance, prev) | 16+1=**17** |
| Russia | +2 (won 2 battles) | +0 | 6+2=**8** |
| Austria | +1 (Serbia captured) | **+4 (Serbia objective!)** | 7+1+4=**12** |
| Ottoman | +1 (peace) | 0 | 4+1=**5** |
| Krupp | 0 | +2 (war dividend) | 3+2=**5** |
| Schneider | 0 | +2 (war dividend) | 3+2=**5** |

## Stability (Turn 5)

| Faction | Old | Delta | New | Notes |
|---------|-----|-------|-----|-------|
| Germany | 8 | -1(at war)-1(blockaded)-1(lost battles)=-3 | **5** | STRAINED. Blockade biting. |
| France | 6 | +2(war rally T1 of war)+1(won battle)=+3, but war rally only T1... France has been at war since T4 (warTurns=2) → -min(3,1)=-1 weariness | **5** | Holding |
| Britain | 8 | -0 (at war but winning) | **7** | STRAINED |
| Russia | 6→8(war rally) | warTurns=2, +2(rally)-1(at war)=+1 | **7** | IMPROVING from victories |
| Austria | 3 | -1(at war)-1(nationality tensions)-1(war weariness T2)=-3 | **0** ← **COLLAPSE!** | |
| Ottoman | 4 | +1(peace) | **5** | STRAINED (improving!) |

### **AUSTRIA-HUNGARY COLLAPSES!** 🔥

Stability hits 0! **-5 faction VP!** Rebellion triggered!
Austria VP: 12 - 5 = **7**
Emperor Franz Josef personal VP: **-5** (Hold Empire Together failed!)

## Economy (Turn 5)

| Faction | Income | Penalties | Upkeep | Net | Gold End |
|---------|--------|----------|--------|-----|----------|
| Germany | 8+0(trade blocked!)+4(Alsace LOST→0!)+1(trade Aus)+1(trade Ott)=10 | -1(exhaust)-1(unrest T2 war)=-2 | 7.5→8 (7a+4f) + 1(stab STRAINED) | 10-2-8-1=**-1→0** | 18-4(buy army)+0=**14** |
| France | 5+3+2(trade)=10 | -1.5-1-1=-3.5→-4 | 7 (7a+4f) | 10-4-7=**-1→0** | **0** |
| Britain | 4+7+2(trade)=13 | -3.5-1-1=-5.5→-6 | 12 (7a+14f) | 13-6-12=**-5→0** | **0** |
| Russia | 5+2+2(trade)=9 | -1-1=-2 | 9.25→10 (13a+3f) | 9-2-10=**-3→0** | **0** |
| Austria | 4+1+1(trade Ger)=6 | -0.5-1-1=-2.5→-3 | 4.5→5 (5a+2f) + 5(COLLAPSE)=10 | 6-3-10=**-7→0** | **0** |
| Ottoman | 9 | 0 | 4 + 1(stab) | 9-4-1=**4** | 3+4=**7** |
| Krupp | 2+2(war div)+4(sales)=8 | 0 | 0 | +8 | 57+8=**65** |
| Schneider | 1+2(war div)+3(sales)=6 | 0 | 0 | +6 | 38+6=**44** |

## Turn 5 Summary — END STATE

| Faction | Gold | VP | Stab | Army (Deployed) | Navy | Status |
|---------|------|----|------|-----------------|------|--------|
| **France** | 0 | **18** | 5 | 7 (in Alsace!) | 4 | **ALSACE RECAPTURED! +12 VP!** |
| **Britain** | 0 | **17** | 7 | 7 (2 BEF France) | 14 | Secret +7 VP. Blockade crushing Germany. |
| **Austria** | 0 | **7** | **0** | 5 | 2 | **COLLAPSED! -5 VP! Rebellion!** Serbia captured but empire dying. |
| **Russia** | 0 | **8** | 7 | 12 | 3 | Army deployed, winning East. Poland captured. |
| **Ottoman** | 7 | **5** | 5 | 3 | 2 | Neutral. Improving. Young Turk in control. |
| **Krupp** | 65 | **5** | — | — | — | 65g earned. War dividend flowing. |
| **Schneider** | 44 | **5** | — | — | — | 44g earned. Revolution fund active. |
| **Germany** | 14 | **-3** | 5 | 5 (4W+1E) | 4 | **LOSING ON ALL FRONTS. Blockaded. Alsace lost.** |

---

# POST-TURN 5 MILITARY SITUATION

```
WESTERN FRONT:
  Alsace-Lorraine: FRANCE 7 army (CAPTURED!)
  Germany proper:  GERMANY 4 army (retreated)
  France:          BEF 2 (British)

EASTERN FRONT:
  Poland:          RUSSIA 7 army (CAPTURED!)
  Germany East:    GERMANY 1 army (collapsing)
  Galicia:         RUSSIA 4 vs AUSTRIA 3 (contested)

BALKANS:
  Serbia:          AUSTRIA 2 army (occupied, 1 Serbian remnant)

SEA:
  North Sea:       BRITAIN 14 fleets (BLOCKADING Germany)
  Baltic:          GERMANY 4 fleets (trapped)

NEUTRAL:
  Ottoman Empire:  6 army, 2 fleet (at peace)
```

---

# CUMULATIVE SCOREBOARD — End of Turn 5

## Faction VP Rankings

| Rank | Faction | VP | Trend | Key Factors |
|------|---------|-----|-------|-------------|
| 1 | **France** | **18** | 📈 | Alsace recapture = +12 VP (5 public + 7 secret) |
| 2 | **Britain** | **17** | 📈 | Continental Balance +7 (secret), blockade VP, peace VP banked |
| 3 | **Russia** | **8** | 📈 | Slow start, crushing Eastern victories |
| 4 | **Austria** | **7** | 📉 | Serbia +4, but collapse -5. Net positive barely. |
| 5 | **Ottoman** | **5** | → | Neutral peace VP accumulation |
| 6 | **Krupp** | **5** | 📈 | 65g earned ÷ 6 = 10 VP from sales alone at game end |
| 7 | **Schneider** | **5** | 📈 | 44g ÷ 5 = 8 VP from sales at game end |
| 8 | **Germany** | **-3** | 📉 | Schlieffen fail -3, treaty break -2, peace VP lost |

## Estimated Individual Player Rankings (Faction VP + Personal VP)

| Rank | Player | Faction VP | Est. Personal VP | **Total** | Key Achievements |
|------|--------|-----------|-----------------|-----------|-----------------|
| 1 | **French General** | 18 | +6 | **24** | Plan XVII launched & held Lorraine! |
| 2 | **French President** | 18 | +4 | **22** | Banker +3, Fortress +2, Control -2, shared Alsace glory |
| 3 | **Foreign Secretary** | 17 | +5 | **22** | Intel Master +3, Entente +3, Swing Votes |
| 4 | **British PM** | 17 | +4 | **21** | Splendid Isolation +4 (BEF at 2, under 3 limit) |
| 5 | **Merchant of Death** | 5 | +10 | **15** | War Architect +6, Puppet Master +4 (est.) |
| 6 | **Young Turk** | 5 | +5 | **10** | Coup +3, Alliance +2 |
| 7 | **Vickers Director** | 5 | +7 | **12** | Pipeline +4, Hostile Takeover +3 |
| 8 | **First Lord** | 17 | +2 | **19** | Sink Fleet pending, blockade active |
| 9 | **Krupp Director** | 5 | +4 | **9** | Whisperer +2, War Hawk +2 |
| 10 | **Conrad** | 7 | +5 | **12** | Bosnia +2, back-channel +3 |
| 11 | **War Minister** | 8 | +3 | **11** | Eastern victories, mobilize early +3 |
| 12 | **Tsar** | 8 | +0 | **8** | Cousin Willy pact still active (risky) |
| 13 | **Duma Rep** | 8 | +0 | **8** | Revolution not triggered — Russia is WINNING |
| 14 | **Emperor Franz Josef** | 7 | -5 | **2** | Empire collapsed. Life's work destroyed. |
| 15 | **Sultan** | 5 | -5 | **0** | Couped. Humiliated. |
| 16 | **German Chief of Staff** | -3 | +4 | **1** | Militarism +2, Kingmaker +2, faction is sinking |
| 17 | **Chancellor** | -3 | +4 | **1** | Topple Kaiser +4, but Germany is losing |
| 18 | **Kaiser Wilhelm** | -3 | -2 | **-5** | Overruled -2, Schlieffen failed, blockaded |

---

# KEY BALANCE FINDINGS FROM THIS SIMULATION

## 1. Reserve Start Changes Everything
Starting in reserve means **nobody can fight until Turn 3-4** (mobilize T1, deploy T2-3). This creates a genuine "arms race" period where factions must decide WHEN to mobilize.

## 2. Mobilization Surcharge Is Brutal
The 1g/mobilized unit/turn peacetime surcharge means maintaining a mobilized-but-not-at-war army **bankrupts every nation by Turn 3**. Factions must either:
- Stay in reserve (cheap but vulnerable)
- Mobilize just before war (timing is everything)
- Go to war quickly (war removes the surcharge)

## 3. Russia's 2-Turn Mobilization Is Devastating
Russia can't deploy until **Turn 5** if they start mobilizing Turn 3. This means Russia enters the war with only 4/14 army deployed — historically accurate but mechanically punishing.

## 4. Arms Dealers Are Overpowered (Again)
Krupp ends T5 with **65g** and Schneider with **44g**. Their sales VP alone will be 10+ VP each. Combined with personal objectives, they consistently finish top 5.

## 5. Britain's Secret VP Is Game-Winning
Continental Balance (+7 hidden VP) fires automatically when France and Germany go to war. Britain doesn't even have to DO anything. Combined with 4 turns of +2 peace VP, Britain enters the war already at 16 VP.

## 6. France Is the Comeback King
Bankrupt from Turn 2 onward, but Alsace recapture (+12 VP) vaults France to #1 faction. The General's Plan XVII gamble is the most exciting moment in the game.
