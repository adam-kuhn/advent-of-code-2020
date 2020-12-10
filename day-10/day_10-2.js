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
formattedInput.unshift(0)
formattedInput.push(formattedInput[formattedInput.length - 1] + 3)

// console.log(formattedInput)

// had to look online for help on this one
function allPossibilities (input, memo = {}) {
  const key = input.join(',')
  // by having this memo as a look up, you don't have to calculate
  // possibilities that have already been calculated previsouly
  if (key in memo) {
    return memo[key]
  }

  let result = 1

  // can't remove starting outlet (0) or ending outlet
  for (let i = 1; i < input.length - 1; i++) {
    const previous = input[i - 1]
    const next = input[i + 1]
    if (next - previous <= 3) {
      // remove the current number in the array if within 3 jolts
      // and get all possible combinations of the rest of the array
      const combination = [previous].concat(input.slice(i + 1))
      result += allPossibilities(combination, memo)
    }
  }
  // on completed recursion save result (a number of combinations)
  // the key is the possible items in the array and result is the number combinations for that array
  memo[key] = result
  // console.log(memo)
  return result
}

const total = allPossibilities(formattedInput)

console.log(total)
