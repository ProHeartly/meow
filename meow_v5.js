// Imma try make reactive bot, which reacts to the opps instead of taking initiation first


export default function bot( {history, memory} ) {
    const n = history.length

    if (memory==null) {
        memory = {
            oopC: 0,
            oopD: 0,
            streakC: 0,
            streakD: 0,
            flips: 0,
            mode: 'c'
        }
    }

    // as always, let's start with cooperation
    if (n === 0) {
        return ["C", memory]
    }

    // this stores last state
    const last = history[n-1];

    const oop = last.opponent
    const you = last.you

    if (oop === "C") {
        memory.oopC++
        memory.streakC++
        memory.streakD = 0
    } else {
        memory.oopD++
        memory.streakD++
        memory.streakC = 0
    }

    // checks how variable is the opp
    if (n>1) {
        const oppP = history[n-2].opponent
        if (oop !== oppP) {
            memory.flips++ 
        }
    }

    const flipRate = n > 5 ? memory.flips / n: 0

    if (flipRate > 0.5) {
        memory.mode = 's'
    } else if (memory.streakD >= 3) {
        memory.mode = 'd';
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

        case 's':
            // spam 'D' For safety
            move = "D"
            break;
    }

    return [move, memory]
}

