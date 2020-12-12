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
  const previousRow = row - 1
  const nextRow = row + 1
  const previousRowSeats = previousRow >= 0 ? fullArrangement[previousRow].seats : []
  const nextRowSeats = nextRow < testInput.length ? fullArrangement[nextRow].seats : []
  const currentRowSeats = fullArrangement[row].seats
  const checkPreviousRow = previousRowSeats.length > 0
  const checkNextRow = nextRowSeats.length > 0
  let updatedRow = []
  let changed = false
  currentRowSeats.forEach((seat, idx) => {
    if (seat === '.') {
      updatedRow.push(seat)
      return
    }

    const previousSeatIndex = idx - 1
    const nextSeatIndex = idx + 1
    const checkPreviousSeat = previousSeatIndex >= 0
    const checktNextSeat = nextSeatIndex < currentRowSeats.length
    let occupiedSeats = 0
    if (checkPreviousRow) {
      if (checkPreviousSeat && previousRowSeats[previousSeatIndex] === '#') occupiedSeats++
      if (checktNextSeat && previousRowSeats[nextSeatIndex] === '#') occupiedSeats++
      if (previousRowSeats[idx] === '#') occupiedSeats++
    }
    if (checkNextRow) {
      if (checkPreviousSeat && nextRowSeats[previousSeatIndex] === '#') occupiedSeats++
      if (checktNextSeat && nextRowSeats[nextSeatIndex] === '#') occupiedSeats++
      if (nextRowSeats[idx] === '#') occupiedSeats++
    }
    if (currentRowSeats[previousSeatIndex] === '#') occupiedSeats++
    if (currentRowSeats[nextSeatIndex] === '#') occupiedSeats++

    if (seat === 'L' && occupiedSeats === 0) {
      seat = '#'
      changed = true
    } else if (seat === '#' && occupiedSeats >= 4) {
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

console.log(checkSeatingArrangement(inputByRow)) // 2263
