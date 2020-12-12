const fs = require('fs')
const testInput = fs.readFileSync('./Day_11_input.txt', 'utf-8').split('\n')
// const testInput = ['L.LL.LL.LL',
//   'LLLLLLL.LL',
//   'L.L.L..L..',
//   'LLLL.LL.LL',
//   'L.LL.LL.LL',
//   'L.LLLLL.LL',
//   '..L.L.....',
//   'LLLLLLLLLL',
//   'L.LLLLLL.L',
//   'L.LLLLL.LL']
const inputByRow = testInput.reduce((acc, curr, idx) => {
  return {
    ...acc,
    [idx]: {
      seats: curr.split(''),
      changed: false
    }
  }
}, {})
const SEATS_IN_ROW = inputByRow[0].seats.length
const ROWS_TOTAL = Object.keys(inputByRow).length
let updatedInputByRow = {}
function checkSeatingArrangement (rowInputs) {
  const rows = Object.keys(rowInputs)
  rows.forEach(row => {
    checkRow(Number(row), rowInputs)
  })
  const changedRows = rows.filter(row => updatedInputByRow[row].changed)
  if (changedRows.length === 0) {
    const occupiedSeats = Object.values(updatedInputByRow).reduce((acc, curr) => {
      if (curr === 0) return curr
      const occupiedSeats = curr.seats.filter(seat => seat === '#')
      return acc + occupiedSeats.length
    }, 0)

    return occupiedSeats
  }
  const nextInputs = {...updatedInputByRow}
  updatedInputByRow = {}
  return checkSeatingArrangement(nextInputs)
}

function checkRow (row, fullArrangement) {
  const currentRowSeats = fullArrangement[row].seats

  let updatedRow = []
  let changed = false

  const checkSpace = (seat, row, fn) => {
    const space = fullArrangement[row].seats[seat]
    if (space === '.') return fn(seat, row)
    return space
  }
  const checkUpperLeftCorner = (seatNumber, rowNumber) => {
    const seat = seatNumber - 1
    const row = rowNumber - 1
    if (seat < 0 || row < 0) return null
    return checkSpace(seat, row, checkUpperLeftCorner)
  }
  const checkStraightAbove = (seatNumber, rowNumber) => {
    const row = rowNumber - 1
    if (row < 0) return null
    return checkSpace(seatNumber, row, checkStraightAbove)
  }
  const checkUpperRightCorner = (seatNumber, rowNumber) => {
    const seat = seatNumber + 1
    const row = rowNumber - 1
    if (seat >= SEATS_IN_ROW || row < 0) return null
    return checkSpace(seat, row, checkUpperRightCorner)
  }
  const checkStraightLeft = (seatNumber, rowNumber) => {
    const seat = seatNumber - 1
    if (seat < 0) return null
    return checkSpace(seat, rowNumber, checkStraightLeft)
  }
  const checkStraightRight = (seatNumber, rowNumber) => {
    const seat = seatNumber + 1
    if (seat >= SEATS_IN_ROW) return null
    return checkSpace(seat, rowNumber, checkStraightRight)
  }
  const checkBottomLeft = (seatNumber, rowNumber) => {
    const seat = seatNumber - 1
    const row = rowNumber + 1
    if (seat < 0 || row >= ROWS_TOTAL) return null
    return checkSpace(seat, row, checkBottomLeft)
  }
  const checkStraightDown = (seatNumber, rowNumber) => {
    const row = rowNumber + 1
    if (row >= ROWS_TOTAL) return null
    return checkSpace(seatNumber, row, checkStraightDown)
  }
  const checkBottomRight = (seatNumber, rowNumber) => {
    const seat = seatNumber + 1
    const row = rowNumber + 1
    if (seat >= SEATS_IN_ROW || row >= ROWS_TOTAL) return null
    return checkSpace(seat, row, checkBottomRight)
  }
  currentRowSeats.forEach((seat, idx) => {
    if (seat === '.') {
      updatedRow.push(seat)
      return
    }

    // could make it a little faster by using promises and running in parallel

    const upperLeft = checkUpperLeftCorner(idx, row)
    const above = checkStraightAbove(idx, row)
    const upperRight = checkUpperRightCorner(idx, row)
    const left = checkStraightLeft(idx, row)
    const right = checkStraightRight(idx, row)
    const bottomLeft = checkBottomLeft(idx, row)
    const down = checkStraightDown(idx, row)
    const bottomRight = checkBottomRight(idx, row)

    let occupiedSeats = 0
    if (upperLeft === '#') occupiedSeats++
    if (above === '#') occupiedSeats++
    if (upperRight === '#') occupiedSeats++
    if (left === '#') occupiedSeats++
    if (right === '#') occupiedSeats++
    if (bottomLeft === '#') occupiedSeats++
    if (bottomRight === '#') occupiedSeats++
    if (down === '#') occupiedSeats++

    if (seat === 'L' && occupiedSeats === 0) {
      seat = '#'
      changed = true
    } else if (seat === '#' && occupiedSeats >= 5) {
      seat = 'L'
      changed = true
    }
    updatedRow.push(seat)
  })
  updatedInputByRow[row] = {
    seats: updatedRow,
    changed
  }
}

console.log(checkSeatingArrangement(inputByRow)) // 2002
