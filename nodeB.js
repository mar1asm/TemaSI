const Utils = require("./utils")
let CryptoJS = require("crypto-js");

class NodeB {
    constructor() {
        this.K2 = "abcdefgh";
    }

    static setEncryptionMode(mode) {
        this.mode = mode;
    }


    static setEncryptionKey(cryptedKey) {
        this.K2 = "abcdefgh";
        this.cryptedKey = cryptedKey;
        console.log("[NodeB] Key before decryption: ", this.cryptedKey)
        var decryptedText = CryptoJS.AES.decrypt(cryptedKey, this.K2);
        this.key = decryptedText.toString(CryptoJS.enc.Utf8);
        console.log("[NodeB] Key after decryption: ", this.key)
    }

    static setText(encryptedText) {
        if (this.mode == "ECB") {
            this.ECB_Decryption(encryptedText)
        } else {
            this.CBC_Decryption(encryptedText)
        }
    }


    static ECB_Decryption(cryptedArray) {
        this.IV = "qwertyui";
        let decryptedArray = [];
        cryptedArray.forEach((block, index) => {
            var decryptedText = CryptoJS.AES.decrypt(block, this.key);
            
            decryptedArray.push(decryptedText.toString(CryptoJS.enc.Utf8));
        })
        console.log("Decrypted text with ECB: \n", decryptedArray.join(""));
    }

    

    static CBC_Decryption(cryptedArray) {
        let decryptedArray = [];
        let decText = "";

        cryptedArray.forEach((ciphertext, index) => {
            let encryptedText = "";
            if (index === 0) {
                encryptedText = CryptoJS.AES.encrypt(this.IV, this.key).toString();
            } else {
                encryptedText = CryptoJS.AES.encrypt(cryptedArray[index - 1], this.key).toString();
            }
            decText = Utils.XOR(ciphertext, encryptedText.substring(0, 8));
            decryptedArray.push(decText);
        });

        console.log("Decrypted text with CBC: \n ", decryptedArray.join(""));
    }
   

}

module.exports = NodeB;