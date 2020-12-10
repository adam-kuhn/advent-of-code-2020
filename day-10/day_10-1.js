const fs = require('fs')
const testInput = fs.readFileSync('./Day-10-1_input.txt', 'utf-8').split('\n')
// const testInput = [
//   16,
//   10,
//   15,
//   5,
//   1,
//   11,
//   7,
//   19,
//   6,
//   12,
//   4
// ]
const formattedInput = testInput.map(i => Number(i)).sort((a, b) => a - b)

console.log(formattedInput)
let oneJoltDifference = 1 // starting difference
let threeJoltDifference = 1 // your device

for (let i = 0; i < formattedInput.length; i++) {
  const difference = formattedInput[i + 1] - formattedInput[i]
  if (difference === 1) oneJoltDifference++
  if (difference === 3) threeJoltDifference++
}

console.log("ONE", oneJoltDifference)
console.log("THRE", threeJoltDifference)
console.log(oneJoltDifference * threeJoltDifference)
