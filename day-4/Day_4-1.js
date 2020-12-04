const fs = require('fs')
const testInput = fs.readFileSync('./Day_4-1_input.txt', 'utf-8').split('\n')

// const testInput = [
//   'ecl:gry pid:860033327 eyr:2020 hcl:#fffffd',
//   'byr:1937 iyr:2017 cid:147 hgt:183cm',
//   '',
//   'iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884',
//   'hcl:#cfa07d byr:1929',
//   '',
//   'hcl:#ae17e1 iyr:2013',
//   'eyr:2024',
//   'ecl:brn pid:760753108 byr:1931',
//   'hgt:179cm',
//   '',
//   'hcl:#cfa07d eyr:2025 pid:166559648',
//   'iyr:2011 ecl:brn hgt:59in'
// ]

const aggregateData = {}
let temp = []
for (let i = 0; i < testInput.length; i++) {
  const info = testInput[i]
  if (info) {
    temp = [...temp, info.split(' ')]
  } else {
    const formattedData = temp.flat()
    aggregateData[`passpor${i}`] = formattedData
    temp = []
  }
  if (i === testInput.length - 1) {
    const formattedData = temp.flat()
    aggregateData[`passpor${i}`] = formattedData
    temp = []
  }
}

function validatePassports (passPorts) {
  const passPortData = Object.values(passPorts)

  let validPassport = 0
  let validNorthPoleCred = 0
  passPortData.forEach(info => {
    if (info.length === 8) validPassport++

    const missingCID = !info.find(item => item.match('cid'))
    if (missingCID && info.length === 7) {
      validNorthPoleCred++
    }
  })
  return validNorthPoleCred + validPassport
}

console.log(validatePassports(aggregateData))
