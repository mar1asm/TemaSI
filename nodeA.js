const KM = require("./nodeKM");
const Utils = require("./utils")
let CryptoJS = require("crypto-js");
const NodeB = require("./nodeB");
const fs = require("fs");

class NodeA {
    
    constructor() {
        this.K2 = "12345678"
        this.IV = "12345678"
        this.mode = ""
        this.cryptedKey = ""
        this.startComm = false;
    }

    getEncryptionMode() { //input from user
        do {
            this.mode = Utils.getInputFromUser()
        } while (this.mode != "CBC" && this.mode != "ECB")
    }

    sendEncryptionMode() {
        NodeB.setEncryptionMode(this.mode)
    }

    requestEncryptionKey() { //request the key from node KM
        this.K2 = "12345678"
        this.cryptedKey = KM.getEncryptionKey();
        console.log("[NodeA] Key before decryption: ", this.cryptedKey)
        var decryptedText = CryptoJS.AES.decrypt(this.cryptedKey, this.K2);
        this.key = decryptedText.toString(CryptoJS.enc.Utf8);
        console.log("[NodeA] Key after decryption: ", this.key)
    }

    sendEncryptionKey() {
        NodeB.setEncryptionKey(this.cryptedKey)
    }


    encECB(text) {
        const array = [];
        let cryptedArray = [];

        for (let index = 0; index < text.length / 8; index = index + 1)
            array.push(text.substring(index * 8, (index + 1) * 8));

        for (let e of array) {
            var encrptedText = CryptoJS.AES.encrypt(e, this.key).toString();
            cryptedArray.push(encrptedText);
        }
        console.log("\nCrypted array with ECB: \n", cryptedArray);
        return cryptedArray;
    }

    encCBC(text) {  // mai multe functii
        let cryptedArray = [];
        let chunks = [];

        for (var i = 0, charsLength = text.length; i < charsLength; i += 8) {
            chunks.push(text.substring(i, i + 8));
        }

        chunks.forEach((chunk, index) => {
            let encryptedText = "";
            if (index === 0) {
                encryptedText = CryptoJS.AES.encrypt(this.key, this.IV).toString();
            } else {
                encryptedText = CryptoJS.AES.encrypt(cryptedArray[chunks[index  - 1]], this.key).toString();
            }

            const ciph = encryptedText.substring(0, 8);

            encryptedText = Utils.XOR(chunk, ciph);
            cryptedArray.push(encryptedText);
        });

        console.log("\nCrypted text with CBC: \n ", cryptedArray);
        return cryptedArray;
    }


    start() {
        
        this.getEncryptionMode()
        this.requestEncryptionKey()
        this.sendEncryptionKey()
        this.sendEncryptionMode()
        let text = fs.readFileSync("./file.txt", "utf-8");
        if (this.mode == "ECB") {
            NodeB.setText(this.encECB(text))
        } else {
            NodeB.setText(this.encCBC(text))
        }
        
       
    }
    
}

module.exports = NodeA;