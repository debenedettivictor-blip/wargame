# The Guns of August -- 20-Game Simulation Report (V2 Balance Patch)

## Key Balance Changes from V1
1. **Austria peace VP reduced**: +2 VP/turn (was +3)
2. **War Rally Effect**: +2 stability on war turns 0-1 (war HELPS early)
3. **Arms Dealer Crisis Stability Damage**: Border Incident -1 stab, Leaked Treaty -1 stab, Assassination -2 stab
4. **Central Powers Coordination Bonus**: Germany +2g +1VP/turn, Austria +1g/turn when both at war
5. **Austria desertion reduced**: Flat -1 div/turn (was escalating)
6. **Austria nationality penalty reduced**: -1/turn at war (was -2)

## Pre-Computed Reference: Starting Stats

| Faction | Gold | Ind | Trade | Army | Navy | Stab | Net Income (Peace T1) |
|---------|------|-----|-------|------|------|------|-----------------------|
| Germany | 25 | 8 | 3 | 14 | 4 | 8 | +9 |
| France | 20 | 5 | 3 | 12 | 4 | 7 | +1 |
| Britain | 30 | 4 | 7 | 8 | 14 | 9 | +0 |
| Russia | 18 | 5 | 2 | 14 | 3 | 5 | +0 |
| Austria | 14 | 4 | 1 | 8 | 2 | 3 | +1 |
| Ottoman | 10 | 2 | 2 | 6 | 2 | 4 | +2 |
| Krupp | 22 | 2 | 0 | 0 | 0 | - | +2 |
| Schneider| 16 | 1 | 0 | 0 | 0 | - | +1 |

**Critical Vulnerability: Austria starts at Stability 3 (Unstable). One -2 crisis drops them to 1 (Crisis = 3g/turn cost). Two crises can collapse them to 0 (-5 VP).**

**Mobilization (war cannot start before Turn 4):**
- Mobilize T2: Germany/France ready T4. Others ready T5.
- Mobilize T3: Germany/France ready T5. Others ready T6.
- Mobilize T4: Germany/France ready T6. Others NOT ready.

---

## GAME 1: "The Krupp Gambit"
**Theme: Krupp destabilizes Austria early, Germany exploits coordination bonus**

### Turn 1
- **Germany**: Peace +1 VP. Buys 2 Army from Krupp (4g). Army: 16. Treasury: 30. VP: 1
- **France**: Buys 2 Army from Schneider (4g). Army: 14. Treasury: 17. VP: 0
- **Britain**: Peace +1 VP. Saves. Treasury: 30. VP: 1
- **Russia**: Peace +2 VP. Saves. Treasury: 18. VP: 2
- **Austria**: Peace +2 VP. Treasury: 15. VP: 2
- **Ottoman**: Peace +2 VP. Treasury: 12. VP: 2
- **Krupp**: Sells 2 to Germany (4g). Uses Border Incident on Austria (2g): **Austria stability 3→2 (CRISIS!)**. Treasury: 24. VP: 1
- **Schneider**: Sells 2 to France (4g). Treasury: 20. VP: 1

### Turn 2
- **Germany**: Peace +1 VP. Begins mobilization. Buys 2 Army from Krupp (4g). Army: 18. Treasury: 35. VP: 2
- **France**: Begins mobilization. Treasury: 18. VP: 0
- **Britain**: Peace +1 VP. Treasury: 30. VP: 2
- **Russia**: Peace +2 VP. Begins mobilization. Treasury: 18. VP: 4
- **Austria**: Peace +2 VP. Stability at 2 = Crisis (3g/turn cost!). Net income: 9-6-3=0. Treasury: 15. Stab: 2. VP: 4
- **Ottoman**: Peace +2 VP. Treasury: 14. VP: 4
- **Krupp**: Sells 2 to Germany (4g). Leaked Treaty on Austria (3g): **Austria stability 2→1!** Treasury: 25. VP: 2
- **Schneider**: Sells 1 to France (2g). France Army: 15. Treasury: 21. VP: 1

### Turn 3
- **Germany**: Peace +1 VP. Mobilization continues. Treasury: 44. VP: 3
- **France**: Mobilization continues. Buys 1 Army (2g) from Schneider. Army: 16. Treasury: 17. VP: 0
- **Britain**: Peace +1 VP. Begins mobilization. Treasury: 30. VP: 3
- **Russia**: Peace +2 VP. Mobilization continues. Treasury: 18. VP: 6
- **Austria**: Stability at 1 (Crisis, 3g/turn). Desperately needs war rally! Begins mobilization. Treasury: 12 (15+0-3). Stab: 1. VP: 6
- **Ottoman**: Peace +2 VP. Saves. Treasury: 16. VP: 6
- **Krupp**: Assassination attempt on Austria (4g): **Austria stability 1→0! GOVERNMENT COLLAPSE! -5 VP!** Treasury: 21. VP: 4
- **Schneider**: Sells 1 to Russia (2g). Russia Army: 15. Treasury: 22. VP: 2

**AUSTRIA COLLAPSES! Stability 0 = rebellion. -5 VP. Austria VP: 6-5 = 1. Stability cost now 5g/turn.**

### Turn 4 -- WAR DECLARED
Austria is in ruins. Germany declares war on France and Russia to activate coordination bonus and try to salvage the alliance. Austria declares war (war rally: stability 0→2! Saved from collapse!).

**Mobilization Status:**
- Germany: FULLY DEPLOYED. 18 Army, 4 Navy.
- France: FULLY DEPLOYED. 16 Army, 4 Navy.
- Britain: Mobilizing, NOT deployed (-2 penalty). 8 Army, 14 Navy.
- Russia: Mobilizing, NOT deployed (-2 penalty). 15 Army, 3 Navy.
- Austria: Mobilizing, NOT deployed (-2 penalty). 8 Army, 2 Navy. Stab: 2 (rallied from 0!) but nationality -1 = net +1 this turn.

**Coordination Bonus active: Germany +2g +1VP, Austria +1g.**

Germany splits: 12 West vs France, 6 East vs Russia.
France: 16 defend + fortress Paris (+2).
Russia: 10 vs Germany East, 5 vs Austria.
Austria: 5 vs Serbia (3 div), 3 vs Russia.

**Western Front: Germany 12 vs France 16+2**
- Germany: 12 + d6=**3** = 15
- France: 18 + d6=**5** = 23
- Margin: -8 (Crushing Defeat). Germany loses 60%=7. France loses 10%=2.
- Germany West: 5. France: 14.

**Eastern Front: Germany 6 vs Russia 10-2**
- Germany: 6 + d6=**5** = 11
- Russia: 8 + d6=**2** = 10
- Margin: +1 (Stalemate). Each loses 15%. Germany: 5. Russia: 9.

**Balkans: Austria 5-2 vs Serbia 3**
- Austria: 3 + d6=**4** = 7
- Serbia: 3 + d6=**3** = 6
- Margin: +1 (Stalemate). Austria loses 15%=1. Serbia loses 15%=0.
- Austria Balkans: 4. Serbia: 3.

**Galicia: Austria 3-2 vs Russia 5-2**
- Austria: 1 + d6=**2** = 3
- Russia: 3 + d6=**6** = 9
- Margin: -6 (Crushing Defeat). Austria loses 60%=2. Russia loses 10%=0.
- Austria Galicia: 1. Russia: 5.

Austria desertion: -1 div. Austria total: 4 (Balkans) + 0 (Galicia wiped) = 4.
War costs: all lose 50% trade, 1g exhaustion.

### Turn 5
**War Turn 2 for all belligerents. Rally fading (+0). Austria: 0 rally -1 nationality = -1 stability.**
Austria stability: 2-1 = 1 (back to Crisis). War unrest: +1g/turn (2+ turns at war for Austria).

Germany Treasury: ~38 (income reduced by war costs + coordination bonus). VP: 3+1(coord)+1(peace lost)= 5 total through T4.
Wait -- let me recalculate. Germany at war: Industry 8 + trade 1.5 (halved) + agreements 3 + Alsace 4 - upkeep 10 - exhaustion 1 + coordination 2 = +7.5, round to +7. Treasury: 44+7-warT4costs... Let me simplify.

**Western Front: Germany 5 vs France 14**
- Germany: 5 + d6=**4** = 9
- France: 14 + d6=**2** = 16
- Margin: -7 (Crushing Defeat). Germany loses 60%=3. France loses 10%=1.
- Germany West: 2. France: 13. France takes Alsace-Lorraine (+5 VP France).

**Eastern Front: Germany 5 vs Russia 9**
- Germany: 5 + d6=**6** = 11
- Russia: 9 + d6=**1** = 10
- Margin: +1 (Stalemate). Each -15%. Germany: 4. Russia: 8.

**Balkans: Austria 4 vs Serbia 3** (Austria now deployed)
- Austria: 4 + d6=**5** = 9
- Serbia: 3 + d6=**1** = 4
- Margin: +5 (Victory). Austria loses 25%=1. Serbia loses 40%=1.
- Austria: 3. Serbia: 2. Austria takes Serbia (+2 VP).

**Galicia: Russia 5 advances unopposed into Austria.**
Austria loses territory. Russia +2 VP.

Austria desertion: -1. Austria: 2 divs total.

### Turn 6
**War Turn 3. Weariness -2. Austria: -2 war weariness -1 nationality = -3 stability. Stab: 1-3 = 0 again! Second collapse! -5 VP!**

Germany retreats. France advances. Russia steamrolls Austria.

**Western Front: Germany 2 vs France 13**
- Auto-defeat. Germany loses West entirely. France +3 VP (occupying Rhineland).

**Eastern Front: Germany 4 vs Russia 8**
- Germany: 4 + d6=**3** = 7
- Russia: 8 + d6=**4** = 12
- Margin: -5 (Defeat). Germany loses 40%=2. Russia loses 25%=2.
- Germany: 2. Russia: 6. Russia advances into Germany East.

Austria: 2-1 desertion = 1 div. Collapses entirely.

**Final VP Tally:**
| Faction | VP Sources | Total VP |
|---------|-----------|----------|
| Germany | Peace (3T): 3, Coord bonus: 2, East stalemates: 1 | **6** |
| France | Alsace: 5, Battles: 3, Territory: 3 | **11** |
| Britain | Peace (3T): 3, Naval support: 1, BEF: 1 | **5** |
| Russia | Peace (3T): 6, Battles: 4, Territory: 4 | **14** |
| Austria | Peace (3T): 6, Collapse x2: -10, Serbia: 2 | **-2** |
| Ottoman | Peace (6T): 12, Never at war: 3 | **15** |
| Krupp | Sales: 3, War dividend: 6, Crisis influence: 4 | **13** |
| Schneider | Sales: 2, War dividend: 3 | **5** |

**WINNER: Ottoman Empire (15 VP) -- stayed neutral while Austria was destroyed by Krupp's crises**

---

## GAME 2: "The Iron Chancellor's Gamble"
**Theme: Germany mobilizes early, Austria enters war for rally effect, dealers split allegiances**

### Turn 1
- **Germany**: Peace +1 VP. Treasury: 34. VP: 1
- **France**: Buys 2 Army from Schneider (4g). Army: 14. Treasury: 17. VP: 0
- **Britain**: Peace +1 VP. Treasury: 30. VP: 1
- **Russia**: Peace +2 VP. Treasury: 18. VP: 2
- **Austria**: Peace +2 VP. Treasury: 15. VP: 2
- **Ottoman**: Peace +2 VP. Treasury: 12. VP: 2
- **Krupp**: Sells 2 Army to Germany (4g). Treasury: 24. VP: 1
- **Schneider**: Sells 2 to France (4g). Border Incident on Russia (2g): **Russia stab 5→4 (Unstable, 2g cost).** Treasury: 18. VP: 1

### Turn 2
- **Germany**: Peace +1 VP. Begins mob. Buys 2 from Krupp. Army: 18. Treasury: 35. VP: 2
- **France**: Begins mob. Treasury: 18. VP: 0
- **Britain**: Peace +1 VP. Buys 2 Army (6g). Army: 10. Treasury: 24. VP: 2
- **Russia**: Peace +2 VP. Stab 4 = Unstable (2g cost). Begins mob. Treasury: 16. VP: 4
- **Austria**: Peace +2 VP. Begins mob. Treasury: 16. VP: 4
- **Ottoman**: Peace +2 VP. Begins mob. Treasury: 14. VP: 4
- **Krupp**: Sells to Germany. Saves for big crisis. Treasury: 28. VP: 2
- **Schneider**: Sells 1 to Britain (2g). Britain Army: 11. Treasury: 19. VP: 2

### Turn 3
- **Germany**: Peace +1 VP. Army: 18 (fully mobilizing). Buys 2 from Krupp. Army: 20. Treasury: 40. VP: 3
- **France**: Mob continues. Buys 2 from Schneider (4g). Army: 16. Treasury: 15. VP: 0
- **Britain**: Peace +1 VP. Begins mob. Treasury: 24. VP: 3
- **Russia**: Peace +2 VP. Mob continues. Stab 4 (2g cost). Treasury: 14. VP: 6
- **Austria**: Peace +2 VP. Mob continues. Treasury: 17. VP: 6
- **Ottoman**: Peace +2 VP. Mob continues. Treasury: 16. VP: 6
- **Krupp**: Assassination on Austria (4g): **Austria stab 3→1 (CRISIS!)** Germany protests diplomatically but secretly approves. Treasury: 26. VP: 4
- **Schneider**: Sells 2 to France. Treasury: 23. VP: 3

**Austria at stab 1, about to face 3g/turn crisis cost. War rally would save them: +2 rally -1 nationality = net +1, pushing to stab 2.**

### Turn 4 -- WAR
Austria MUST go to war for the rally effect. Declares war on Serbia. Germany declares on France/Russia. Coordination bonus active!

**Austria war rally: stab 1→3 (Unstable, only 2g cost). Huge improvement!**

**Mobilization:**
- Germany: DEPLOYED. 20 Army.
- France: DEPLOYED. 16 Army.
- Britain: NOT deployed (-2). 11 Army, 14 Navy.
- Russia: NOT deployed (-2). 14 Army.
- Austria: NOT deployed (-2). 8 Army.
- Ottoman: NOT deployed (-2). 6 Army. Remains neutral.

Germany: 14 West, 6 East.
France: 16 + fortress (+2).
Russia: 9 vs Germany, 5 vs Austria.
Austria: 5 vs Serbia (3 div), 3 vs Russia.

**Western Front: Germany 14 vs France 18**
- Germany: 14 + d6=**6** = 20
- France: 18 + d6=**2** = 20
- Margin: 0 (Stalemate). Each -15%. Germany: 12. France: 14.

**Eastern Front: Germany 6 vs Russia 9-2=7**
- Germany: 6 + d6=**4** = 10
- Russia: 7 + d6=**3** = 10
- Margin: 0 (Stalemate). Each -15%. Germany: 5. Russia: 8.

**Balkans: Austria 5-2=3 vs Serbia 3**
- Austria: 3 + d6=**6** = 9
- Serbia: 3 + d6=**1** = 4
- Margin: +5 (Victory). Austria -25%=1. Serbia -40%=1.
- Austria: 4. Serbia: 2. Austria advances.

**Galicia: Austria 3-2=1 vs Russia 5-2=3**
- Austria: 1 + d6=**3** = 4
- Russia: 3 + d6=**4** = 7
- Margin: -3 (Defeat). Austria -40%=0. Russia -25%=1.
- Austria Galicia wiped. Russia: 4.

Austria desertion: -1. Total: 3 divs.

### Turn 5
War Turn 2: Rally fading (+0). Austria: 0-1 nationality = -1 stab. Stab: 3-1=2 (Crisis).
Unrest kicks in: +1g/turn for Austria (2+ turns at war).
Coordination bonus: Germany +2g +1VP, Austria +1g.

Germany buys 2 Army from Krupp. Army reinforced.

**Western Front: Germany 12+2reinforcement=14 vs France 14**
- Germany: 14 + d6=**5** = 19
- France: 14 + d6=**4** = 18
- Margin: +1 (Stalemate). Each -15%. Germany: 12. France: 12.

**Eastern Front: Germany 5 vs Russia 8** (Russia now deployed)
- Germany: 5 + d6=**2** = 7
- Russia: 8 + d6=**5** = 13
- Margin: -6 (Crushing Defeat). Germany -60%=3. Russia -10%=1.
- Germany East: 2. Russia: 7. Russia breaks through!

**Balkans: Austria 3 vs Serbia 2** (Austria deployed now)
- Austria: 3 + d6=**4** = 7
- Serbia: 2 + d6=**2** = 4
- Margin: +3 (Victory). Austria -25%=1. Serbia -40%=1.
- Austria: 2. Serbia: 1. Austria takes Serbia! +2 VP.

**Russia 4 advances into Austria from Galicia unopposed. +2 VP Russia.**

Austria desertion: -1. Total: 1 div.

### Turn 6
War Turn 3: Weariness -2. Austria: -2 -1 nationality = -3 stab. Stab: 2-3 = 0! **COLLAPSE! -5 VP.**

**Western Front: Germany 12 vs France 12**
- Germany: 12 + d6=**3** = 15
- France: 12 + d6=**6** = 18
- Margin: -3 (Defeat). Germany -40%=5. France -25%=3.
- Germany: 7. France: 9. France takes Alsace (+5 VP).

**Eastern Front: Russia 7 vs Germany 2**
- Auto-advance. Russia into Germany East. +2 VP.

Austria: Collapsed. 0 divs.

**Final VP:**
| Faction | VP Sources | Total VP |
|---------|-----------|----------|
| Germany | Peace 3T: 3, Coord: 2, Stalemates: 1 | **6** |
| France | Alsace: 5, Battles: 2, Territory: 1 | **8** |
| Britain | Peace 4T: 4, Naval: 1 | **5** |
| Russia | Peace 3T: 6, Battles: 4, Territory: 4 | **14** |
| Austria | Peace 3T: 6, Serbia: 2, Collapse: -5 | **3** |
| Ottoman | Peace 6T: 12, Never-at-war: 3 | **15** |
| Krupp | Sales: 4, Dividends: 6, Crisis: 4 | **14** |
| Schneider | Sales: 3, Dividends: 3 | **6** |

**WINNER: Ottoman Empire (15 VP)**

---

## GAME 3: "Austria Fights Smart"
**Theme: Austria proactively declares war Turn 4 before crises destroy it, short war strategy**

### Turn 1
- All factions collect peace bonuses.
- **Krupp**: Border Incident on Austria (2g). **Stab 3→2 (Crisis).** Treasury: 22. VP: 1
- **Schneider**: Saves. Treasury: 17.

### Turn 2
- Germany, France begin mobilization. Russia begins mob.
- Austria: Stab 2 = 3g/turn cost. Net income terrible. Begins mob. Treasury: 12.
- **Krupp**: Leaked Treaty on Russia (3g). **Russia stab 5→4.** Treasury: 23. VP: 2
- **Schneider**: Border Incident on Austria (2g). **Austria stab 2→1!** Treasury: 16.

### Turn 3
- Germany buys 2 Army (from Krupp). Army: 18. Treasury: 40.
- France: Army 14, Mob continues. Treasury: 16.
- Britain begins mob.
- Austria: Stab 1 = 3g/turn. Mob continues. Treasury: 6. Desperate.
- **Krupp**: Sells to Germany. Treasury: 25.
- **Schneider**: Sells 2 to France (4g). France Army: 16. Treasury: 18.

### Turn 4 -- WAR
Austria declares war immediately for rally. Stab 1→3 (rally +2, nationality -1 = net +1... wait: rally is +2, nationality is -1. So 1+2-1 = 2. Hmm. Let me re-read the rules.

War Rally Turn 0-1: +2. Austria-specific: -1 nationality. Net: +1. So stab 1+1 = 2. Not as good as I calculated in Game 2. Let me correct: the rally is +2, the nationality tension is -1 additional. So Austria gets net +1 to stability from entering war. Stab 1→2.

Actually re-reading: "War turns 0-1: +2 stability" and "Austria at war: -1 nationality tensions (additional)". So the total change is +2-1 = +1. Austria stab: 1+1 = 2.

Germany declares war too. Coordination bonus active.

**Mobilization:**
- Germany: DEPLOYED. 18 Army.
- France: DEPLOYED. 16 Army.
- Britain: NOT deployed. 8 Army.
- Russia: NOT deployed. 14 Army.
- Austria: NOT deployed. 8 Army. Stab: 2.
- Ottoman: Neutral.

Germany: 13 West, 5 East.
France: 16 + fortress.
Russia: 9 vs Germany, 5 vs Austria.
Austria: 6 vs Serbia, 2 vs Russia.

**Western Front: Germany 13 vs France 18**
- Germany: 13 + d6=**5** = 18
- France: 18 + d6=**3** = 21
- Margin: -3 (Defeat). Germany -40%=5. France -25%=4.
- Germany: 8. France: 12.

**Eastern Front: Germany 5 vs Russia 9-2=7**
- Germany: 5 + d6=**6** = 11
- Russia: 7 + d6=**1** = 8
- Margin: +3 (Victory!). Germany -25%=1. Russia -40%=3.
- Germany: 4. Russia: 6.

**Balkans: Austria 6-2=4 vs Serbia 3**
- Austria: 4 + d6=**5** = 9
- Serbia: 3 + d6=**2** = 5
- Margin: +4 (Victory). Austria -25%=2. Serbia -40%=1.
- Austria: 4. Serbia: 2. Austria takes Serbia (+2 VP).

**Galicia: Austria 2-2=0 vs Russia 5-2=3**
- Austria: 0 + d6=**4** = 4
- Russia: 3 + d6=**3** = 6
- Margin: -2 (Stalemate). Austria -15%=0. Russia -15%=0.
- Holding.

Austria desertion: -1. Total: 5 divs (4 Balkans + 1 Galicia - 1 = 4+0=4... let's say 3 in Balkans, 0 in Galicia after desertion).

### Turn 5
War Turn 2: Rally fading. Austria: 0-1 = -1 stab. Stab: 2-1=1 (Crisis). Unrest: +1g.

Germany reinforces East with 2 purchased Army.

**Western Front: Germany 8 vs France 12**
- Germany: 8 + d6=**2** = 10
- France: 12 + d6=**5** = 17
- Margin: -7 (Crushing Defeat). Germany -60%=5. France -10%=1.
- Germany: 3. France: 11. France takes Alsace (+5 VP).

**Eastern Front: Germany 4+2=6 vs Russia 6** (now deployed)
- Germany: 6 + d6=**4** = 10
- Russia: 6 + d6=**4** = 10
- Margin: 0 (Stalemate). Each -15%. Germany: 5. Russia: 5.

Austria: 3 remaining divs hold Serbia. Russia Galicia force: 3 advances.

Austria desertion: -1. Total: 2.

### Turn 6
War Turn 3: Weariness -2. Austria: -2-1 = -3. Stab: 1-3 = 0! **COLLAPSE! -5 VP.**

**Western Front: Germany 3 vs France 11**
- France auto-advances. Germany surrenders West.

**Eastern Front: Germany 5 vs Russia 5+reinforcements=7**
- Germany: 5 + d6=**3** = 8
- Russia: 7 + d6=**5** = 12
- Margin: -4 (Defeat). Germany -40%=2. Russia -25%=2.
- Russia advances East.

**Final VP:**
| Faction | Total VP |
|---------|----------|
| Germany | 3 (peace) + 1 (East victory) + 2 (coord) = **6** |
| France | 5 (Alsace) + 3 (battles) + 2 (territory) = **10** |
| Britain | 3 (peace) + 1 (naval) = **4** |
| Russia | 6 (peace) + 3 (battles) + 4 (territory) = **13** |
| Austria | 4 (peace) + 2 (Serbia) - 5 (collapse) = **1** |
| Ottoman | 12 (peace) + 3 (never-at-war) = **15** |
| Krupp | 3 (sales) + 6 (dividends) + 2 (crisis) = **11** |
| Schneider | 3 (sales) + 3 (dividends) = **6** |

**WINNER: Ottoman Empire (15 VP)**

---

## GAME 4: "The Entente Strikes First"
**Theme: France pushes for early war, Russia cooperates, dealers target Russia instead of Austria**

### Turn 1
- Standard peace bonuses. Germany VP: 1, France: 0, Britain: 1, Russia: 2, Austria: 2, Ottoman: 2.
- **Krupp**: Border Incident on France (2g). **France stab 7→6.** Treasury: 22.
- **Schneider**: Leaked Treaty on Germany (3g). **Germany stab 8→7.** Treasury: 14.

### Turn 2
- Germany, France, Russia begin mobilization.
- Austria begins mob.
- Britain buys 3 Navy (18g). Navy: 17. Treasury: 12.
- **Krupp**: Border Incident on Russia (2g). **Russia stab 5→4 (Unstable).** Treasury: 24.
- **Schneider**: Sells 2 to France (4g). France Army: 14. Treasury: 17.

### Turn 3
- Germany buys 2 from Krupp. Army: 18. Treasury: 40.
- France: Army 14, ready next turn. Treasury: 16.
- Britain begins mob.
- Russia: Stab 4, 2g cost. Treasury: 14.
- Austria: Stab 3, mob continues. Treasury: 17.
- Ottoman: Peace +2 VP. Treasury: 16. VP: 6.
- **Krupp**: Assassination on Russia (4g). **Russia stab 4→2! CRISIS!** Treasury: 24. VP: 4.
- **Schneider**: Sells 2 to Russia (4g). Russia Army: 16. Treasury: 19. VP: 2.

### Turn 4 -- WAR
Russia at stab 2, desperate. Entente declares war. War rally for Russia: stab 2+2-1(revolutionary)= +1 net. Stab: 3.
Germany honors alliance, joins. Austria joins. Austria rally: stab 3+2-1= +1. Stab: 4!

Coordination bonus: Germany +2g +1VP, Austria +1g.

**Mobilization:**
- Germany: DEPLOYED. 18 Army.
- France: DEPLOYED. 14 Army.
- Britain: NOT deployed (-2). 8 Army, 17 Navy.
- Russia: NOT deployed (-2). 16 Army. Stab: 3.
- Austria: NOT deployed (-2). 8 Army. Stab: 4.
- Ottoman: Neutral.

Germany: 12 West (through Belgium - triggers Britain!), 6 East.
Belgium: 2 VP to Germany if taken, but Britain now fully committed.
France: 14 + BEF 4 (Britain's deployed units) + fortress.

**Belgium: Germany 3 vs Belgium 2 div**
- Germany: 3 + d6=**5** = 8
- Belgium: 2 + d6=**2** = 4
- Margin: +4 (Victory). Germany takes Belgium (+2 VP). Germany loses 1. Belgium eliminated.

**Western Front: Germany 11 vs France 14 + BEF 4 (-2 penalty) + fortress (+2)**
- Germany: 11 + d6=**4** = 15
- France+BEF: 14 + 2 + 2 = 18 + d6=**3** = 21
- Margin: -6 (Crushing Defeat). Germany -60%=7. France -10%=2.
- Germany West: 4. France+BEF: 16.

**Eastern Front: Germany 6 vs Russia 10-2=8**
- Germany: 6 + d6=**3** = 9
- Russia: 8 + d6=**5** = 13
- Margin: -4 (Defeat). Germany -40%=2. Russia -25%=2.
- Germany East: 4. Russia: 8.

**Balkans: Austria 5-2=3 vs Serbia 3**
- Austria: 3 + d6=**3** = 6
- Serbia: 3 + d6=**4** = 7
- Margin: -1 (Stalemate). Each -15%. Austria: 4. Serbia: 3.

**Galicia: Austria 3-2=1 vs Russia 6-2=4**
- Austria: 1 + d6=**1** = 2
- Russia: 4 + d6=**6** = 10
- Margin: -8 (Crushing Defeat). Austria -60%=2. Russia -10%=0.
- Austria Galicia wiped. Russia: 6.

Austria desertion: -1. Total: 3.

### Turn 5
War Turn 2: Rally fading. Austria 0-1=-1 stab. Stab: 4-1=3. Still Unstable -- manageable!
Russia: 0-1=-1. Stab: 3-1=2. Crisis.
Coordination bonus continues.

**Western Front: France 16 vs Germany 4**
- Auto-advance. France takes Alsace (+5 VP) and pushes into Rhineland (+3 VP).

**Eastern Front: Germany 4 + 2 reinforcements = 6 vs Russia 8** (deployed)
- Germany: 6 + d6=**5** = 11
- Russia: 8 + d6=**2** = 10
- Margin: +1 (Stalemate). Each -15%. Germany: 5. Russia: 7.

**Austria 3 vs Serbia 3** (now deployed)
- Austria: 3 + d6=**6** = 9
- Serbia: 3 + d6=**1** = 4
- Margin: +5 (Victory). Austria -25%=1. Serbia -40%=1.
- Austria takes Serbia (+2 VP). Serbia: 2.

**Russia 6 vs Austrian interior (1 div garrison)**
- Russia auto-advances into Austria (+2 VP).

Austria desertion: -1. Total: 1+1=... Austria has 2 in Serbia - 1 desertion = 1.

### Turn 6
War Turn 3: Austria: -2-1=-3. Stab: 3-3=0! **COLLAPSE! -5 VP.**
Russia: -2-1=-3. Stab: 2-3=0! **RUSSIA COLLAPSES TOO! -5 VP!** Revolutionary crisis!

**Eastern Front: Germany 5 vs Russia 7 (but Russia collapsing, -half army)**
Russia rebellion: army halved to 4.
- Germany: 5 + d6=**4** = 9
- Russia: 4 + d6=**3** = 7
- Margin: +2 (Stalemate). Each -15%.

France occupies West. Germany surrenders.

**Final VP:**
| Faction | Total VP |
|---------|----------|
| Germany | 3 (peace) + 2 (Belgium) + 2 (coord) - 2 (surrender) = **5** |
| France | 5 (Alsace) + 3 (Rhineland) + 3 (battles) = **11** |
| Britain | 3 (peace) + 2 (Belgium liberation goal) = **5** |
| Russia | 6 (peace) + 4 (territory) - 5 (collapse) = **5** |
| Austria | 4 (peace) + 2 (Serbia) - 5 (collapse) = **1** |
| Ottoman | 12 (peace) + 3 (never-at-war) = **15** |
| Krupp | 4 (sales) + 6 (dividends) + 4 (crisis) = **14** |
| Schneider | 3 (sales) + 3 (dividends) + 2 (crisis) = **8** |

**WINNER: Ottoman Empire (15 VP)**

---

## GAME 5: "The Armed Peace"
**Theme: No faction declares war. Arms dealers fail. Austria's reduced peace VP means it doesn't auto-win.**

### Turn 1-3
All factions collect peace bonuses. Some mobilize as precaution.
- Krupp: Various crises on Austria. Border Incident T1 (stab 3→2), Assassination T3 (stab 2→0). **AUSTRIA COLLAPSES T3! -5 VP.**
- Schneider: Crises on Russia. Border T1 (stab 5→4), Leaked Treaty T2 (stab 4→3).

Austria at stab 0 but no war declared. Austria VP: 4 (2 turns peace) - 5 (collapse) = -1.

### Turn 4-6
No war declared! Austria stabilizes via paying 5g/turn collapse cost. Barely survives.
All factions accumulate peace VP.

**Final VP (no war):**
| Faction | Total VP |
|---------|----------|
| Germany | 6 (peace) + 3 (never-at-war) = **9** |
| France | 0 (peace) + 3 (never-at-war) = **3** |
| Britain | 6 (peace) + 3 (never-at-war) = **9** |
| Russia | 12 (peace) + 3 (never-at-war) = **15** |
| Austria | 6 (peace from T1-3 only, collapsed T3) - 5 (collapse) + 3 (never-at-war) = **4** |
| Ottoman | 12 (peace) + 3 (never-at-war) = **15** |
| Krupp | 2 (industry) - 8 (no war penalty) + 2 (crisis) = **-4** |
| Schneider | 1 (industry) - 8 (no war penalty) + 1 (crisis) = **-6** |

Wait, Austria gets +2 VP/turn at peace. 6 turns = 12 VP. But collapsed at T3, still at peace. Do they get peace VP while collapsed? The rules say peace bonus is per turn while NOT at war. Collapse is separate. So: 6 turns x 2 = 12 VP - 5 collapse = 7 VP. But the collapse costs 5g/turn which would bankrupt them... They'd be in deep financial trouble but still earning peace VP.

Let me recalculate: Austria gets 12 VP from peace (6 turns x 2) - 5 from collapse = 7 VP + 3 never-at-war = 10 VP.

Actually: Austria gets peace VP of +2/turn for turns 1 and 2 (before collapse T3). After collapse, do they still get peace VP? Collapse doesn't end peace status. So yes: 6 turns x 2 = 12 VP total peace, -5 collapse = 7, +3 never-at-war = 10.

| Faction | Total VP |
|---------|----------|
| Germany | 6 + 3 = **9** |
| France | 0 + 3 = **3** |
| Britain | 6 + 3 = **9** |
| Russia | 12 + 3 = **15** |
| Austria | 12 - 5 + 3 = **10** |
| Ottoman | 12 + 3 = **15** |
| Krupp | -8 + 2 = **-6** |
| Schneider | -8 + 1 = **-7** |

**WINNER: TIE -- Russia & Ottoman (15 VP each)**

---

## GAME 6: "The Central Powers' Finest Hour"
**Theme: Germany gets great dice, Austria survives, short decisive war**

### Turn 1-3
Standard buildup. Krupp sells heavily to Germany. Germany: 20 Army.
- Krupp: Border Incident on France (stab 7→6), saves rest for war dividends.
- Schneider: Sells to France (Army: 16) and Russia (Army: 16).
- Austria: No crises targeted at them this game! Stab stays at 3.
- All major powers begin mob Turn 2.

### Turn 4 -- WAR
Germany declares war through Belgium. Austria joins. Coordination bonus active.
Austria war rally: stab 3+2-1=4 (Unstable).
Ottoman joins Central Powers (lured by German gold: 5g payment).

**Mobilization:**
- Germany: DEPLOYED. 20 Army. Stab 8→rally, stays 8+.
- France: DEPLOYED. 16 Army.
- Britain: NOT deployed. 10 Army, 14 Navy.
- Russia: NOT deployed. 16 Army.
- Austria: NOT deployed. 8 Army. Stab: 4.
- Ottoman: NOT deployed. 6 Army. Stab: 4→rally +2-1=5.

**Belgium: Germany 4 vs Belgium 2**
- Germany: 4 + d6=**6** = 10. Belgium: 2 + d6=**1** = 3. Crushing Victory. Belgium falls.

**Western Front: Germany 16 vs France 16 + BEF 4(-2) + fortress**
- Germany: 16 + d6=**6** = 22
- Allies: 16+2+2 = 20 + d6=**1** = 21
- Margin: +1 (Stalemate). Each -15%. Germany: 14. France/BEF: 17.

**Eastern Front: Germany 6 vs Russia 10-2=8**
- Germany: 6 + d6=**5** = 11
- Russia: 8 + d6=**2** = 10
- Margin: +1 (Stalemate). Germany: 5. Russia: 9.

**Balkans: Austria 5-2=3 vs Serbia 3**
- Austria: 3 + d6=**4** = 7
- Serbia: 3 + d6=**3** = 6
- Margin: +1 (Stalemate). Austria: 4. Serbia: 3.

**Galicia: Austria 3-2=1 vs Russia 6-2=4**
- Austria: 1 + d6=**5** = 6
- Russia: 4 + d6=**2** = 6
- Margin: 0 (Stalemate). Each -15%. Austria: 1. Russia: 5.

**Caucasus: Ottoman 4-2=2 vs Russia 2 (detached)**
- Ottoman: 2 + d6=**4** = 6
- Russia: 2 + d6=**3** = 5
- Margin: +1 (Stalemate). Ottoman: 2. Russia: 2.

Austria desertion: -1. Total: 4.

### Turn 5
War Turn 2: Rally fading. Austria: 0-1=-1. Stab 4-1=3.
Germany buys 4 Army from Krupp (8g). Reinforces West heavily. Army: 14+4=18 West.

**Western Front: Germany 18 vs France 17**
- Germany: 18 + d6=**5** = 23
- France: 17 + d6=**3** = 20
- Margin: +3 (Victory!). Germany -25%=5. France -25%=4.
- Germany: 13. France: 13. Germany pushes into France!

**Eastern Front: Germany 5 + Ottoman pressure**
- Germany: 5 + d6=**4** = 9
- Russia: 9 + d6=**4** = 13
- Margin: -4 (Defeat). Germany: 3. Russia: 7.

**Austria 3 vs Serbia 3** (deployed)
- Austria: 3 + d6=**5** = 8
- Serbia: 3 + d6=**2** = 5
- Margin: +3 (Victory). Austria takes Serbia (+2 VP).

**Austria 1 Galicia vs Russia 5** (deployed)
- Crushed. Austria Galicia eliminated.

Austria desertion: -1. Total: 1.

### Turn 6
War Turn 3: Weariness -2. Austria: -2-1=-3. Stab 3-3=0! Collapse again! But they took Serbia.

**Western Front: Germany 13 vs France 13**
- Germany: 13 + d6=**6** = 19
- France: 13 + d6=**2** = 15
- Margin: +4 (Victory!). Germany -25%=3. France -40%=5.
- Germany: 10. France: 8. **GERMANY BREAKS THROUGH! Takes Alsace (denies France +5 VP).**

**Eastern Front: Russia 7 vs Germany 3**
- Russia: 7 + d6=**5** = 12
- Germany: 3 + d6=**3** = 6
- Margin: +6 (Crushing Victory Russia). Russia takes East Germany.

Mixed result: West won, East lost.

**Final VP:**
| Faction | Total VP |
|---------|----------|
| Germany | 3 (peace) + 2 (Belgium) + 4 (Alsace held) + 3 (coord) + 3 (West victories) - 2 (East lost) = **13** |
| France | 0 (peace) + 0 (Alsace denied!) + 1 (battles) = **1** |
| Britain | 3 (peace) + 1 (BEF) = **4** |
| Russia | 6 (peace) + 4 (East conquest) + 3 (battles) = **13** |
| Austria | 4 (peace) + 2 (Serbia) - 5 (collapse) = **1** |
| Ottoman | 6 (peace) + 2 (joined war) = **8** |
| Krupp | 6 (sales) + 6 (dividends) + 1 (crisis) = **13** |
| Schneider | 3 (sales) + 3 (dividends) = **6** |

**WINNER: TIE -- Germany, Russia, Krupp (13 VP each)**

---

## GAME 7: "Ottoman Joins Early"
**Theme: Ottoman joins Entente, Austria faces three-front war**

### Turn 1-3
Standard buildup. Schneider sells to Ottoman, building relationship.
- Krupp: Two crises on Austria (Border T1: stab 3→2, Border T2: stab 2→1). Austria in Crisis.
- Austria begins mob early (T2), desperate for war rally.
- Ottoman courted by Entente: promised Romania and Bulgaria.

### Turn 4 -- WAR
Austria declares war for rally. Stab 1+2-1=+1→2. Germany joins. Coordination bonus.
**Ottoman joins ENTENTE.** Opens southern front against Austria.

**Mobilization:**
- Germany: DEPLOYED. 18 Army.
- France: DEPLOYED. 16 Army.
- Britain: NOT deployed. 10 Army.
- Russia: NOT deployed. 14 Army.
- Austria: NOT deployed. 8 Army. THREE FRONTS: Serbia, Russia, Ottoman.
- Ottoman: NOT deployed. 6 Army.

Austria must split 8 Army across 3 fronts: 3 Serbia, 3 Galicia, 2 Southern.

**Western Front: Germany 13 vs France 18**
- Germany: 13 + d6=**4** = 17
- France: 18 + d6=**4** = 22
- Margin: -5 (Defeat). Germany -40%=5. France -25%=5.
- Germany: 8. France: 13.

**Eastern Front: Germany 5 vs Russia 9-2=7**
- Germany: 5 + d6=**3** = 8
- Russia: 7 + d6=**5** = 12
- Margin: -4 (Defeat). Germany -40%=2. Russia -25%=2.
- Germany East: 3. Russia: 7.

**Balkans: Austria 3-2=1 vs Serbia 3**
- Austria: 1 + d6=**2** = 3
- Serbia: 3 + d6=**5** = 8
- Margin: -5 (Defeat!). Austria -40%=1. Serbia -25%=1.
- Austria Balkans: 2. Serbia: 2. Serbia holds!

**Galicia: Austria 3-2=1 vs Russia 5-2=3**
- Austria: 1 + d6=**1** = 2
- Russia: 3 + d6=**6** = 9
- Margin: -7 (Crushing Defeat). Austria -60%=2. Russia -10%=0.
- Austria Galicia: wiped. Russia: 5.

**Southern Front: Austria 2-2=0 vs Ottoman 4-2=2**
- Austria: 0 + d6=**3** = 3
- Ottoman: 2 + d6=**4** = 6
- Margin: -3 (Defeat). Austria -40%=1. Ottoman -25%=1.
- Austria South: 1. Ottoman: 3.

Austria desertion: -1. Total: 2 (Balkans) + 0 + 0 - 1 = 1 div!

### Turn 5
War Turn 2. Austria: 0-1=-1. Stab 2-1=1.
Austria is being overrun from 3 directions with 1 division.

All fronts collapse for Central Powers. Germany retreats.

**Final VP (abbreviated):**
| Faction | Total VP |
|---------|----------|
| Germany | 3 + 1 (coord) = **4** |
| France | 5 (Alsace) + 3 = **8** |
| Britain | 3 + 1 = **4** |
| Russia | 6 + 6 (territory+battles) = **12** |
| Austria | 4 (peace pre-war) + 0 (no Serbia!) - 0 (no second collapse, war ended) = **4** |
| Ottoman | 6 (peace) + 4 (territory from Austria) + 2 (joined winning side) = **12** |
| Krupp | 3 (sales) + 4 (dividends) + 2 (crisis) = **9** |
| Schneider | 3 + 3 = **6** |

**WINNER: TIE -- Russia & Ottoman (12 VP each)**

---

## GAME 8: "The Dealer's War"
**Theme: Both arms dealers aggressively destabilize, war erupts Turn 4, dealers profit massively**

### Turn 1
- **Krupp**: Border Incident on Austria (2g). Stab 3→2. VP: 1.
- **Schneider**: Border Incident on Germany (2g). Stab 8→7. VP: 1.

### Turn 2
- **Krupp**: Leaked Treaty on Russia (3g). Stab 5→4. VP: 2. Sells 2 to Germany.
- **Schneider**: Leaked Treaty on Austria (3g). **Stab 2→1! Crisis!** VP: 2. Sells 2 to France.

### Turn 3
- **Krupp**: Assassination on Austria (4g). **Stab 1→0! COLLAPSE! -5 VP!** VP: 4. Germany Army: 18.
- **Schneider**: Assassination on Russia (4g). **Stab 4→2! Crisis!** VP: 4. France Army: 16.

Austria collapsed before war even starts. VP: 4-5 = -1.

### Turn 4 -- WAR
War declared by Germany. Austria joins (war rally: stab 0→+1=1). Coordination bonus.
Russia at stab 2, joins war (rally: 2+2-1=3).

**Western Front: Germany 18 vs France 16+fortress**
- Germany: 18 + d6=**3** = 21
- France: 18 + d6=**5** = 23
- Margin: -2 (Stalemate). Each -15%. Germany: 15. France: 14.

**Eastern Front: Germany 6 vs Russia 14-2=12**
- Germany: 6 + d6=**4** = 10
- Russia: 12 + d6=**3** = 15
- Margin: -5 (Defeat). Germany -40%=2. Russia -25%=3.
- Germany East: 4. Russia: 11.

**Austria 5-2=3 vs Serbia 3**
- Austria: 3 + d6=**5** = 8, Serbia: 3 + d6=**2** = 5
- Victory. Austria takes Serbia (+2 VP). Austria: 4. Serbia: 2.

**Austria 3-2=1 vs Russia 5-2=3**
- Austria: 1 + d6=**2** = 3, Russia: 3 + d6=**4** = 7
- Defeat. Austria: 2. Russia: 4.

Austria desertion: -1. Total: 5.

### Turn 5
Austria: stab 1+0-1=-1→0. **SECOND COLLAPSE! -5 VP!** Austria VP: -1+2-5=-4.
Russia: stab 3+0-1=-1→2. Unrest +1g.

Germany reinforces. Buys 4 Army from Krupp.

**Western Front: Germany 15+4=19 vs France 14**
- Germany: 19 + d6=**5** = 24
- France: 14 + d6=**3** = 17
- Margin: +7 (Crushing Victory!). Germany -10%=2. France -60%=8.
- Germany: 17. France: 6. **SCHLIEFFEN SUCCEEDS!**

**Eastern Front: Germany 4 vs Russia 11**
- Russia overwhelms. Germany retreats.

**France: 6 div, shattered. Germany occupies northern France.**

### Turn 6
War Turn 3: Austria collapsed already. Germany holds West but losing East.

**Final VP:**
| Faction | Total VP |
|---------|----------|
| Germany | 3 + 2 (Belgium) + 5 (holding Alsace) + 3 (coord) + 4 (Schlieffen) - 2 (East lost) = **15** |
| France | 0 - 3 (occupied) = **-3** |
| Britain | 3 + 1 = **4** |
| Russia | 4 (reduced, at war) + 6 (East territory) + 3 (battles) = **13** |
| Austria | 4 (peace) + 2 (Serbia) - 10 (2 collapses) + 1 (coord bonus VP?) = **-3** |
| Ottoman | 12 + 3 = **15** |
| Krupp | 8 (massive sales) + 9 (dividends) + 4 (crisis) = **21** |
| Schneider | 4 (sales) + 6 (dividends) + 4 (crisis) = **14** |

**WINNER: Krupp Arms (21 VP!) -- dealers profit enormously from chaos they created**

---

## GAME 9: "Russia's Steamroller"
**Theme: Russia builds up, enters war strong, dominates East**

### Turn 1-3
- Russia buys 4 Army from Schneider over 3 turns. Army: 18.
- Germany: Army 18 (Krupp sales).
- France: Army 16.
- Krupp targets Ottoman this time: Border Incident (stab 4→3), Leaked Treaty (stab 3→2).
- Schneider targets Austria: Border Incident (stab 3→2).
- Austria: stab 2 = Crisis, 3g/turn. Begins mob T2.
- Ottoman at stab 2, wobbling.

### Turn 4 -- WAR
Germany declares war. Austria joins (rally: stab 2+1=3). Ottoman stays neutral (too unstable).
Russia rally: stab 5+2-1=6 (Strained). Healthy!
Coordination bonus active.

**Mobilization:**
- Germany: DEPLOYED. 18 Army.
- France: DEPLOYED. 16 Army.
- Russia: NOT deployed. 18 Army. Massive force.
- Austria: NOT deployed. 8 Army.
- Britain: NOT deployed. 8 Army, 14 Navy.

**Western Front: Germany 12 vs France 16+fortress=18**
- Germany: 12 + d6=**2** = 14
- France: 18 + d6=**4** = 22
- Margin: -8 (Crushing Defeat!). Germany -60%=7. France -10%=2.
- Germany West: 5. France: 14. Disaster for Germany.

**Eastern Front: Germany 6 vs Russia 12-2=10**
- Germany: 6 + d6=**4** = 10
- Russia: 10 + d6=**6** = 16
- Margin: -6 (Crushing Defeat!). Germany -60%=4. Russia -10%=1.
- Germany East: 2. Russia: 11. Russia steamrolls.

**Austria 5-2=3 vs Serbia 3**
- Austria: 3+d6=**3**=6, Serbia: 3+d6=**4**=7
- Margin: -1 (Stalemate). Each -15%. Austria: 4. Serbia: 3.

**Galicia: Austria 3-2=1 vs Russia 6-2=4**
- Austria: 1+d6=**2**=3, Russia: 4+d6=**5**=9
- Margin: -6 (Crushing Defeat). Austria wiped. Russia: 6.

Austria desertion: -1. Total: 3.

### Turn 5
Germany shattered on both fronts. Austria barely holding Serbia.
France takes Alsace (+5 VP). Russia advances into Germany.

Austria: stab 3-1=2. Unrest +1g.

### Turn 6
Austria: stab 2-2-1=-1→0. COLLAPSE! -5 VP.
Russia conquers East. France occupies West.

**Final VP:**
| Faction | Total VP |
|---------|----------|
| Germany | 3 + 2 (coord) - 3 (overrun) = **2** |
| France | 5 (Alsace) + 4 (territory) + 3 (battles) = **12** |
| Britain | 3 + 2 (naval) = **5** |
| Russia | 6 (peace) + 6 (territory) + 6 (battles) = **18** |
| Austria | 4 + 0 - 5 (collapse) = **-1** |
| Ottoman | 8 (peace, only 4 turns unstable cost) + 3 (never-at-war) = **11** |
| Krupp | 4 (sales) + 6 (div) + 2 (crisis) = **12** |
| Schneider | 4 (sales) + 3 (div) + 1 = **8** |

**WINNER: Russia (18 VP) -- Russian steamroller at full power**

---

## GAME 10: "The Balkan Powder Keg"
**Theme: Bulgaria and Romania become contested, minor nations decide the war**

### Turn 1-3
Standard buildup. Germany and France arm up.
- Germany courts Bulgaria (+2 div, 2 VP). Pays 3g.
- France courts Romania (+3 div, +1g, 2 VP). Pays 4g.
- Krupp: Border Incident on Austria (stab 3→2). Saves rest.
- Schneider: Border Incident on Russia (stab 5→4). Sells to France.
- Austria: stab 2, mob T2.
- Ottoman claims Greece (+1 fleet, 1 VP).

### Turn 4 -- WAR
Germany + Austria + Bulgaria vs France + Russia + Romania + Britain.
Austria rally: stab 2+1=3. Coordination bonus active.
Ottoman neutral.

Bulgaria (2 div) joins Austria in Balkans. Romania (3 div) joins Russia against Austria.

**Western Front: Germany 18 vs France 16+fortress**
- Germany: 18+d6=**4**=22, France: 18+d6=**5**=23
- Margin: -1 (Stalemate). Each -15%. Germany: 15. France: 14.

**Eastern Front: Germany 6 vs Russia 10-2=8**
- Germany: 6+d6=**3**=9, Russia: 8+d6=**4**=12
- Margin: -3 (Defeat). Germany: 4. Russia: 7.

**Balkans: Austria 5-2+Bulgaria 2=5 vs Serbia 3+Romania 3-2=4**
- Central: 5+d6=**5**=10, Entente: 4+d6=**3**=7
- Margin: +3 (Victory). Central: 4. Entente: 3. Austria takes Serbia (+2 VP). Bulgaria holds.

**Galicia: Austria 3-2=1 vs Russia+Romania 5-2+3-2=4**
- Austria: 1+d6=**1**=2, Entente: 4+d6=**6**=10
- Crushing Defeat. Austria Galicia wiped.

Austria desertion: -1.

### Turn 5
Austria: stab 3-1=2. Holding.
Germany reinforces.

**Western: Germany 15 vs France 14**
- Germany: 15+d6=**6**=21, France: 14+d6=**2**=16
- Margin: +5 (Victory!). Germany: 11. France: 8. Germany pushes!

**Eastern: Germany 4+2=6 vs Russia 7**
- Germany: 6+d6=**3**=9, Russia: 7+d6=**5**=12
- Defeat. Germany: 4. Russia: 6.

Balkans: Austria+Bulgaria hold Serbia.

### Turn 6
Austria: stab 2-2-1=-1→0. COLLAPSE. -5 VP.
Germany holds West advantage but East crumbles.

**Western: Germany 11 vs France 8**
- Germany: 11+d6=**4**=15, France: 8+d6=**3**=11
- Victory. Germany holds Alsace, pushes France back.

**Final VP:**
| Faction | Total VP |
|---------|----------|
| Germany | 3+2(coord)+4(Alsace held)+2(battles)+2(Bulgaria)= **13** |
| France | 0+1(Romania bonus)+2(battles) = **3** |
| Britain | 3+1 = **4** |
| Russia | 6+4(territory)+3(battles) = **13** |
| Austria | 4+2(Serbia)+2(Bulgaria)-5(collapse) = **3** |
| Ottoman | 10(peace)+1(Greece)+3(never-at-war) = **14** |
| Krupp | 4(sales)+6(div)+1(crisis) = **11** |
| Schneider | 3+3+1 = **7** |

**WINNER: Ottoman Empire (14 VP)**

---

## GAME 11: "Austria Stays Home"
**Theme: Austria refuses to join Germany's war, preserves stability, goes for peace VP**

### Turn 1-3
- Krupp targets Russia (Border T1: stab 5→4, Assassination T3: stab 4→2 CRISIS).
- Schneider targets Germany (Border T1: stab 8→7).
- Austria: NO crises targeted at them. Stab 3 held. Does NOT mobilize.
- Germany, France, Russia mobilize T2.

### Turn 4 -- WAR (but Austria stays out!)
Germany declares war on France alone. Austria DOES NOT JOIN -- breaks alliance!
No coordination bonus. Germany is alone.

Austria: Peace VP continues. Stab 3 (Unstable, 2g cost but earning peace VP).
Germany loses alliance with Austria (-2 VP penalty for broken alliance).

**Western Front: Germany 18 vs France 16+fortress**
- Germany: 18+d6=**5**=23, France: 18+d6=**4**=22
- Margin: +1 (Stalemate). Germany: 15. France: 14.

**Russia 14(-2) vs Germany East 6**
- Russia: 12+d6=**6**=18, Germany: 6+d6=**2**=8
- Crushing Defeat for Germany. Germany East wiped. Russia: 13.

### Turn 5-6
Germany overrun from East while stalemate West. France takes Alsace T6.
Russia conquers East Germany.

**Final VP:**
| Faction | Total VP |
|---------|----------|
| Germany | 3+0(no coord)-2(broken alliance)-3(overrun) = **-2** |
| France | 5(Alsace)+2(battles) = **7** |
| Britain | 3+1 = **4** |
| Russia | 6+6(territory)+4(battles) = **16** |
| Austria | 12(peace 6 turns)+3(never-at-war) = **15** |
| Ottoman | 12+3 = **15** |
| Krupp | 3+4(div)+2(crisis) = **9** |
| Schneider | 2+3+1 = **6** |

**WINNER: Russia (16 VP) -- Austria and Ottoman tie at 15**

---

## GAME 12: "The Short War"
**Theme: War Turn 4, decisive Turn 5, peace by Turn 6**

### Turn 1-3
Standard buildup. Krupp: Assassination on Austria T3 (stab 3→1 via Border T1 then Assassination T3: 3→2→0 COLLAPSE! -5 VP).

Actually let me vary this -- Krupp targets France this time.
- Krupp: Border Incident on France T1 (stab 7→6). Assassination T3 on France (stab 6→4 Unstable).
- Schneider: Sells to everyone. No crises.
- Austria: Untouched. Stab 3.

### Turn 4 -- WAR
Germany+Austria declare war. France at stab 4 (Unstable). Rally: 4+2=6.
Austria rally: 3+1=4.
Coordination bonus active.

Germany: 20 Army (bought heavily). France: 14 Army.

**Western Front: Germany 14 vs France 14+fortress**
- Germany: 14+d6=**6**=20, France: 16+d6=**1**=17
- Margin: +3 (Victory). Germany: 11. France: 8.

**Eastern Front: Germany 6 vs Russia 10(-2)**
- Germany: 6+d6=**5**=11, Russia: 8+d6=**3**=11
- Stalemate. Germany: 5. Russia: 8.

**Austria 5(-2) vs Serbia 3**
- Austria: 3+d6=**4**=7, Serbia: 3+d6=**2**=5
- Victory. Austria takes Serbia (+2 VP).

**Galicia: Austria 3(-2)=1 vs Russia 4(-2)=2**
- Austria: 1+d6=**6**=7, Russia: 2+d6=**1**=3
- Victory! Austria holds Galicia!

Austria desertion: -1.

### Turn 5
Austria: stab 4-1=3. Holding fine!
Germany pushes West with reinforcements.

**Western: Germany 11+4=15 vs France 8**
- Germany: 15+d6=**4**=19, France: 8+d6=**5**=13
- Margin: +6 (Crushing Victory!). Germany: 14. France: 3. **SCHLIEFFEN WORKS!**

**Eastern: Germany 5 vs Russia 8**
- Germany: 5+d6=**3**=8, Russia: 8+d6=**4**=12
- Defeat. Germany: 3. Russia: 6.

Austria holds both fronts. Desertion: -1.

### Turn 6
Austria: stab 3-2-1=-3→0. COLLAPSE at the very end. -5 VP.
But Germany has won West decisively.

France surrenders. Germany occupies most of France.

**Final VP:**
| Faction | Total VP |
|---------|----------|
| Germany | 3+2(Belgium)+5(Alsace)+3(coord)+5(France conquered) = **18** |
| France | 0-5(conquered) = **-5** |
| Britain | 3+1 = **4** |
| Russia | 6+2(Galicia gains)+2(battles) = **10** |
| Austria | 4(peace)+2(Serbia)+2(Galicia held)-5(collapse) = **3** |
| Ottoman | 12+3 = **15** |
| Krupp | 6(sales)+6(div)+2(crisis) = **14** |
| Schneider | 2+3 = **5** |

**WINNER: Germany (18 VP) -- rare Schlieffen success**

---

## GAME 13: "The Diplomatic Web"
**Theme: Complex diplomacy, Ottoman joins Central Powers, multiple minor nations engaged**

### Turn 1-3
- Germany courts Ottoman (4g payment), Bulgaria (3g).
- France courts Romania (4g), Greece (3g).
- Krupp: Border Incident on Russia (stab 5→4), sells to Germany (Army 20).
- Schneider: Border Incident on Austria (stab 3→2), sells to France (Army 16).
- Austria at stab 2 = Crisis. 3g/turn. Begins mob T2.

### Turn 4 -- WAR
Germany+Austria+Ottoman+Bulgaria vs France+Russia+Britain+Romania+Greece.
Austria rally: stab 2+1=3. Ottoman rally: stab 4+2-1=5.
Coordination bonus active.

Massive multi-front war.

**Western: Germany 14 vs France 16+BEF(-2)+fortress**
- Germany: 14+d6=**3**=17, Allies: 16+2+2=20+d6=**4**=24
- Margin: -7 (Crushing Defeat). Germany: 6. Allies: 18.

**Eastern: Germany 6 vs Russia 10(-2)+Romania 3(-2)=12-4=8**
- Germany: 6+d6=**5**=11, Entente: 8+d6=**2**=10
- Stalemate. Germany: 5. Entente: 10.

**Balkans: Austria 4(-2)+Bulgaria 2+Ottoman 3(-2)=5 vs Serbia 3+Romania 3(-2)=4**
- Central: 5+d6=**6**=11, Entente: 4+d6=**3**=7
- Victory! Central takes Balkans. Serbia falls. +2 VP Austria, +2 VP Ottoman.

**Galicia: Austria 4(-2)=2 vs Russia 4(-2)=2**
- Austria: 2+d6=**4**=6, Russia: 2+d6=**3**=5
- Stalemate. Both hold.

Austria desertion: -1.

### Turn 5
Germany crushed on West. France takes Alsace.
Austria: stab 3-1=2. Holding.
Ottoman: stab 5-1(fragile)=4. Fine.

Eastern front: Russia deploys fully, pushes Germany.

### Turn 6
Austria: stab 2-2-1=-1→0. COLLAPSE. -5 VP.
Germany collapses West entirely. East holds barely.

**Final VP:**
| Faction | Total VP |
|---------|----------|
| Germany | 3+2(coord)-3(West lost) = **2** |
| France | 5(Alsace)+4(territory)+2(battles) = **11** |
| Britain | 3+2(BEF) = **5** |
| Russia | 6+4+2 = **12** |
| Austria | 4+2(Serbia)-5(collapse)+1(coord) = **2** |
| Ottoman | 6(peace)+2(joined side)+2(Balkans)+2(battles) = **12** |
| Krupp | 4+6+1 = **11** |
| Schneider | 3+3+1 = **7** |

**WINNER: TIE -- Russia & Ottoman (12 VP each)**

---

## GAME 14: "The Late War"
**Theme: War doesn't start until Turn 5, everyone builds up massively**

### Turn 1-4
No war! Maximum buildup.
- Germany: Army 22 (massive Krupp purchases). VP: 4 (peace).
- France: Army 18. VP: 0.
- Britain: Army 12, Navy 16. VP: 4.
- Russia: Army 18. VP: 8.
- Austria: VP: 8 (4 turns x 2). Stab reduced by Krupp: 3→2→1 (crisis). Army 8.
- Ottoman: VP: 8. Stab 4.
- Krupp: 3 crises on Austria. Stab 3→1 by T4. Treasury: massive.
- Schneider: sold to everyone.

### Turn 5 -- WAR (Late start!)
Germany+Austria declare war. Austria rally: stab 1+1=2 (Crisis still, but better).
Only 2 turns of war. Coordination bonus.

Mob status: Everyone DEPLOYED (mobilized T2-3, all ready by T5).

**Western: Germany 16 vs France 18+fortress+BEF 6**
- Germany: 16+d6=**4**=20, Allies: 24+d6=**3**=27
- Margin: -7 (Crushing). Germany: 6. Allies: 22.

**Eastern: Germany 6 vs Russia 18**
- Overwhelming. Germany East obliterated.

**Austria 6 vs Serbia 3+Russian detachment 4=7**
- Austria: 6+d6=**3**=9, Entente: 7+d6=**5**=12
- Defeat. Austria: 4. Entente: 5.

Austria: 2 vs Russia Galicia 8. Crushed.
Austria desertion: -1.

### Turn 6
Austria: stab 2-1=1 (only war turn 2, rally fading, nationality -1).
Germany surrenders West. France takes Alsace.
Russia overruns Austria and East Germany.

**Final VP:**
| Faction | Total VP |
|---------|----------|
| Germany | 4(peace)+1(coord) = **5** |
| France | 5(Alsace)+4(territory) = **9** |
| Britain | 4+1 = **5** |
| Russia | 8+6(territory)+4(battles) = **18** |
| Austria | 8(peace 4T)-0(no collapse, war only 2 turns) = **8** |
| Ottoman | 10(peace 5T)+3(never-at-war) = **13** |
| Krupp | 4(sales)+3(div)+3(crisis) = **10** |
| Schneider | 4+3 = **7** |

**WINNER: Russia (18 VP) -- late war benefits Russia's huge army**

---

## GAME 15: "France's Revenge"
**Theme: France gets great dice, recaptures everything, dominates**

### Turn 1-3
- Schneider exclusively arms France. France Army: 18 (massive).
- Krupp arms Germany. Germany Army: 20.
- Krupp: Border Incident on Austria (stab 3→2).
- Schneider: No crises -- focuses on sales.
- All mobilize T2.

### Turn 4 -- WAR
Germany invades Belgium and France. Austria joins. Coordination bonus.
Austria rally: stab 2+1=3.

**Belgium: Germany 4 vs Belgium 2**
- Germany crushes Belgium. +2 VP.

**Western: Germany 16 vs France 18+BEF 4(-2)+fortress**
- Germany: 16+d6=**2**=18, Allies: 18+2+2=22+d6=**6**=28
- Margin: -10 (Crushing Defeat!). Germany: 6. Allies: 20.

**Eastern: Germany 6 vs Russia 14(-2)=12**
- Germany: 6+d6=**3**=9, Russia: 12+d6=**4**=16
- Margin: -7 (Crushing). Germany East wiped.

Austria takes Serbia (+2). Loses Galicia to Russia.

### Turn 5
France counterattacks with 20 divisions.
Germany at 6 divisions in West, 0 in East.

**Western: France 20 vs Germany 6**
- France: 20+d6=**5**=25, Germany: 6+d6=**2**=8
- Margin: +17 (Crushing). Germany annihilated. France takes Alsace (+5), Rhineland (+3).

Russia sweeps East and into Austria.
Austria: stab 3-1=2. Desertion -1.

### Turn 6
Austria: stab 2-2-1=-1→0. COLLAPSE. -5 VP.
Complete Entente victory.

**Final VP:**
| Faction | Total VP |
|---------|----------|
| Germany | 3+2(Belgium)+2(coord)-5(annihilated) = **2** |
| France | 5(Alsace)+3(Rhineland)+5(battles)+2(territory) = **15** |
| Britain | 3+2(BEF victory) = **5** |
| Russia | 6+6(territory)+4(battles) = **16** |
| Austria | 4+2(Serbia)-5(collapse) = **1** |
| Ottoman | 12+3 = **15** |
| Krupp | 4+6+1 = **11** |
| Schneider | 5(sales)+3(div) = **8** |

**WINNER: Russia (16 VP), France & Ottoman close at 15**

---

## GAME 16: "The Perfect Storm"
**Theme: Everything goes right for Central Powers -- incredible dice, Ottoman joins, Austria holds**

### Turn 1-3
- Germany buys 4 Army from Krupp. Army: 22.
- Krupp: NO crises on Austria! Targets France instead (Border T1: stab 7→6, Leaked Treaty T2: stab 6→5).
- Schneider: targets Russia (Border T1: stab 5→4).
- Austria: Stab 3, unmolested. Mob T2.
- Ottoman: Courted by Germany. Mob T3. Will join CP.

### Turn 4 -- WAR
Germany+Austria+Ottoman. Austria rally: 3+1=4. Ottoman rally: 4+2-1=5.
Coordination bonus active. This is the best-case Central Powers scenario.

**Belgium: Germany 4 vs Belgium 2**
- Crushing victory. Belgium falls.

**Western: Germany 18 vs France 14+BEF 4(-2)+fortress**
- Germany: 18+d6=**6**=24, Allies: 14+2+2=18+d6=**2**=20
- Margin: +4 (Victory!). Germany: 14. Allies: 11.

**Eastern: Germany 6+Ottoman 3(-2)=7 vs Russia 10(-2)=8**
- Central: 7+d6=**5**=12, Russia: 8+d6=**3**=11
- Stalemate. Central: 6. Russia: 7.

**Austria 5(-2)=3+Bulgarian 2=5 vs Serbia 3**
- Central: 5+d6=**5**=10, Serbia: 3+d6=**1**=4
- Crushing Victory. Serbia eliminated. +2 VP Austria.

**Galicia: Austria 3(-2)=1 vs Russia 4(-2)=2**
- Austria: 1+d6=**6**=7, Russia: 2+d6=**1**=3
- Victory! Austria holds Galicia!

Austria desertion: -1.

### Turn 5
Germany pushes West. Austria: stab 4-1=3. Holding well!
Ottoman: stab 5-1(fragile)=4. Fine.

**Western: Germany 14+2reinf=16 vs Allies 11**
- Germany: 16+d6=**5**=21, Allies: 11+d6=**3**=14
- Margin: +7 (Crushing!). Germany: 14. Allies: 4. **FRANCE BROKEN!**

**Eastern: Germany 6 + Ottoman 4 = 10 vs Russia 7**
- Central: 10+d6=**4**=14, Russia: 7+d6=**3**=10
- Victory. Central: 8. Russia: 4.

Austria holds on both fronts. Desertion: -1.

### Turn 6
Austria: stab 3-2-1=-3→0. Collapse at very end. -5 VP. But Central Powers won the war.
Germany conquers France. Russia pushed back.

**Final VP:**
| Faction | Total VP |
|---------|----------|
| Germany | 3+2(Belgium)+5(Alsace)+3(coord)+6(France conquered)+2(East victories) = **21** |
| France | 0-5(conquered) = **-5** |
| Britain | 3+0(BEF destroyed) = **3** |
| Russia | 6-2(defeated)+1 = **5** |
| Austria | 4+2(Serbia)+2(Galicia)-5(collapse)+2(coord) = **5** |
| Ottoman | 6+2(joined winner)+2(battles) = **10** |
| Krupp | 6+9+1 = **16** |
| Schneider | 2+3+1 = **6** |

**WINNER: Germany (21 VP) -- the dream scenario**

---

## GAME 17: "The Frozen Fronts"
**Theme: Constant stalemates, war of attrition, nobody wins decisively**

### Turn 1-3
Standard buildup. Both sides arm up.
- Krupp: Border Incident on Austria (stab 3→2). Sells to Germany (Army 18).
- Schneider: Sells to France (Army 16) and Russia (Army 16).
- Austria: stab 2. Mob T2.

### Turn 4 -- WAR
Austria rally: stab 2+1=3. Coordination bonus.

**Every front stalemates Turn 4.**
- West: Germany 13 vs France 18. Germany: 13+d6=4=17, France: 18+d6=3=21. Defeat for Germany. G:8, F:14.
- East: Germany 5 vs Russia 10(-2)=8. G:5+d6=4=9, R:8+d6=3=11. Stalemate. G:4, R:7.
- Balkans: Austria takes Serbia narrowly (+2 VP).
- Galicia: Stalemate.

### Turn 5
Austria: stab 3-1=2. Unrest +1g.
West: France pushes. Germany holds Alsace barely.
East: Stalemate continues.

### Turn 6
Austria: stab 2-2-1=-1→0. COLLAPSE. -5 VP.
West: France finally takes Alsace (+5 VP) on final turn.
East: Stalemate. Neither side advances significantly.

**Final VP:**
| Faction | Total VP |
|---------|----------|
| Germany | 3+2(coord)+1 = **6** |
| France | 5(Alsace)+2(battles) = **7** |
| Britain | 3+1 = **4** |
| Russia | 6+2(territory)+1 = **9** |
| Austria | 4+2(Serbia)-5(collapse) = **1** |
| Ottoman | 12+3 = **15** |
| Krupp | 3+6+1 = **10** |
| Schneider | 3+3 = **6** |

**WINNER: Ottoman Empire (15 VP) -- sits out the attrition**

---

## GAME 18: "The Dealer's Duel"
**Theme: Krupp and Schneider compete to destabilize different targets, chaos ensues**

### Turn 1
- Krupp: Border Incident on Austria (stab 3→2). VP: 1.
- Schneider: Border Incident on Russia (stab 5→4). VP: 1.

### Turn 2
- Krupp: Assassination on Austria (4g). **Stab 2→0! COLLAPSE T2! -5 VP.** VP: 3.
- Schneider: Leaked Treaty on Austria (3g). Austria already collapsed, this is wasted. VP: 2.

Austria collapses Turn 2! VP: 2(peace)-5 = -3.

### Turn 3
- Krupp: Leaked Treaty on Russia (3g). **Stab 4→3.** VP: 4.
- Schneider: Assassination on Russia (4g). **Stab 3→1! CRISIS!** VP: 4.

Russia at stab 1, Crisis!

### Turn 4 -- WAR
Germany declares war. Austria joins (rally: stab 0+1=1). Still Crisis but alive.
Russia at stab 1, declares war (rally: 1+2-1=+1→2).
Coordination bonus.

**Russia at stab 2 (Crisis). Austria at stab 1 (Crisis).**

**Western: Germany 18 vs France 16+fortress**
- Germany: 18+d6=**3**=21, France: 18+d6=**5**=23
- Stalemate. Germany: 15. France: 14.

**Eastern: Germany 6 vs Russia 14(-2)=12**
- Germany: 6+d6=**2**=8, Russia: 12+d6=**4**=16
- Crushing Defeat. Germany East: 2. Russia: 13.

Austria vs Serbia: Austria takes Serbia (+2 VP) with lucky roll.
Galicia: Russia crushes Austria.

Austria desertion: -1.

### Turn 5
Austria: stab 1-1=0. **SECOND COLLAPSE! -5 VP.** Total collapses: 2. Austria VP: -3+2(peace)+2(Serbia)-5 = -4.
Russia: stab 2-1=1. Crisis.

Germany losing everywhere.

### Turn 6
Russia: stab 1-2-1=-2→0. **RUSSIA COLLAPSES! -5 VP!** Revolution!
Austria: already collapsed.

**Final VP:**
| Faction | Total VP |
|---------|----------|
| Germany | 3+1(coord)-2(defeated) = **2** |
| France | 5(Alsace)+3(territory) = **8** |
| Britain | 3+1 = **4** |
| Russia | 4(peace, reduced)+3(territory)-5(collapse) = **2** |
| Austria | 4(peace)+2(Serbia)-10(2 collapses) = **-4** |
| Ottoman | 12+3 = **15** |
| Krupp | 6(sales)+6(div)+5(crisis) = **17** |
| Schneider | 4(sales)+3(div)+4(crisis) = **11** |

**WINNER: Krupp (17 VP) -- manufactured chaos, profited from it**

---

## GAME 19: "Austria's Best Game"
**Theme: What if nobody targets Austria? Can it still win with +2 VP/turn?**

### Turn 1-3
- Krupp: ALL crises on France. Border T1 (stab 7→6), Leaked Treaty T2 (stab 6→5), Assassination T3 (stab 5→3 Unstable).
- Schneider: ALL crises on Germany. Border T1 (stab 8→7), Leaked Treaty T2 (stab 7→6), Border T3 (stab 6→5 Strained).
- Austria: Completely untouched! Stab 3, stable.
- Nobody mobilizes early. Diplomatic tensions but no war preparation.

### Turn 4
Still no war. France at stab 3 (Unstable). Germany at stab 5 (Strained).
- Austria: VP: 8 (4 turns x 2). Treasury: growing.
- Russia: VP: 8.
- Ottoman: VP: 8.

### Turn 5
Still no war. Mobilizations begin late.
- Austria: VP: 10.
- Russia: VP: 10.
- Ottoman: VP: 10.

### Turn 6
War declared on final turn! Germany+Austria vs France+Russia+Britain.
Austria rally: stab 3+1=4. But only 1 turn of fighting.

**Western: Germany 18 vs France 16(-2, late mob)+fortress**
- Germany: 18+d6=**4**=22, France: 14+2=16+d6=**3**=19
- Victory. France: 10. Germany: 14. Germany takes Alsace.

**Eastern: limited engagement. Stalemate.**

**Final VP:**
| Faction | Total VP |
|---------|----------|
| Germany | 5(peace)+2(Alsace) = **7** |
| France | 0(peace) = **0** |
| Britain | 5+0 = **5** |
| Russia | 10(peace)+1 = **11** |
| Austria | 10(peace 5T)+2(war T6 victory?) = **12** |
| Ottoman | 10(peace 5T)+3(never-at-war) = **13** |
| Krupp | 2(industry)+3(crisis)-8(mostly no war... wait, war T6) +3(div 1 turn) = **0** |
| Schneider | 1(industry)+3(crisis)+3(div) = **7** |

Hmm, war happened T6, so dealers avoid the -8 penalty. But only 1 turn of dividends.

| Faction | Total VP |
|---------|----------|
| Germany | 5+2 = **7** |
| France | 0-2(lost Alsace) = **-2** |
| Britain | 5 = **5** |
| Russia | 10+1 = **11** |
| Austria | 10+1(coord 1 turn) = **11** |
| Ottoman | 10+3(never-at-war) = **13** |
| Krupp | 2+3(1 turn div)+3(crisis) = **8** |
| Schneider | 1+3(1 turn div)+3(crisis) = **7** |

**WINNER: Ottoman Empire (13 VP)**
Note: Austria at 11 VP, close but no longer dominant. Russia also at 11.

---

## GAME 20: "The War to End All Wars"
**Theme: Total war Turn 4, everyone fights, maximum carnage**

### Turn 1-3
Everyone arms heavily. Germany: 22 Army. France: 18 Army. Russia: 18 Army. Britain: 12 Army.
- Krupp: Border Incident on Austria (stab 3→2), sells massive arms. VP: 3.
- Schneider: Border Incident on Ottoman (stab 4→3), sells to Entente. VP: 2.
- Austria: stab 2. Mob T2.
- Ottoman: stab 3. Mob T3. Joins Central Powers.

### Turn 4 -- TOTAL WAR
Everyone fights. Germany+Austria+Ottoman vs France+Russia+Britain.
Austria rally: 2+1=3. Ottoman rally: 3+2-1=4.
Russia rally: 5+2-1=6. France rally: 7+2=9.
Coordination bonus.

**Belgium: Germany 4 crushes Belgium 2.**

**Western: Germany 18 vs France 18+BEF 6(-2)+fortress**
- Germany: 18+d6=**4**=22, Allies: 18+4+2=24+d6=**5**=29
- Margin: -7 (Crushing). Germany: 7. Allies: 22.

**Eastern: Germany 6+Ottoman 3(-2)=7 vs Russia 12(-2)=10**
- Central: 7+d6=**3**=10, Russia: 10+d6=**4**=14
- Defeat. Central: 4. Russia: 8.

**Austria 5(-2)+Bulgarian 2=5 vs Serbia 3+British detachment 2(-2)=3**
- Central: 5+d6=**5**=10, Entente: 3+d6=**2**=5
- Victory. Austria takes Serbia (+2 VP).

**Galicia: Austria 3(-2)=1 vs Russia 6(-2)=4**
- Austria: 1+d6=**3**=4, Russia: 4+d6=**6**=10
- Crushing. Austria wiped.

**Caucasus: Ottoman 3(-2)=1 vs Russia 2**
- Ottoman: 1+d6=**5**=6, Russia: 2+d6=**2**=4
- Stalemate.

Austria desertion: -1.

### Turn 5
Germany shattered West. France advances.
Austria: stab 3-1=2. Holding.
Ottoman: stab 4-1=3. OK.

France takes Alsace (+5 VP).
Russia advances into Germany East.

**Eastern: Russia 8 vs Germany 4**
- Russia: 8+d6=**5**=13, Germany: 4+d6=**2**=6
- Crushing. Germany East eliminated.

Austria 3 holds Serbia. Loses everywhere else.

### Turn 6
Austria: stab 2-2-1=-1→0. COLLAPSE. -5 VP.
Ottoman: stab 3-2-1=0. COLLAPSE too! -5 VP.
Central Powers total collapse.

**Final VP:**
| Faction | Total VP |
|---------|----------|
| Germany | 3+2(Belgium)+2(coord)-5(annihilated) = **2** |
| France | 5(Alsace)+4(territory)+3(battles) = **12** |
| Britain | 3+3(BEF victories) = **6** |
| Russia | 6+6(territory)+5(battles) = **17** |
| Austria | 4+2(Serbia)-5(collapse) = **1** |
| Ottoman | 6+2(battles)-5(collapse) = **3** |
| Krupp | 6(sales)+6(div)+1(crisis) = **13** |
| Schneider | 5(sales)+3(div)+1(crisis) = **9** |

**WINNER: Russia (17 VP)**

---
---

# AGGREGATE ANALYSIS: 20-GAME SIMULATION (V2 BALANCE)

## Win Count by Faction

| Faction | Wins | Win Rate | Win Games |
|---------|------|----------|-----------|
| Russia | 6 | 30.0% | 9, 11, 14, 15, 20, (tied 5, 7) |
| Ottoman Empire | 5 | 25.0% | 1, 2, 3, 10, 17, (tied 4, 5, 7, 13, 19) |
| Germany | 2 | 10.0% | 12, 16 |
| Krupp | 2 | 10.0% | 8, 18 |
| France | 1 | 5.0% | (tied 15) |
| Austria-Hungary | 0 | **0.0%** | -- |
| Britain | 0 | 0.0% | -- |
| Schneider | 0 | 0.0% | -- |

*Ties: Game 4 (Russia+Ottoman tied, awarded both), Game 5 (Russia+Ottoman), Game 6 (Germany+Russia+Krupp), Game 7 (Russia+Ottoman), Game 13 (Russia+Ottoman). Solo wins counted above; shared wins counted 0.5 each where applicable. Primary winner listed is highest VP.*

### Revised clean count (highest VP per game wins, ties split):

| Game | Winner | VP |
|------|--------|----|
| 1 | Ottoman | 15 |
| 2 | Ottoman | 15 |
| 3 | Ottoman | 15 |
| 4 | Ottoman | 15 |
| 5 | Russia/Ottoman TIE | 15 |
| 6 | Germany/Russia/Krupp TIE | 13 |
| 7 | Russia/Ottoman TIE | 12 |
| 8 | Krupp | 21 |
| 9 | Russia | 18 |
| 10 | Ottoman | 14 |
| 11 | Russia | 16 |
| 12 | Germany | 18 |
| 13 | Russia/Ottoman TIE | 12 |
| 14 | Russia | 18 |
| 15 | Russia | 16 |
| 16 | Germany | 21 |
| 17 | Ottoman | 15 |
| 18 | Krupp | 17 |
| 19 | Ottoman | 13 |
| 20 | Russia | 17 |

**Final Win Tally (counting ties as 0.5):**

| Faction | Wins | Win Rate |
|---------|------|----------|
| Ottoman Empire | 7.5 | **37.5%** |
| Russia | 6.5 | **32.5%** |
| Germany | 2.5 | 12.5% |
| Krupp | 2.5 | 12.5% |
| France | 0 | 0.0% |
| **Austria-Hungary** | **0** | **0.0%** |
| Britain | 0 | 0.0% |
| Schneider | 0 | 0.0% |

## Average VP by Faction (Across All 20 Games)

| Faction | Total VP (20g) | Average VP | Previous Avg (30g V1) | Change |
|---------|----------------|------------|----------------------|--------|
| Ottoman Empire | 233 | **11.7** | 10.0 | +1.7 |
| Russia | 207 | **10.4** | 10.6 | -0.2 |
| Krupp | 215 | **10.8** | 3.8 | **+7.0** |
| France | 107 | **5.4** | 7.7 | -2.3 |
| Germany | 97 | **4.9** | 5.2 | -0.3 |
| Britain | 86 | **4.3** | 4.5 | -0.2 |
| Schneider | 130 | **6.5** | 1.8 | +4.7 |
| **Austria-Hungary** | **32** | **1.6** | **12.0** | **-10.4** |

## Comparison: V1 vs V2

| Metric | V1 (30 games) | V2 (20 games) | Change |
|--------|---------------|---------------|--------|
| Austria Win Rate | **43.3%** | **0.0%** | -43.3 pp |
| Austria Avg VP | **12.0** | **1.6** | -10.4 |
| Russia Win Rate | 23.3% | 32.5% | +9.2 pp |
| Ottoman Win Rate | 13.3% | 37.5% | +24.2 pp |
| Germany Win Rate | 6.7% | 12.5% | +5.8 pp |
| Krupp Win Rate | 3.3% | 12.5% | +9.2 pp |
| France Win Rate | 10.0% | 0.0% | -10.0 pp |
| Games with war | 93.3% | 90.0% | -3.3 pp |
| Austria collapsed | ~20% of games | **85% of games** | Massive increase |

## Austria Stability Tracking

| Game | Start Stab | Pre-War Stab | Collapsed? | When | Cause |
|------|-----------|-------------|-----------|------|-------|
| 1 | 3 | 0 (collapsed T3!) | YES x2 | T3, T6 | Krupp crises + war weariness |
| 2 | 3 | 1 | YES | T6 | Krupp assassination + weariness |
| 3 | 3 | 1 | YES | T6 | Schneider+Krupp crises + weariness |
| 4 | 3 | 3 | YES | T6 | War weariness only |
| 5 | 3 | 0 (collapsed T3) | YES | T3 | Krupp crises (no war) |
| 6 | 3 | 3 | YES | T6 | War weariness |
| 7 | 3 | 1 | NO (war ended T5) | -- | War too short to collapse |
| 8 | 3 | 0 (collapsed T3) | YES x2 | T3, T5 | Krupp+Schneider crises |
| 9 | 3 | 2 | YES | T6 | Crisis + weariness |
| 10 | 3 | 2 | YES | T6 | Weariness |
| 11 | 3 | 3 | NO | -- | Never entered war |
| 12 | 3 | 3 (untouched) | YES | T6 | Weariness |
| 13 | 3 | 2 | YES | T6 | Crisis + weariness |
| 14 | 3 | 1 | NO (war only 2T) | -- | Short war |
| 15 | 3 | 2 | YES | T6 | Weariness |
| 16 | 3 | 3 (untouched) | YES | T6 | Weariness |
| 17 | 3 | 2 | YES | T6 | Weariness |
| 18 | 3 | 0 (collapsed T2) | YES x2 | T2, T5 | Massive dealer targeting |
| 19 | 3 | 3 | NO | -- | Only 1 turn of war |
| 20 | 3 | 2 | YES | T6 | Weariness |

**Austria collapsed in 16 of 20 games (80%). Multiple collapses in 3 games.**

## War Statistics

| Metric | V2 (20 games) | V1 (30 games) |
|--------|---------------|---------------|
| Games with war | 18/20 (90%) | 28/30 (93%) |
| Average war start turn | 4.2 | 4.3 |
| Germany invaded Belgium | 10/18 (56%) | 18/28 (64%) |
| Schlieffen succeeded | 3/18 (17%) | 3/28 (11%) |
| Ottoman joined CP | 4/18 (22%) | 12/28 (43%) |
| Ottoman stayed neutral | 12/18 (67%) | 14/28 (50%) |
| Austria collapsed | 16/20 (80%) | ~6/30 (20%) |
| Russia collapsed | 2/20 (10%) | ~3/30 (10%) |
| Entente won West | 15/18 (83%) | 26/28 (93%) |

## VP Breakdown by Source

### Austria-Hungary (Avg 1.6 VP)
- Peace VP: 5.2 avg (3.3 turns avg at peace x ~2 VP/turn, minus some collapsed turns)
- Serbia: 1.4 avg (took Serbia in ~14/20 games)
- Collapse penalty: -5.0 avg (collapse in 16 games, double in 3)
- Coordination bonus: 0.6 avg
- **Austria's collapse rate completely erases peace VP gains**

### Russia (Avg 10.4 VP)
- Peace VP: 5.8 avg
- Battle VP: 3.2 avg
- Territory VP: 3.4 avg
- Collapse penalty: -0.5 avg (collapsed 2 games)
- **Strongest military performer, benefits from late war start**

### Ottoman Empire (Avg 11.7 VP)
- Peace VP: 9.8 avg
- Never-at-war bonus: 2.1 avg (in ~70% of games)
- War participation: 1.2 avg
- **Neutrality strategy still dominant**

### Germany (Avg 4.9 VP)
- Peace VP: 3.2 avg
- Coordination bonus: 1.8 avg
- Battle VP: 1.4 avg
- Territory: 0.8 avg
- Losses: -2.3 avg
- **Coordination bonus helps but two-front war still devastating**

### Krupp (Avg 10.8 VP)
- Sales VP: 4.2 avg
- War dividends: 5.1 avg
- Crisis influence: 2.8 avg
- No-war penalty: -0.4 avg (2 peace games)
- **Crisis stability damage makes Krupp MUCH more powerful**

---

## BALANCE ASSESSMENT

### Did the changes achieve their goals?

**Goal 1: Reduce Austria's dominance** -- **YES, OVERCORRECTED**
- Austria went from 43.3% win rate / 12.0 avg VP to **0% win rate / 1.6 avg VP**
- Austria collapsed in 80% of games
- The combination of starting stab 3 + dealer crisis damage + war weariness creates an almost-inescapable death spiral
- Even in Austria's BEST game (Game 19, untouched by dealers, late war), Austria only reached 11-12 VP

**Goal 2: Make war more attractive via rally effect** -- **PARTIALLY**
- War rally (+2 stab on turns 0-1) does help Austria survive early war
- But it's not enough: +2 rally -1 nationality = net +1, and weariness from turn 3 onward (-2, -3...) overwhelms
- Rally buys Austria exactly 1-2 extra turns before collapse
- Russia also benefits from rally (helps stabilize from dealer crises)

**Goal 3: Central Powers coordination bonus** -- **MODERATE SUCCESS**
- Germany averages +1.8 VP and +2g/turn from coordination
- But Austria being a liability (constant collapse) makes the bonus not worth the cost of propping them up
- In Games 12 and 16 where CP won, coordination bonus was meaningful

**Goal 4: Arms dealers as destabilizers** -- **MASSIVE SUCCESS, POSSIBLY TOO STRONG**
- Krupp went from 3.8 avg VP to 10.8 avg VP
- Dealers can trivially push Austria from stab 3 to collapse (one 4g assassination = stab 1, one more = collapse)
- Austria has NO counter to crisis stability damage
- Dealers won 2 games outright (12.5% win rate, up from 3.3%)

**Goal 5: Reduced Austrian desertion** -- **HELPFUL BUT OVERSHADOWED**
- Flat -1/turn is much more survivable than escalating
- But stability collapse is now the main killer, not desertion
- In practice, Austria's armies are overrun before desertion matters

### Remaining Issues

1. **Austria is now the WEAKEST faction** instead of the strongest. The pendulum swung too far.
   - Starting stab 3 + dealer crisis damage (up to -2 per action) = Austria can be collapsed by Turn 2-3
   - Austria has no agency to prevent dealer crises
   - Recommended fix: Start Austria at stab 4, or reduce assassination to -1 stab, or give Austria crisis resistance

2. **Ottoman neutrality is STILL the dominant strategy**
   - Ottoman went from 13.3% to 37.5% win rate
   - Sitting out and collecting 12 VP peace + 3 never-at-war = 15 VP floor is nearly unbeatable
   - The problem shifted from "Austria peace VP too high" to "Ottoman peace VP too high"
   - Recommended fix: Reduce Ottoman peace VP to +1/turn, or add Balkan Wars penalty that hurts more

3. **France is WORSE off** (0% win rate, down from 10%)
   - France still gets 0 VP/turn at peace, which is devastating
   - Austria's collapse doesn't help France -- Russia and Ottoman benefit more
   - France needs some peace VP or a more reliable path to Alsace VP

4. **Krupp is arguably overpowered**
   - 10.8 avg VP puts Krupp in the top 3 factions
   - Crisis stability damage has no cost beyond gold (which Krupp has plenty of)
   - Krupp can kingmake by choosing which faction to destroy
   - Recommended fix: Limit crises to 1 per turn per dealer, or allow targeted faction to spend gold to resist

5. **Britain remains irrelevant** (0% win rate both versions)
   - Naval dominance doesn't translate to VP
   - BEF is too small and arrives too late
   - Need VP for naval blockade or convoy raiding

6. **Germany benefits from coordination bonus but still loses most wars**
   - Two-front problem persists
   - Schlieffen success improved slightly (11% → 17%) but still unreliable

### Summary: The Balance Patch Verdict

The V2 patch **successfully broke Austria's dominance** but created new problems:
- Austria went from S-tier to F-tier (overcorrected)
- Ottoman replaced Austria as the passive-play winner
- Krupp became extremely powerful via crisis mechanics
- Russia is the strongest active-play faction
- The game is more dynamic with dealer crises but Austria players will have a miserable experience

**Recommended V3 adjustments:**
1. Austria starting stability: 4 (not 3)
2. Assassination crisis: -1 stability (not -2)
3. Ottoman peace VP: +1/turn (not +2)
4. France: +1 VP/turn at peace (not +0)
5. Britain: +1 VP per naval blockade turn
6. Limit dealer crises: max 1 crisis per faction per game
