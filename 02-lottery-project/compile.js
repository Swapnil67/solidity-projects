const fs = require("fs");
const path = require("path");
const solc = require('solc');

const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');

const source = fs.readFileSync(lotteryPath, 'utf-8');

module.exports = solc.compile(source, 1).contracts[':Lottery'];


/*
  * Interface: Javascript ABI
  * bytecode: Actual raw compiled contract
*/