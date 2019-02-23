const SHA256 = require("crypto-js/sha256");

class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
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
        this.difficulty = 5;
    }

    CreateGenesisBlock(){
        return new Block(0,"02/22/2019","Genesis Block","0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
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

Syncoin.addBlock(new Block(1,"02/23/2019",{amount: 16}));

Syncoin.addBlock(new Block(2,"02/27/2019",{amount: 10}));
