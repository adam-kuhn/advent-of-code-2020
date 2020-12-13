const fs = require('fs')
const testInput = fs.readFileSync('./Day-12_input.txt', 'utf-8').split('\n')

// const testInput = [
//   'F10',
//   'N3',
//   'F7',
//   'R90',
//   'F11'
// ]

let xPositon = 0
let yPosition = 0
let orientation = 90

for (let instruction of testInput) {
  const operation = instruction.substring(0, 1)
  const value = Number(instruction.substring(1))
  switch (operation) {
    case 'N':
    case 'S':
    case 'E':
    case 'W': {
      moveCardinalDirection(operation, value)
      break
    }
    case 'L': {
      orientation -= value
      orientation = checkRotatLeft(orientation)
      break
    }
    case 'R': {
      orientation += value
      orientation = checkRotatRight(orientation)
      break
    }
    case 'F': {
      moveForward(value, orientation)
      break
    }
  }
}
function moveForward (value, orientation) {
  let direction
  switch (orientation) {
    case 0: {
      direction = 'N'
      break
    }
    case 90: {
      direction = 'E'
      break
    }
    case 180: {
      direction = 'S'
      break
    }
    case 270: {
      direction = 'W'
      break
    }
  }
  moveCardinalDirection(direction, value)
}
function moveCardinalDirection (direction, value) {
  switch (direction) {
    case 'N': {
      yPosition -= value
      break
    }
    case 'S': {
      yPosition += value
      break
    }
    case 'E': {
      xPositon += value
      break
    }
    case 'W': {
      xPositon -= value
      break
    }
  }
}

function checkRotatLeft (orientation) {
  if (orientation >= 0) return orientation

  switch (orientation) {
    case -90: {
      return 270
    }
    case -180: {
      return 180
    }
    case -270: {
      return 90
    }
    case -360: {
      return 0
    }
  }
}

function checkRotatRight (orientation) {
  if (orientation < 360) return orientation
  switch (orientation) {
    case 450: {
      return 90
    }
    case 540: {
      return 180
    }
    case 630: {
      return 270
    }
    case 720:
    case 360: {
      return 0
    }
  }
}

console.log(xPositon, yPosition)
console.log(Math.abs(xPositon) + Math.abs(yPosition))
