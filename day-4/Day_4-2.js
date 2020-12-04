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

  let passPortsWithValidFields = []
  passPortData.forEach(info => {
    if (info.length === 8) {
      passPortsWithValidFields = [...passPortsWithValidFields, info]
    } else if (!info.find(item => item.match('cid')) && info.length === 7) {
      passPortsWithValidFields = [...passPortsWithValidFields, info]
    }
  })
  const validPassPorts = passPortsWithValidFields.filter(validateValues)
  return validPassPorts.length
}

function validateValues (passPort) {
  let valid = true
  passPort.forEach(field => {
    if (!valid) return
    const [key, value] = field.split(':')
    switch (key) {
      case 'hcl': {
        valid = checkHairColor(value)
        break
      }
      case 'eyr': {
        valid = checkExpirationYear(value)
        break
      }
      case 'byr': {
        valid = checkBirthYear(value)
        break
      }
      case 'iyr': {
        valid = checkIssueYear(value)
        break
      }
      case 'hgt': {
        valid = checkHeight(value)
        break
      }
      case 'ecl': {
        valid = checkEyeColor(value)
        break
      }
      case 'pid': {
        valid = checkPassportId(value)
        break
      }
      case 'cid': {
        valid = true
        break
      }
      default:
        valid = false
    }
  })
  return valid
}

function checkHairColor (color) {
  if (color[0] !== '#' || color.length !== 7) return false
  if (color.substring(1).match(/[a-f\d]/g).length === 6) return true
  return false
}

function checkBirthYear (year) {
  if (year.length !== 4) return false
  const birthYear = Number(year)
  return birthYear >= 1920 && birthYear <= 2002
}

function checkExpirationYear (year) {
  if (year.length !== 4) return false
  const expireYear = Number(year)
  return expireYear >= 2020 && expireYear <= 2030
}
function checkIssueYear (year) {
  if (year.length !== 4) return false
  const issueYear = Number(year)
  return issueYear >= 2010 && issueYear <= 2020
}

function checkHeight (value) {
  const height = Number(value.match(/\d/g).join(''))

  if (value.match('in')) {
    return height >= 59 && height <= 76
  } else if (value.match('cm')) {
    return height >= 150 && height <= 193
  }
  return false
}

function checkEyeColor (value) {
  if (value.length !== 3) return false
  return value === 'amb' ||
    value === 'blu' ||
    value === 'brn' ||
    value === 'gry' ||
    value === 'grn' ||
    value === 'hzl' ||
    value === 'oth'
}

function checkPassportId (value) {
  const matchedDigits = value.match(/\d/g).length
  return matchedDigits === 9
}

console.log(validatePassports(aggregateData))
