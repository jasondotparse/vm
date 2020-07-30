// indices:     00 01 02 03 04 05 06 07 08 09 0a 0b 0c 0d 0e 0f 10 11 12 13
//              __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __ __
//              INSTRUCTIONS ---------------------------^ OUT-^ IN-1^ IN-2^
//
// instructions:
// load_word(0x01)  reg addr         # Load value at given address into register
// store_word(0x02) reg addr         # Store the value in register at the given address
// add(0x03)        reg1 reg2        # Set reg1 = reg1 + reg2
// sub(0x04)        reg1 reg2        # Set reg1 = reg1 - reg2
// halt(0xff)

let mainMemory = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];

const load_word = '0x01';
const store_word = '0x02';
const add = '0x03';
const sub = '0x04';
const halt = '0xff';

const startVM = (memory, program) => {
  // load program into main memory
  mainMemory = [...program];

  let registers = [0, null, null];

  // start the program
  let executing = true;

  while (executing) {
    const counter = registers[0];

    // fetch
    const instruction = mainMemory[counter];

    // decode
    switch (instruction) {
      case load_word:
        // execute
        const registerIndex = mainMemory[counter + 1] === '0x01' ? 1 : 2;

        const addressOfInput = parseInt(mainMemory[counter + 2]);

        const leftInput = parseInt(mainMemory[addressOfInput]);
        const rightInput = parseInt(mainMemory[addressOfInput + 1]);

        registers[registerIndex] = '0x' + rightInput.toString(16) + leftInput.toString(16);

        break;
      case store_word:
        // execute
        const word = parseInt(registers[1]).toString(16);

        const bit1 = word.slice(0, 2);
        const bit2 = word.slice(2);

        mainMemory[14] = bit2;
        mainMemory[15] = bit1;

        break;
      case add:
        // execute
        const sum = parseInt(registers[1]) + parseInt(registers[2]);

        const hexSum = '0x' + sum.toString(16);

        registers[1] = hexSum;

        break;
      case sub:
        // execute
        const diff = parseInt(registers[1]) - parseInt(registers[2]);

        const hexDiff = '0x' + sum.toString(16);

        registers[1] = hexDiff;

        break;
      case halt:
        // execute
        break;
    }

    registers[0] = registers[0] + 3;

    if (instruction === halt) {
      executing = false;
    }
  }
};

const program = [
  '0x01', '0x01', '0x10',
  '0x01', '0x02', '0x12',
  '0x03', '0x01', '0x02',
  '0x02', '0x01', '0x0e',
  '0xff',
  '0x00',
  '0x00', '0x00',
  '0xa1', '0x14',
  '0x0c', '0x00'
];

// boot up the VM, passing in memory it can mutate and a program it can run
startVM(mainMemory, program);

console.log(mainMemory);

module.exports = {
  startVM
}
