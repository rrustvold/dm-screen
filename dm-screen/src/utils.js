export default function Roll(sides, numDice=1) {
    let sum =0;
    for (let i = 0; i < numDice; i++) {
        sum += Math.floor(Math.random()*sides) + 1;
    }
    return sum
}