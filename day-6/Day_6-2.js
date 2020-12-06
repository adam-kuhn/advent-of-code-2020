const fs = require('fs')
const testInput = fs.readFileSync('./Day_6-1_input.txt', 'utf-8').split('\n')

// const testInput = [
//   'abc',
//   '',
//   'a',
//   'b',
//   'c',
//   '',
//   'ab',
//   'ac',
//   '',
//   'a',
//   'a',
//   'a',
//   'a',
//   '',
//   'b'
// ]

let allAnsweredYes = []
let tempGroup = []
for (let i = 0; i < testInput.length; i++) {
  const answers = testInput[i]
  if (answers) {
    tempGroup = [...tempGroup, answers.split('')]
  } else {
    parseAnswers()
  }
  if (i === testInput.length - 1) {
    parseAnswers()
  }
}

function parseAnswers () {
  const peopleInGroup = tempGroup.length
  const combinedAnswers = tempGroup.flat().join('')
  allAnsweredYes = [...allAnsweredYes, checkAnswers(combinedAnswers, peopleInGroup)]
  tempGroup = []
}

function checkAnswers (answers, peopleInGroup) {
  const answersArray = answers.split('')
  let allAnsweredYes = 0
  let alreadyChecked = []

  answersArray.forEach(answer => {
    if (!alreadyChecked.includes(answer)) {
      alreadyChecked = [...alreadyChecked, answer]
      const customMatch = new RegExp(answer, 'g')
      if (answers.match(customMatch).length === peopleInGroup) allAnsweredYes++
    }
  })

  return allAnsweredYes
}

const totalYesAnswers = allAnsweredYes.reduce((acc, curr) => acc + curr, 0)

console.log(totalYesAnswers)
