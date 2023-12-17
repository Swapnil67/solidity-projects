const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");
const { interface, bytecode } = require("./compile");

const provider = new HDWalletProvider(
  'view fragile live equip useless bring finish park always impact celery play',
  'https://sepolia.infura.io/v3/2c35aeb5084e4443b65c4f013ff80e74'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account ', accounts[0]);

  const results = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hello Web3!'] })
    .send({ from: accounts[0], gas: '1000000' })


  console.log('Contract Deployed to ', results.options.address);

  provider.engine.stop();

}

deploy();


// ! Notes
// * A contract is created through a transaction
// * Web3 instance is used to connect to the etherum network
// * Provider is like a communication layer b/w web3 library and some etherum network