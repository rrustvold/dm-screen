Since the introduction of CR in third edition 25 years ago, players and DMs have been complaining about how the CR system doesn't work. And yet, WotC keeps including it. So why doesn't it work, and how do we fix it?
## Literature Review
### 1st Edition
In ye olden days, there were no CRs, only hit dice (HD) and levels. Everything was levels. A monster's HD was its level. The first level of a dungeon was filled with first level (1 HD) monsters where level 1 characters would cast level 1 spells in hopes of finding level 1 treasure. The second level of a dungeon was filled with level 2 (2 HD) monsters, and so on. The game was static like this. If the first level of a dungeon was too easy, players would go deeper. If it got too hard, then they would retreat back up. In this way players were able to modulate the difficulty of encounters and rewards, and the DM didn't need to worry about it so much.
### 3rd Edition
Somewhere along the way, adventure designers started making more story-forward adventures with set-piece encounters in them, rather than just endless random dungeons. And now the designers needed to carefully craft the encounter difficulty to a particular party, because the encounter was more or less foisted upon the players. So third edition comes up with challenge rating as a better way to assess a monster's difficulty. The idea was: 

>a single CR X monster is (supposedly) an easy to moderate challenge for a group of 4 level X characters. 

The more you deviate from that formula in any way, the less it works. If you have four level 4 characters, then a CR 4 monster will be a good encounter. But if you have a group of 8 characters spanning levels 2-5, you are in trouble. Similarly, if you have 24 kobolds, it's hard to know how that will shake out using CR. To remedy this, the 3rd edition folks made a fairly complicated table to show you how many monsters you can include at different CRs.
### 5th edition
By the time we get to fifth edition, things are pretty much the same as in third, but simplified. The 5th ed DMG gives some nice advice on multiplying the encounter xp budget by a factor based on the number of monsters in it, and again if you have more or fewer than 4 players. But still, the more you deviated from "A CR X monster is a good challenge for 4 level X characters", the less it works. It also didn't work so well because a lot of the monsters just had inappropriate CRs assigned to them.
### 5.5 ed
In 5.5 the designers get rid of the multiplier for encounters with multiple monsters, presumably to save on word count, and because they are almost ready to throw in the towel completely on XP budgets. Fortunately, they fixed up the monster manual so that monsters have more accurate CR assignments. The designers also retooled monsters so that DMs didn't need to worry as much if they are playing the monsters correctly. Whenever a monster has multiple attacks, they are generally on par with each other.

## Why doesn't it Work?
The reason the XP budget stuff never really worked as you deviate from the formula, is because it doesn't follow [Lanchester's Square Law](https://en.wikipedia.org/wiki/Lanchester's_laws#Lanchester's_square_law). Lanchester's laws are a system of ordinary linear differential equations that model the strength of armies in battle over time as they kill each other. The main takeaway from it is that body count (or action economy) beats firepower by the square of their ratios. That is, if you have two exactly equal armies, then you will end in a draw where everyone dies. If one side has twice as many soldiers, then the other side needs to have 4x the firepower to stay competitive. 

In dnd speak, this means that 8 PCs can handle 4x as much combat as a party of 4. Or to flip it around, 8 kobolds are 4 times as deadly as 4 kobolds. 16 kobolds are 16 times as deadly as 4 kobolds. A party of 3 PCs is only 56% as strong as a party of 4. A single PC is only 6% as strong as a party of 4.

Or to combine them at the same time, it means if you have a good healthy encounter for a group of 4, then to make it appropriate for a group of 8 you need to double the monsters in the encounter. Doubling the monsters doubles the number of HP that the monsters have, and it doubles the number of attacks and damage.

# A better way
But this is no way to do things, so I made a calculator to predict the outcome of dnd battle. It can be found at https://dm-screen.lasthaven.quest 

## How to use it
Loading the website might take a minute, because it's running on a heroku eco dyno, but once it's booted up you should be good. Note that I made this website for myself, so it is designed to make sense to me. I'm not a UI/UX or front end designer, and I'm not going to baby you or me by making my tools "intuitive". 

First, go to the "Lanchester" tab
## Step 1: enter the party stats
Click the blue add player button to add players to the party. You can manually adjust each player's AC, HP, damage, and attack bonus. (You can record initiative but it doesn't actually do anything). You can load in a generic level x character using the drop down. The stats that load in by default are my best guess at how a character does at each level.

## Step 2: enter the monsters
For each different type of monster, click the blue "add monster type" button. Give it a name if you want. Enter how many monsters there are in the horde. Enter how many attacks per turn each monster gets, the attack bonus, and the attack damage. Enter the starting or max hp of the monster in the "current hit points" field. The last two fields (maximum hp and initiative) don't do anything.

If you have another type of monster, then add another monster block

## Step 3: results
Check out the cool graph. It shows you the sum of HP of the party in blue, and of monsters in red, over the course of the battle. If the red line goes to 0 before the blue line, then the players are going to win. If the blue line goes to 0 first, then you have a TPK. 

But! This also shows you  how many rounds the battle should take. As a DM, you can then tweak the number of monsters, the damage they do, their AC, and see how that affects the impact on the players, and how long a combat should take.


# Examples
## Hobgobs
This week I ran a session for three players. All three characters were level 4. I attacked them with 7 orcs (technically I attacked them with 7 hobgoblins because orcs are not in the monster manual anymore). According to the DMG, this should have been an easy encounter. In reality, the wizard was dead after 1 round, and the rest of the encounter was spent trying to safely retreat. So let's see how Lanchester said this would go


![Hobgobs Attack](hobgobs.png)
Lanchester says this "easy" encounter is actually a TPK in 3 turns. (oops, but I didn't have this tool yet, so how was I to know). And indeed, that was the trajectory they were on before retreating. Lanchester also predicted correctly a downed PC after 1 round.

## Banditos
Last week in Hunter's game, we fought a bunch of banditos using seven level 3 characteres! My memory is hazy on the details, but I do remember it took about 6 or 7 rounds. I also remember that the bulk of the banditos had about 12 AC and 12 HP, and the tough ones had somewhere around 25 hp. Maybe it was something like this?
![Banditos Setup](banditsSetup.png)
![Bandit's Graph](banditsGraph.png)
# Take aways
In battles where there are lots of little monsters, and where the players win, you'll generally see a point where the player HP flattens out. In the above example with the banditos, the last few turns are basically just the players cleaning up the remnants. 

The calculator assumes that players are focusing their attacks on the same foes in a horde (which they typically do, because that is the smart thing to do). But it also assumes the same of the monsters. So if the DM is being ~~a wuss~~ nice, and dividing attacks around the party, then the monsters are not going to be hitting as hard. Both sides should be trying to attack the squishiest, weakest opponents first.

If you want a battle to go longer, then increase HP or AC of monsters. If you want it to be shorter, then decrease HP or AC.

If you want the battle to be costlier for the players, then increase the number of attacks monsters get, or the damage each attack does. You could increase the number of monsters, but this also increase the HP of the monsters, so you make things longer doing that. 

If you increase the damage per attack monsters do, then that will make the battle costlier for the players, but it also adds a lot of variance and unpredictability to the fight. A few lucky rolls could do a huge amount of damage at once. If the monsters make a lot of small attacks, then things will average out more smoothly.

Similarly, increasing the AC of monsters increases the variance of the results, because players are more likely to miss and do 0 damage, which means they might fall behind schedule in terms of reducing the monsters' action economy.

