// my ideal bottt
// a checker for identifying tit for tat and implementing a problem

// This variable is threshold upto which, the bot plays init move
const INITIAL = 50;

// init move: (tit for tat)
function init(prev) {
    return prev
}

export default function bot( {history, memory} ) {
    const n = history.length
    
    if (memory==null) {
        memory = {
            "type": "n"
        }
    }

    // yah let's start with cooperate
    let move;
    if (n===0) {
        return ["C", memory]
    } else {
        move = history.at(-1).opponent
    }

    // tit for tat logic
    if (n<INITIAL && n>0) {
        move = init(history.at(-1).opponent)
    }

    // check what it does if we "D"
    else if (n===INITIAL+1 || n===INITIAL+2) {
        if (history.every(item => item.opponent === "C")) {
            move = "D"
        }
    }

    else if (n===INITIAL+3) {
        const allC = history.slice(0, INITIAL + 2).every(turn => turn.opponent === "C")
        const def = history[INITIAL + 2].opponent === "D"
        const isTFT = allC && def
        if (isTFT) {
            memory.type = "tft"
        }
    }

    // Checks if its always "C"
    else if (history.every(item => item.opponent === history[0].opponent)) {
        move = "D"
    }

    if (memory.type === "tft") {
        if (history.at(-1).opponent === "D") {
            memory.type = "n"
            move = "D"
        } else {
            move = "C"
        }

        if (n>20) {
            move = "C"
        }
    }

    return [move, memory]
}