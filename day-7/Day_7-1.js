const fs = require('fs')
const testInput = fs.readFileSync('./Day_7-1_input.txt', 'utf-8').split('\n')

const formattedRules = testInput.map(input => {
  const parentBag = input.substring(0, input.indexOf('bags') - 1)
  const childBagStatements = input.substring(input.indexOf('bags') + 4, input.indexOf('.')).split(',')
  const childBags = childBagStatements.reduce((acc, curr) => {
    const numberOfBags = curr.match(/\d/g)
    if (!numberOfBags) {
      return {
        ...acc,
        noBags: 'no other bags'
      }
    }
    const bagTermtoMatch = Number(numberOfBags[0]) === 1 ? 'bag' : 'bags'
    const childBag = curr.substring(curr.indexOf(numberOfBags[0]) + 1, curr.indexOf(bagTermtoMatch)).trim()
    return {
      ...acc,
      [childBag]: numberOfBags[0]

    }
  }, {})
  return {
    parentBag,
    childBags
  }
})

let possibleStartingBags = []

function checkAncestry (bag = 'shiny gold') {
  const parents = formattedRules.filter(rule => rule.childBags[bag]).map(rule => rule.parentBag)
  possibleStartingBags = [...possibleStartingBags, ...parents]
  parents.forEach(parent => {
    checkAncestry(parent)
  })
}

checkAncestry()
const uniqueBags = possibleStartingBags.filter((bag, idx, self) => self.indexOf(bag) === idx)
console.log(uniqueBags.length)
