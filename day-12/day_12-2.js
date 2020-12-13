const fs = require('fs')
const testInput = fs.readFileSync('./Day-12_input.txt', 'utf-8').split('\n')

// const testInput = [
//   'F10',
//   'N3',
//   'F7',
//   'R90',
//   'F11'
// ]
let xWayPoint = 10
let yWayPoint = -1
let xShip = 0
let yShip = 0

for (let instruction of testInput) {
  const operation = instruction.substring(0, 1)
  const value = Number(instruction.substring(1))
  switch (operation) {
    case 'N':
    case 'S':
    case 'E':
    case 'W': {
      moveWayPoint(operation, value)
      break
    }
    case 'L': {
      rotateWayPointLeft(value)
      break
    }
    case 'R': {
      rotateWayPointRight(value)
      break
    }
    case 'F': {
      moveForward(value)
      break
    }
  }
}
function moveForward (value) {
  xShip += value * xWayPoint
  yShip += value * yWayPoint
}

function rotateWayPointLeft (value) {
  switch (value) {
    case 90: {
      rotate90Left()
      break
    }
    case 180: {
      rotate180()
      break
    }
    case 270: {
      rotate90Right()
      break
    }
  }
}

function rotateWayPointRight (value) {
  switch (value) {
    case 90: {
      rotate90Right()
      break
    }
    case 180: {
      rotate180()
      break
    }
    case 270: {
      rotate90Left()
      break
    }
  }
}

function rotate90Right () {
  const tempX = xWayPoint
  const tempY = yWayPoint

  yWayPoint = tempX
  xWayPoint = -tempY
}

function rotate90Left () {
  const tempX = xWayPoint
  const tempY = yWayPoint

  yWayPoint = -tempX
  xWayPoint = tempY
}

function rotate180 () {
  xWayPoint *= -1
  yWayPoint *= -1
}

function moveWayPoint (direction, value) {
  switch (direction) {
    case 'N': {
      yWayPoint -= value
      break
    }
    case 'S': {
      yWayPoint += value
      break
    }
    case 'E': {
      xWayPoint += value
      break
    }
    case 'W': {
      xWayPoint -= value
      break
    }
  }
}

console.log(xShip, yShip)
console.log(Math.abs(xShip) + Math.abs(yShip))
