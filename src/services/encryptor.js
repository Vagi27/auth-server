const bcrypt = require("bcrypt");
const saltRounds = 10;

class Encryptor {
    static async hash(plainTextPassword) {
        const hashedValue = await bcrypt.hash(plainTextPassword, saltRounds);
        return hashedValue;
    }
    static async compareHash(plainTextPassword, hashedValue) {
        return await bcrypt.compare(plainTextPassword, hashedValue);
    }
}

module.exports = Encryptor;
