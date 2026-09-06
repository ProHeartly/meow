// Let's first make tit for tat thingy then modify it ig :D
// I heard another algorithm is little better with smth like tit for tat but if we not winning, we change strat

export default function bot( {history} ) {
    const n = history.length

    // yah let's start with cooperate
    if (n === 0) return ["C", null]
    const move = history.at(-1).opponent
    return [move, null]
}