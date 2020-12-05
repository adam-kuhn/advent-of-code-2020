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
    tempRows = parseBytes(byte, 'B', tempRows)
  })
  columnData.forEach(byte => {
    tempColumns = parseBytes(byte, 'R', tempColumns)
  })
  return tempRows[0] * 8 + tempColumns[0]
}

function parseBytes (byte, byteToMatch, tempArray) {
  const middle = tempArray.length / 2
  return byte === byteToMatch
    ? tempArray.splice(middle)
    : tempArray.splice(0, middle)
}

const seatIdInfronOfYours = testInput.map(parseBoardingPass)
  .sort((a, b) => a - b)
  .filter((seatId, idx, self) => seatId + 1 !== self[idx + 1])[0]

const yourSeatId = seatIdInfronOfYours + 1

console.log(yourSeatId)
