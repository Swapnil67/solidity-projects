const fs = require("fs");
const path = require("path");
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'inbox.sol');

const source = fs.readFileSync(inboxPath, 'utf-8');

module.exports = solc.compile(source, 1).contracts[':Inbox'];


/*
  * Interface: Javascript ABI
  * bytecode: Actual raw compiled contract
*/