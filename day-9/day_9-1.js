const fs = require('fs')
const testInput = fs.readFileSync('./Day_9-1_input.txt', 'utf-8').split('\n')

const formattedInput = testInput.map(i => Number(i))
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
    break
  }
}
