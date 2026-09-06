// Imma try make reactive bot, which reacts to the opps instead of taking initiation first

const th = 3;

export default function bot( {history, memory} ) {
    const n = history.length

    if (memory==null) {
        memory = {
            "c": 0,
            "d": 0,
            "do": 0,
            "s": 0
        }
    }

    let move;
    // yah let's start with cooperate
    if (n < th) {
        if (n !== 0) {
            if (history.at(-1).opponent==="C") {
                memory.c++
                memory.d = 0
            }
            else {
                memory.d++
                memory.c = 0
            }

            if (memory.d==2) {
                
            }
        } 
        return ["C", memory]
    }

    prev = history.at(-1).opponent

    // if it's c
    if (memory.c!==0) {
        if (n<100) {
            move = "C"
        } else {
            move = "D"
        }
    }



    return [move, memory]
}

