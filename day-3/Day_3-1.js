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

let trees = 0
let iteration = 0

for (let i = 1; i < testInput.length; i++) {
  iteration++
  const endingRow = testInput[i]
  if (!endingRow) break

  let distanceRight = iteration * 3
  while (distanceRight > endingRow.length) {
    distanceRight %= endingRow.length
  }
  if (endingRow[distanceRight] === '#') {
    trees++
  }
}

console.log(trees)
