const fs = require('fs')
const testInput = fs.readFileSync('./Day_6-1_input.txt', 'utf-8').split('\n')

const answersByGroup = {}
let tempGroup = []
for (let i = 0; i < testInput.length; i++) {
  const answers = testInput[i]
  if (answers) {
    tempGroup = [...tempGroup, answers.split('')]
  } else {
    saveGroupToAggregate(i)
  }
  if (i === testInput.length - 1) {
    saveGroupToAggregate(i)
  }
}

function saveGroupToAggregate (group) {
  const formattedData = tempGroup.flat()
  answersByGroup[`group${group}`] = formattedData
  tempGroup = []
}

let combinedUniqueGroupAnswers = []
Object.values(answersByGroup).forEach(groupAnswers => {
  combinedUniqueGroupAnswers = [
    ...combinedUniqueGroupAnswers,
    ...groupAnswers.filter((answer, idx, self) => idx === self.indexOf(answer))
  ]
})

console.log(combinedUniqueGroupAnswers.length)
