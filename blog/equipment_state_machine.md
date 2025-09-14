# Introduction

If you've been playing 5E 2024, you've probably run into situations where you ask things like: "Can I switch from using this weapon to a different weapon on this turn?" Or, "Can I attack with a sword as an opportunity attack if I am wielding a longbow?"

This analysis answers those questions and presents some novel applications. We first establish our ground rules by summarizing the relevant rules as written. We'll then create a state machine for understanding the equipment state a character can be in. This state machine will allow us to enumerate all possible configurations, from which it becomes easy to discover how to transition between those states.

In doing so, we will discover several "hacks" that break the ever-living shit out of this game. We will conclude that all of the rules around drawing, stowing, sheathing, or dropping weapons are dumb, and that your character can probably just do anything you could possibly want to do. And we will conclude that the handaxe is the best weapon in the game.

# Ground Rules

Here are the relevant rules the 2024 game provides.

## Free Draw with Attack Action

When you take the Attack action, you get to draw or stow a weapon for free. You can do it before or after the attack. You don't have to use the weapon on the attack. This only applies to the Attack action! You don't get to do this when you make an attack as part of a bonus action or reaction (like an opportunity attack).

## Free Object Interaction

On your turn, you get to "interact" with one object in the environment for free. Most folks seem to think this includes drawing or stowing a weapon. In fact, I've never seen anyone argue against this, so we'll take it to be true as well. Later on we'll see what happens when you don't get to use your interaction this way.

## Shields Take a Utilize Action

To don or doff a shield, you have to use the Utilize action. There's no getting around this. The best you can do is be a Thief with Fast Hands, but you probably won't have shield proficiency anyway.

## Unarmed Strikes Don’t Require Any Hands

You can make an unarmed strike using any part of your body. You don't need to have hands free. You don't even need to have hands.

## Anything Can Be an Improvised Weapon (Even a Weapon)

You can use a two-handed weapon with only one hand. The damage becomes a d4, and you won’t be proficient (unless you have Tavern Brawler).

## You Can Throw Any Weapon

Even if something doesn’t have the Thrown property, you can still throw it as an improvised weapon.

# Making the State Machine

The diagram shows a sort of state machine for a player character in 5E using 2024 rules. Each box represents a state that a PC can be in at the start or end of their turn regarding the equipment they have equipped. The arrows between states represent how the PC can change states over the course of one turn.

![Equipment State Machine](blog/images/equipment-state-machine.png)

This shows, for example, how it is possible to change from wielding a longsword and shield to wielding a shortsword and scimitar. Or how to go from wielding a greatsword with two hands to a spear and shield.

The box labeled `Unarmed` represents the state where the PC does not have any weapons or shield equipped. Note that there is rarely a reason to put your character into this state. Even a monk with unarmed attacks does not need to actually be unarmed.

The notation `W_i` represents any weapon (including improvised), be it one-handed, two-handed, versatile, or anything else. There are symbols `W_1` through `W_4`. These four weapons could be anything, but the different subscripts signify that `W_1` is a different weapon than `W_2`.

We don’t care if a weapon is versatile or two-handed. Even though you need two hands to attack with a two-handed weapon, you can always hold any weapon with just one hand. For example, you can use two hands to attack with a longbow, then hold it with just one hand without using any of your object interactions.

The symbol `S` means the state involves having a shield donned.

The arrows are notated by the actions that can be taken to transition from one state to another. Where:

- `UTIL` means using the Utilize action
    
- `ATK` means taking the Attack action
    
- `THR` means using the Attack action to throw a weapon
    
- `B.A. or Nick` means using a bonus action to make a second attack granted by the Light property of a weapon, or for free if you have the Nick property
    
- `OBJ` means using your one free object interaction per turn in combat
    

The colors and dashes help you see which states are equivalent to each other in an abstract sense. For example, all of the orange boxes are essentially the same state (the two-weapon fighting stance), but with different weapons.

As such, there are only five unique states you can start or end a turn in:

1. Unarmed
    
2. Holding a shield
    
3. Holding a shield and a weapon
    
4. Holding one weapon
    
5. Holding two weapons
    

# Worked Example

Suppose Tordek is wielding a longsword with two hands. He wishes to switch to his halberd in combat. How does he do it efficiently?

Since Tordek is wielding one weapon, he is in the center blue square labeled `W_1`. He wishes to switch to a different weapon `W_2`. The chart indicates he must either take the Attack action or the Utilize action, and use his one object interaction.

This could be done by first attacking with the longsword, unequipping it as part of the Attack action, then using his object interaction to draw the halberd, thus ending in the `W_2` box and completing the maneuver. It could also be accomplished by declaring the Attack action, stowing the longsword, drawing the halberd, then making the attack. The order of events doesn’t really matter.

The box with `W_2` in it is dashed to remind the viewer that `W_2` is functionally identical to the state `W_1`. The state machine is technically not finite, because there is no limit to the number of weapons we could transition to.

On Tordek’s next turn, he decides he wants to instead switch to a two-weapon fighting arrangement using a shortsword and scimitar. He wants to go from `W_1` to `W_2 + W_3`. Is this possible? It is, but only if we get crafty. Can you figure it out? We will explore the solution later.

# Throwing

The ability to throw items makes things interesting, because when you throw something, you make an attack with that weapon, and you are automatically unequipped from it without spending any of your free interaction or draw.

This creates the interesting situation where you can move from `W_1 + W_2` to `W_3 + W_4`, which is a lot more equipping than you could normally do.

This transition could be actualized from a character starting their turn wielding a handaxe in each hand, throwing each of them, then drawing two new handaxes.

## Almost Transitive

Almost all of the states in the chart have double-headed arrows, meaning that you can move in either direction for the same cost. The exceptions are the red arrows that arise when throwing weapons.

This is because if you have two weapons, you can throw both of them and wind up unarmed, but you cannot “throw” your empty hands and end with two weapons.

## Shield Hack

The dual handaxe (or dagger) thrower is a pretty cool build, but you can also use a shield with it. There’s nothing about the Light property that says you need two different hands for each different weapon. That means you could have a PC that holds a shield and still get two axe throws in per turn.

This state is represented by the box like `W_1* + S`, where the star reminds you that you could theoretically make two attacks here if you throw the weapon.

For example: Tordek starts his turn with a shield on one arm, and a handaxe in the other. He throws the axe, then as part of the Attack action, draws his next axe. He throws that axe as a bonus action. Then he uses his free object interaction to draw another axe, ending his turn in the same state he started.

If Tordek is a fighter with the Two-Weapon Fighting feat, then he could be doing as much as 2d6+6 damage per turn with a +2 bonus to AC from the shield at 1st level. If he has Vex for those axes (of course he would), then his crit chance goes up significantly. And he’s doing this all from a distance.

If he dips into Ranger for two levels and picks up the Thrown Weapon Fighting feat, then at level 3 he is doing 2d6+10 damage per turn without even getting Hunter’s Mark involved.

## Careful Wording

When I noticed the above, it made me wonder if you could take the Dueling feat instead of the Thrown Weapon feat for the same effect. But the Dueling feat is very explicit that the extra damage only applies to a weapon that you are holding. Very different than the wording on Thrown Weapon Fighting. The point being that you cannot apply the extra damage from the Dueling feat to a thrown weapon.

# Opportunity Attacks

Suppose your character is using a bow with two hands. In between turns, a goblin runs past you. You get to make an opportunity attack. You could attack with your bow, but at disadvantage for making a ranged attack in melee.

You have a longsword, but can you use it for the opportunity attack? Technically no, because you can’t draw a weapon as part of an opportunity attack, only as part of the Attack action.

But, you could have prepared for this. At the end of your turn (after firing the bow), you could hold the bow in one hand, then draw the longsword as your Attack action free draw. If any goblins run by, you have your longsword ready to go. Then, at the beginning of your next turn, you put away your longsword as a free object interaction, attack with the longbow, then redraw the sword.

## Intentional Grounding

You can throw any weapon, even if it doesn’t have the Thrown property—it just becomes an improvised weapon when you do. Heck, you can throw anything for that matter: a crowbar, your torch, a fistful of caltrops. You also don't need to be in range of any particular enemy because when making an attack, you can target a create, object, or location.

Why do it though? Well, now Tordek has a way to go from `W_1` to `W_2 + W_3`. First he throws his halberd at the enemy! Then he draws the shortsword as part of the Attack action, then draws the scimitar using his object interaction. The expected damage from throwing a halberd is not great, but it’s the fastest way to change Tordek’s equipment, and the only way to do it in one turn. Or is it…..?

## Improvised Weapon Hack

Turns out, you don’t even have to throw away the weapon to make use of the intentional grounding strategy.

Another way to go from `W_1` to `W_2 + W_3` is as follows. First, Tordek makes a normal two-handed attack with the halberd. Then, while still holding the halberd in one hand, he draws his shortsword for free from his Attack action.

At this point Tordek is in the state `W_2 + W_3`, because his halberd has transformed from a halberd (in two hands) to an improvised weapon (in one hand), and he has drawn a new weapon. Tordek has already made his attack with the halberd, so he has used his turn well. On his next turn he can efficiently put the improvised weapon (halberd) away, take out the scimitar, and make two attacks.

### Torch Bearer

This seems like a good time to remind you that a torch can be used as a simple melee weapon that deals 1 fire damage, or as a thrown improvised weapon that deals 1d4 bludgeoning.

## Two-Weapon Fighting Hack

We’ve already seen that you can kick a lot of asses with axes. But now we are going to get crazy.

Read the rules for the Light property very carefully. Now tell me: how many hands does your character need to make the extra attack afforded by the Light property? Answer: just one. You could use the Shield Hack above using Light melee weapons just as easily as with thrown weapons. Here’s how:

Tordek has his shield equipped on one arm, and a shortsword in the other. He takes the Attack action and attacks with the shortsword. Then, as part of the attack, Tordek puts away the shortsword. Then, using his free object interaction, he draws a different shortsword (or scimitar, or handaxe, etc.). Then, Tordek takes a bonus action (or perhaps Nick) to make another attack afforded to him by the Light property.

So effectively, if you have a Light weapon, you can just attack twice with it. Technically you need to have two of them because of the whole “different weapon” clause, but that’s not hard to do.

And this works with the Dueling Fighting Style feat. So if you have that, you’re doing the same damage as our dual axe-throwing shield combo.

## Do We Have This Free Object Interaction Correct?

At this point you might be wondering if we are really allowed to use our “free object interaction” to draw or stow weapons. Because we can do some wild things with it: the Shield Hack, and the Opportunity Attack trick.

When the 2024 rules first came out, everyone online seemed to share the view I have presented here (even though I don’t really like it because of all the hacks it results in). I just checked [Sage Advice](https://www.dndbeyond.com/sources/dnd/sae/sage-advice-compendium#SAC-Combat27) and the closest question that has been asked is this:

> **Q:** Can I make an attack with a Light weapon, then draw a second weapon with my other hand and qualify to make the extra attack of the Light property?  
> **A:** Yes. The only requirement for the [Light](https://www.dndbeyond.com/sources/dnd/free-rules/equipment#Light) property’s extra attack is that it’s made with a different Light weapon.

Interestingly, the questioner specifically mentions using a different hand, but the answer makes no reference to it. In fact, the answer explicitly states that the _only_ condition for using Light is that you use a different weapon.

The rules for the free object interaction say the object needs to be part of the “environment.” One could argue that your stowed equipment is not part of the environment. But if you drop a shortsword on the ground, certainly then it becomes part of the environment.

Even still, if we take a strict approach to the free object interaction, and say that it does not apply to equipment swapping, then our state machine simplifies to this.

![Equipment State Machine without using free object interaction](equipment-state-machine-2.png)

Just about everything stays the same. The only things we lose are:

- You can’t do the two-melee-weapon with shield combo unless you take the duel wielder feat (but you can still do the thrown weapons with shield combo)
- You can’t do the quick-draw opportunity attack option
- To switch from one weapon to dual weapons you will have to spend the time in between turns unarmed, but you won’t miss out on any attacks. You might just find yourself unarmed in between turns, which could matter if you are presented with an opportunity attack.

# Don’t Worry About It

The moral of the story is that you really don’t need to sweat what weapons you are wielding—except in the case of using a shield. Even if you don’t know exactly how you went from wielding a greatsword in two hands to wielding a dagger in each hand, you can rest assured there was a way to have done it.

But it also reveals that all this mess about weapon selection and equipment swapping sure is more complicated than it needs to be. [That gives me an idea. . . ](/blog.html?post=fighting-stances)