var main = web3.eth.accounts[0];

var source = /*source code without line comments*/;

var compiled = web3.eth.compile.solidity(source);
var contract = web3.eth.contract(compiled./*class name*/.info.abiDefinition);

/*
 * Place any data variables here.
 *
 * e.g.
 * var orderNum = "123";
 * var productName = "product name";
 * etc.
 */

var pop = contract.new(/*variables listed above*/, {from: main, data: compiled./*class name*/.code, gas: 30000000}, function(e, contract){if(!e){if(!contract.address){console.log("Waiting to be mined...");}else{console.log("Contract mined!!! Address: " + contract.address); console.log(contract);}}});
