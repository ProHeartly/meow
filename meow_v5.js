// Imma try make reactive bot, which reacts to the opps instead of taking initiation first


export default function bot( {history, memory} ) {
    const n = history.length

    if (memory==null) {
        memory = {
            "c": "p",
            "d": "p",
            "do": "p",
            "s": "p"
        }
    }

    let move;
    // yah let's start with cooperate
    if (n === 0) return ["C", memory]

    move = history.at(-1).opponent
    return [move, null]
}

