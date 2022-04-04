const bcrypt = require("bcrypt");

const comparePassword = async (pass, hash) => {
    try {
        return await bcrypt.compare(pass, hash);
    } catch (error) {
        throw error;
    }
};

module.exports = comparePassword;