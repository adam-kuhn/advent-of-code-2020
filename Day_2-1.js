const fs = require('fs')
const testInput = fs.readFileSync('./Day_2-1_input.txt', 'utf-8').split('\n')

const formattedData = testInput.map(input => {
  const data = input.split(' ')
  const valueRange = data[0].replace('-', ' ').split(' ')
  const characterToMatch = data[1].replace(':', '')
  return {
    rangeLow: Number(valueRange[0]),
    rangeHigh: Number(valueRange[1]),
    characterToMatch,
    password: data[2]
  }
})

let validPasswordCount = 0

for (let input of formattedData) {
  const parsedPassword = input.password.split('')
  const characterOccurence = parsedPassword.filter(character => character === input.characterToMatch).length
  if (characterOccurence >= input.rangeLow && characterOccurence <= input.rangeHigh) validPasswordCount++
}

console.log(validPasswordCount)
