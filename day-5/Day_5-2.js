const fs = require('fs')
const testInput = fs.readFileSync('./Day_5-1_input.txt', 'utf-8').split('\n')

const rows = [...Array(128).keys()]
const columns = [...Array(8).keys()]

function parseBoardingPass (boardingPass) {
  let tempRows = [...rows]
  let tempColumns = [...columns]
  const rowData = boardingPass.substring(0, 7).split('')
  const columnData = boardingPass.substring(7).split('')
  rowData.forEach(byte => {
    const middle = tempRows.length / 2
    tempRows = byte === 'B'
      ? tempRows.splice(middle)
      : tempRows.splice(0, middle)
  })
  columnData.forEach(byte => {
    const middle = tempColumns.length / 2
    tempColumns = byte === 'R'
      ? tempColumns.splice(middle)
      : tempColumns.splice(0, middle)
  })
  return tempRows[0] * 8 + tempColumns[0]
}

const seatIdInfronOfYours = testInput.map(parseBoardingPass)
  .sort((a, b) => a - b)
  .filter((seatId, idx, self) => seatId + 1 !== self[idx + 1])[0]

const yourSeatId = seatIdInfronOfYours + 1

console.log(yourSeatId)
