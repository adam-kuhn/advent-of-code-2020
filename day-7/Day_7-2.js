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
        noBags: 0
      }
    }
    const bagTermtoMatch = Number(numberOfBags[0]) === 1 ? 'bag' : 'bags'
    const childBag = curr.substring(curr.indexOf(numberOfBags[0]) + 1, curr.indexOf(bagTermtoMatch)).trim()
    return {
      ...acc,
      [childBag]: Number(numberOfBags[0])

    }
  }, {})
  return {
    parentBag,
    childBags
  }
})

let allChildBags = []
let childBagcount = 0
function findChildren (bag = 'shiny gold') {
  const children = formattedRules.filter(rule => rule.parentBag === bag).map(rule => rule.childBags)
  childBagcount += children.reduce((acc, curr) => {
    if (curr === 0) return curr

    return acc + Object.values(curr).reduce((acc1, curr1) => acc1 + curr1, 0)
  }, 0)
  allChildBags = [...allChildBags, ...children]

  children.forEach(child => {
    let childBags = Object.keys(child).flatMap(childBag => {
      const numberOfBags = child[childBag]
      return Array(numberOfBags).fill(childBag)
    })

    childBags.forEach(bag => {
      findChildren(bag)
    })
  })
}

findChildren()
console.log(childBagcount)
