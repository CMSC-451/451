var main = web3.eth.accounts[0];
var sec = web3.eth.accounts[1];

var source = 'contract mortal { address owner; function mortal() { owner = msg.sender; } function kill() { if (msg.sender == owner) suicide(owner); } } contract ProofOfPurchase is mortal { string x; string y; string z; function ProofOfPurchase(string orderNum, string productName, string notes){ x = orderNum; y = productName; z = notes; } function eReceipt(string orderNum, string productName, string notes) public{ x = "newOrderNum"; y = productName; z = notes; } function QueryeReceipt(int index) constant returns (string){ if(index == 0) return x; if(index == 1) return y; if(index == 2) return z; } }';

var compiled = web3.eth.compile.solidity(source);
var contract = web3.eth.contract(compiled.ProofOfPurchase.info.abiDefinition);

var orderNum = "135";
var productName = "Product Name";
var notes = "Notes";

var pop = contract.new(orderNum, productName, notes, {from: main, data: compiled.ProofOfPurchase.code, gas: 30000000}, function(e, contract){if(!e){if(!contract.address){console.log("Waiting to be mined...");}else{console.log("Contract mined!!! Address: " + contract.address); console.log(contract);}}});
