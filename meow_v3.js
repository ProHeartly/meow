// my ideal bottt

// This variable is threshold upto which, the bot plays init move
const INITIAL = 3;

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
    let move = "C"
    if (n===0) {
        return [move, memory]
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

    // Checks if its always "C"
    else if (history.every(item => item.opponent === history[0].opponent)) {
        move = "D"
    }

    return [move, memory]
}