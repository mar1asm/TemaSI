
const prompt = require('prompt-sync')();
class Utils {
    static XOR(a, b) {
        const result = [];
        for (let i = 0; i < a.length; i++) {
            result.push(String.fromCharCode(a.charCodeAt(i) ^ b.charCodeAt(i)));
        }
        return result.join("");
    }

    static getInputFromUser() {
        let input;
        input = prompt("ECB/CBC? ");
        return input;
    }

    static getRandomString(length) { 
        var randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var result = "";
        for (var i = 0; i < length; i++) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    }
}
module.exports = Utils;
