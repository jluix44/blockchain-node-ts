import SHA256 from 'crypto-js/sha256';
//import hex2ascii from "hex2ascii"
//const hex2ascii = require("../src/utils/hex2ascii")


export default class Block {

    hash: any
    height: number
    body: any
    time: any
    previousBlockHash: any


    constructor(data: any) {
        this.hash = null
        this.height = 0
        this.body = Buffer.from(JSON.stringify(data)).toString('hex')
        this.time = 0
        this.previousBlockHash = null
    }

    validate() {
        const self = this;
        return new Promise((resolve, reject) => {
            let currentHash = self.hash
            self.hash = SHA256(JSON.stringify({ ...self, hash: null })).toString()
            if (currentHash !== self.hash) {
                return resolve(false)
            }
            resolve(true)
        })
    }
    
    getBlockData() {
        const self = this;
        return new Promise((resolve, reject) => {
            let encodedData = self.body;
            let decodedData = Buffer.from(encodedData, 'hex').toString()  //hex2ascii(encodedData);
            let dataObject = JSON.parse(decodedData);
            if (dataObject === "Genesis Block") {
                reject(new Error("This is the Genesis Block"));
            }
        
            resolve(dataObject);
        });
    }
    
    toString() {
        const { hash, height, body, time, previousBlockHash } = this;
        return `Block -
            hash: ${hash}
            height: ${height}
            body: ${body}
            time: ${time}
            previousBlockHash: ${previousBlockHash}
            -------------------------------------`;
    }

}