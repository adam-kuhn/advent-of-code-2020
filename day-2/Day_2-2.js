const fs = require('fs')
const testInput = fs.readFileSync('./Day_2-1_input.txt', 'utf-8').split('\n')

const formattedData = testInput.map(input => {
  const data = input.split(' ')
  const valueRange = data[0].replace('-', ' ').split(' ')
  const characterToMatch = data[1].replace(':', '')
  return {
    firstChar: Number(valueRange[0]),
    secondChar: Number(valueRange[1]),
    characterToMatch,
    password: data[2]
  }
})

let validPasswordCount = 0

for (let input of formattedData) {
  const parsedPassword = input.password.split('')
  if (parsedPassword[input.firstChar - 1] === input.characterToMatch &&
    parsedPassword[input.secondChar - 1] !== input.characterToMatch) validPasswordCount++
  if (parsedPassword[input.firstChar - 1] !== input.characterToMatch &&
    parsedPassword[input.secondChar - 1] === input.characterToMatch) validPasswordCount++
}

console.log(validPasswordCount)
