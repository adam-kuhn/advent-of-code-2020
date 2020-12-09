const fs = require('fs')
const testInput = fs.readFileSync('./Day_8-1_input.txt', 'utf-8').split('\n')

// const testInput = ['nop +0',
//   'acc +1',
//   'jmp +4',
//   'acc +3',
//   'jmp -3',
//   'acc -99',
//   'acc +1',
//   'jmp -4',
//   'acc +6']

const formattedInput = testInput.map(input => {
  const [instruction, argument] = input.split(' ')
  return {
    instruction,
    argument: Number(argument),
    executed: 0,
    swapped: false
  }
})

function runProgram (swapInstruction) {
  let accumulator = 0
  const tempInput = formattedInput.map(i => {
    return {
      ...i
    }
  })

  const index = tempInput.findIndex(input => {
    return input.instruction === swapInstruction && !input.swapped
  })
  if (index < 0) {
    console.log('NOPE')
    return
  }
  formattedInput[index].swapped = true
  tempInput[index].instruction = swapInstruction === 'nop' ? 'jmp' : 'nop'

  for (let i = 0; i < tempInput.length; i++) {
    const {instruction, argument, executed} = tempInput[i]
    if (executed === 1) break
    switch (instruction) {
      case 'acc': {
        accumulator += argument
        tempInput[i].executed++
        break
      }
      case 'jmp': {
        tempInput[i].executed++
        i += argument - 1

        break
      }
      case 'nop':
        tempInput[i].executed++
        break
    }
    if (i === tempInput.length - 1) {
      console.log('complete', accumulator)
      return
    }
  }
  runProgram(swapInstruction)
}

runProgram('nop')
console.log('not nop')
runProgram('jmp')
