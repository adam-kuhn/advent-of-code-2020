const fs = require('fs')
const testInput = fs.readFileSync('./Day_3-1_input.txt', 'utf-8').split('\n')

// const testInput = [
//   '..##.......',
//   '#...#...#..',
//   '.#....#..#.',
//   '..#.#...#.#',
//   '.#...##..#.',
//   '..#.##.....',
//   '.#.#.#....#',
//   '.#........#',
//   '#.##...#...',
//   '#...##....#',
//   '.#..#...#.#'
// ]

// slope [right, down]
const slope1 = [1, 1]
const slope2 = [3, 1] // same slope as part 1
const slope3 = [5, 1]
const slope4 = [7, 1]
const slope5 = [1, 2]

function treesEncountered (slope) {
  let trees = 0
  let iteration = 0
  const [right, down] = slope

  for (let i = down; i < testInput.length; i += down) {
    iteration++
    const endingRow = testInput[i]
    let distanceRight = iteration * right

    if (distanceRight >= endingRow.length) {
      distanceRight %= endingRow.length
    }
    if (endingRow[distanceRight] === '#') {
      trees++
    }
  }
  return trees
}

const slope1Trees = treesEncountered(slope1)
const slope2Trees = treesEncountered(slope2)
const slope3Trees = treesEncountered(slope3)
const slope4Trees = treesEncountered(slope4)
const slope5Trees = treesEncountered(slope5)

const totalTrees = slope1Trees * slope2Trees * slope3Trees * slope4Trees * slope5Trees

console.log(totalTrees)
