// Imma try make reactive bot, which reacts to the opps instead of taking initiation first


export default function bot( {history, memory} ) {
    const n = history.length

    if (memory==null) {
        memory = {
            oppC: 0,
            oppD: 0,
            streakC: 0,
            streakD: 0,
            flips: 0,
            unprovokedD: 0,
            retaliating: 0,
            chance: 3,
            mode: 'c'
        }
    }

    // as always, let's start with cooperation
    if (n === 0) {
        return ["C", memory]
    }

    // this stores last state
    const last = history[n-1];

    const opp = last.opponent
    const you = last.you

    if (opp === "C") {
        memory.oppC++
        memory.streakC++
        memory.streakD = 0
    } else {
        memory.oppD++
        memory.streakD++
        memory.streakC = 0

        if (you === "C") {
            memory.unprovokedD++
        }
    }

    // checks how variable is the opp
    if (n>1) {
        const oppP = history[n-2].opponent
        if (opp !== oppP) {
            memory.flips++ 
        }
    }

    const flipRate = n > 5 ? memory.flips / n: 0

    if (flipRate >=0.8) {
        memory.mode = 'a'
    } else if (flipRate > 0.5) {
        memory.mode = 's'
    } else if (memory.streakD >= 3) {
        memory.mode = 'd';
    } else if (memory.unprovokedD > 0 && memory.streakD < 3 && memory.mode !== "s") {
        memory.mode = 'do'
    } else if (memory.streakC >= 2) {
        memory.mode = 'c'
    }

    // lets keep default value in case of smth
    let move = "C";

    switch (memory.mode) {
        case 'c':
            move = (n >= 99) ? "D": "C"
            // basically means after n>=99, it just goes into end game and doesn't care about cooperation
            break;
        
        case 'd':
            // revenge :D
            move = "D"
            break;

        case 'do':
            if (opp === "D") {
                memory.retaliating = 1
                move = "D"
            } else if (memory.retaliating > 0) {
                memory.retaliating--
                move = "D"
            } else {
                //  forgive and try bring cooperation
                move = "C"
            }
            break;
        
        case 'a':
            // farming the alters with spamming 'd'
            move = "D"
            break;

        case 's':

            if (you === 'C' && opp === "D") {
                memory.chance--
            }

            // if they try to regain trust 🤔
            if (memory.chance <= 0 && memory.streakC >= 2) {
                memory.chance = 3;
            }

            // we play tit for tat to test them
            if (memory.chance > 0) {
                move = opp
            } else {
                // spam 'D' For safety
                move = "D"
            }
            
            break;
    }

    return [move, memory]
}

