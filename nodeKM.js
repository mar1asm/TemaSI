const CryptoJS = require("crypto-js");
const Utils = require("./utils")

class KM {
    constructor() {
        
    }

    static getEncryptionKey() {
        this.K2 = "abcdefgh";
        this.K1 = Utils.getRandomString(8);

        console.log("[KM] Key before encryption: ", this.K1)
        let encryptedText = CryptoJS.AES.encrypt(this.K1, this.K2);
        this.K1 = encryptedText.toString();
        console.log("[KM] Key after encryption: ", this.K1)
        return this.K1;
    }

    
}

module.exports = KM;