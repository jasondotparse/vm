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
  // load the program into mainMemory
  mainMemory = [...program];

  let registers = [0, null, null];

  let executing = true;

  while (executing) {
    const counter = registers[0];

    // fetch an instruction from memory
    const instruction = mainMemory[counter];

    // decode and execute the instruction 
    switch (instruction) {
      case load_word:
        const registerIndex = mainMemory[counter + 1] === '01' ? 1 : 2;
        const addressOfInput = parseInt(mainMemory[counter + 2]);

        registers[registerIndex] = mainMemory[addressOfInput];

        break;
      case store_word:
        break;
      case add:
        break;
      case sub:
        break;
      case halt:
        break;
    }

    // increment counter
    registers[0] = registers[0] + 3;

    // if the instruction is '0xff', set executing to false.
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

startVM(mainMemory, program);

console.log(mainMemory);

module.exports = {
  startVM
}
