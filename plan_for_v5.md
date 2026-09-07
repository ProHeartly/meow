# PLANSSS!!!

## back story
so here I'm getting recked... by other bots. Currectly my best bot is tit for tat one, with ~1.6-1.7ish and rarely in leaderboard.. (18-20 rank)

After looking out in what my bot did and what other bot are doing, I was able to formulate some theory ig?? cuz looking at code, i didn't understand a single thing and some were out right AI.. so I looked at the games that they played, and their patterns, and some of the code.. although all of those codes, I didn't understand, I was able to make sense of few things..

1) They try to guess the pattern of the opponent
2) **From what I noticed**, they majorly reacted to the other bot instead of initiation..
3) HOLY SHETTT THAT LOOKS SOOO COMPLICATED! If that is actually written by human, you have my salute 🫡

## What I wana do this time:
* I wana make my bot idealy try to get mutual cooperation..
* Yah, lets get into some mathss~ (comparing reactive bot vs active bot):
comparing between always "C" and one with grudge or smth like that, the maths seems to treat both equally 🤔
..lets get more maths-
hmmmmm IDKKK why I'm not able to come to a conclusion with maths too, I tried adding tft and seems like reactive bot has adv in that 🤔
once more doing maths, always "D" might be a problem here.. lets see how others tackle this. hmmmmm.. seems like most of the top bots are giving away 5 "C" before they start their revenge but why?? Lemme study this shi.
update: I looked thru them, they do try to take initative.. but i think they have something complex algorithm below them! sooo I'm just gonna go with reactive bot ig

hmmm: I think I just realise something important, I looked out for other bots but I didn't check why my own bots didn't work, yahhh lets have a look at it first
soo: what i found was genuenly its due to "D" spammers 🤔 and?? if something seems strange.. spam "D" lollll

## So let's make it:

okok enough yap and shii lets start making!

* first of all, it will try to cooperate and mostly just "C"

im thinking creating a memory so that it can store following things: (y means yes, p means potentially, n means no)
cooperative(c): if the opp wants cooperation or not
deflective(d): if it just wants to deflect
dominative(do): seems friendly than changes to deflective under specific conditions
strange(s): just out right strange

nvm lets change things little bit, instead of doing y, p or n;
let's do a counter, if it is doing continuously "C", c gets bigger, and like wise..

little again change in plannnn:
oppC: total times oop cooperated
oopD: total times oop defected
streakC: current streak of cooperation
streakD: current streak of defection
flips: times that opp changed their move
unprovokedD: times they defected when we cooperated
retaliating: counter for our punishment phase (so we don't go on death spiral)
chance: forgives till this number
spamD: tracks how long we've been stuck in 'd' mode
forgiveStage: 0 = not testing, 1 = try to cooperate, 2 = evaluating response
forgiveFails: consecutive rejected forgiveness attempts
mode: default to expecting type----- s means strange, d means defective and c means cooperative, do means dominating, a means alternating, 'v' for vampire, i mean we just exploit them thinking they are all 'C', 'test_v' we test if they are good for exploiting, 'g' it means they keep a grudge and 'all_d' we waste trying to cooperate


feels like i missed something ? ?? ??? ohhhh yaaa i think i forgot about uh, when they try to punish "C", let's try to make it good against smth that tries to back stab?
Wait in case of alternating, we can sync up with them to farm 1.5?? 🤔 nvm spaming "D" is better as we get 1-1 and 3-0 which adds up and averages to 2. But, lets categorize 'a' as differnt which means alternating

i have a little plan for dealing with 's' type of bots, lets give them chance to improve and if they simply doesn't we spam "D" which seems more profitable

uhhh our bot currently scores 1.56-1.58 so we need to change some things..
first of all, our bot is suffering death spiral.. so lets fix this with counting how long we are stuck in 'd' mode

lets bring some more modes: 'v' for vampire, i mean we just exploit them thinking they are all 'C', 'test_v' we test if they are good for exploiting, 'g' it means they keep a grudge and 'all_d' we waste trying to cooperate

the bot now seems all good! umm lets add a little check for if we want to exploit it, if it only played 'C' means oppD = 0

I think its readyy!! lets try now

STILLL Not good THINGS and I DEFINATELY caught some problems with the code structure.. lets try fix those..🫠 I was thinking of introducting some new counters like forgiveStage: which counts if we are testing forgive thingy and also a forgiveFails: which counts the no of failed attempt

and also move those 'g' and spamD thingy from up to later in the code after checks.. lets also fix the rate thingy, i think when game scales, n increase that means rate decreases drastically, os we keep a window variable upto which we check

let's make 'd' mode also locked mode, so we can condition its exit inside 'd' itself