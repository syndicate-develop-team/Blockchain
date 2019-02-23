const SHA256 = require("crypto-js/sha256");


class Transacion{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block{
    constructor(timestamp, transactions, previousHash = ''){
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nounce = "0";
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nounce) .toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0,difficulty) !== Array(difficulty + 1).join("0")){
            this.nounce++;
            this.hash = this.calculateHash();
        }

        console.log("Block Mined: " + this.hash);
    }

}



class Blockchain{
    constructor(){
        this.chain = [this.CreateGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    CreateGenesisBlock(){
        return new Block(0,"02/22/2019","Genesis Block","0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(miningRewardAddress){
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);


        this.chain.push(block);

        this.pendingTransactions = [
            new Transacion('Official', miningRewardAddress, this.miningReward)
        ]
    }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address){
        let balance = 0;

        for(const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromAddress === address){
                    balance -= trans.amount;
                }

                if(trans.toAddress === address){
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}

let Syncoin = new Blockchain();

//Syncoin.createTransaction(new Transacion("musda666", "horace123", 100));

Syncoin.createTransaction(new Transacion("horace123", "musda666", 1));

console.log('[musda666] Amount: ' + Syncoin.getBalanceOfAddress('musda666'));


Syncoin.minePendingTransactions("musda666");

console.log('[musda666] Amount: ' + Syncoin.getBalanceOfAddress("musda666"));

Syncoin.minePendingTransactions("musda666");

console.log('[musda666] Amount: ' + Syncoin.getBalanceOfAddress("musda666"));

