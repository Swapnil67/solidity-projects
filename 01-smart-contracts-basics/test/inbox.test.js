const assert = require("assert");
const ganache = require("ganache");
const { Web3 } = require("web3");
const { interface, bytecode } = require("../compile");

// * Creating a web3 instance
const web3 = new Web3(ganache.provider());


const initialMessage = 'Hello Web3!';
let accounts;
let inbox;

beforeEach(async () => {

  // * Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // * Use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [initialMessage] })
    .send({ from: accounts[0], gas: "1000000" });

});


describe("Inbox", () => {
  it('deploys a contract', () => {  
    assert.ok(inbox.options.address)
  })

  it('has a default message', async () => { 
    const message = await inbox.methods.message().call();
    assert.equal(message, initialMessage);
  })

  it('can change the message', async () => {
    const new_message = "Web3 is awesome";
    await inbox.methods.setMessage(new_message).send({ from: accounts[0] });
    const message = await inbox.methods.message().call()
    assert.equal(message, new_message);
  })

})



// ! Notes
// * A contract is created through a transaction
// * Web3 instance is used to connect to the etherum network
// * Provider is like a communication layer b/w web3 library and some etherum network


/*
* Test Cases Demo

class Car {
  park() {
    return 'stopped';
  }

  drive() {
    return 'vroom';
  }
}

let car;
beforeEach(() => {
  car = new Car();
})

describe('Car', () => {

  it('can park', () => {
    assert.equal(car.park(), 'stopped');
  })

  it('can drive', () => {
    assert.equal(car.drive(), 'vroom');
  })
})
*/