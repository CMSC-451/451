var main = web3.eth.accounts[0];
var sec = web3.eth.accounts[1];

var source = 'contract mortal { address owner; function mortal() { owner = msg.sender; } function kill() { if (msg.sender == owner) suicide(owner); } } contract eReceipt is mortal { string x; string y; string z; string q; function eReceipt(string date, string orderNum, string productName, string notes){ x = date; y = orderNum; z = productName; q = notes; } function QueryeReceipt(int index) constant returns (string){ if(index == 0) return x; if(index == 1) return y; if(index == 2) return z; if(index == 3) return q; } }';

var compiled = web3.eth.compile.solidity(source);
var contract = web3.eth.contract(compiled.eReceipt.info.abiDefinition);

var date = "11/14/15";
var orderNum = "12345";
var productName = "eTextbook";
var notes = "Shipping address: 1027 N Lombardy St Richmond VA 23220";

var eReceipt = contract.new(date, orderNum, productName, notes, {from: main, data: compiled.eReceipt.code, gas: 30000000}, function(e, contract){if(!e){if(!contract.address){console.log("Waiting to be mined...");}else{console.log("Contract mined!!! Address: " + contract.address); console.log(contract);}}});
