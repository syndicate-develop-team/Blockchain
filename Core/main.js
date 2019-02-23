const {Blockchain, Transaction, Block} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('64171527e7e099205cfb3fff992b53e493f019b42785548c4362b6c1ad0789ad');
const myWalletAddress = myKey.getPublic('hex');

let Syncoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, '04eb6f971d16cce04e2a148ba6d908cb796a9c5343a214d4eb2f2afb277f19804695f945427e32237a62e36f4aac013c6fec1f2eec8c7ce14bf586cbdf9244e6ef', 15);
tx1.signTransaction(myKey);
Syncoin.createTransaction(tx1);

console.log('Miner Activity');

Syncoin.minePendingTransactions(myWalletAddress);

console.log('[musda666] Amount: ' + Syncoin.getBalanceOfAddress(myWalletAddress));

console.log(Syncoin.getLatestBlock());