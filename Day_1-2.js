const fs = require('fs')
const testInput = fs.readFileSync('./Day_1-1_input.txt', 'utf-8').split('\n')
const numbers = testInput.map(input => Number(input))
// const testInput = [1721, 979, 366, 299, 675, 1456]

let answer

for (let i = 0; i < numbers.length; i++) {
  for (let j = 0; j < numbers.length; j++) {
    for (let k = 0; k < numbers.length; k++) {
      const sumOfPair = numbers[i] + numbers[j] + numbers[k]
      if (sumOfPair === 2020) {
        answer = numbers[i] * numbers[j] * numbers[k]
        break
      }
    }
  }
}

console.log(answer)
