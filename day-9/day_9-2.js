const fs = require('fs')
const testInput = fs.readFileSync('./Day_9-1_input.txt', 'utf-8').split('\n')

const formattedInput = testInput.map(i => Number(i))
function findInvalidNumber () {
  for (let i = 0; i < formattedInput.length; i++) {
    let possibleSums = []
    const numberToValidate = formattedInput[i + 25]
    const preamable = formattedInput.slice(i, i + 25)
    preamable.forEach((num1, idx, self) => {
      self.forEach(num2 => {
        if (num1 === num2) return
        possibleSums.push(num1 + num2)
      })
    })
    if (!possibleSums.includes(numberToValidate)) {
      console.log(numberToValidate)
      return numberToValidate
    }
  }
}

const invalidNumber = findInvalidNumber()

function findSequenceThatSums (sumToMatch, idx) {
  let sum = 0
  const sequence = []
  for (let i = idx; i < formattedInput.length; i++) {
    sum += formattedInput[i]
    sequence.push(formattedInput[i])
    if (sum === sumToMatch) {
      return sequence
    }
    if (sum > sumToMatch) break
  }
  return findSequenceThatSums(sumToMatch, idx + 1)
}

const sequence = findSequenceThatSums(invalidNumber, 0)
sequence.sort((a, b) => a - b)
const high = sequence[sequence.length - 1]
const low = sequence[0]

console.log(high + low)
