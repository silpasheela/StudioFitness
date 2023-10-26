const bcrypt = require('bcrypt')

const getHashedPassword = async(password) => {
    
    const hashedPassword = await bcrypt.hash(password,10);
    return hashedPassword;
}

const verifyPassword = async(password,securedPassword) => {

    const isPasswordMatch = await bcrypt.compare(password,securedPassword);
    return isPasswordMatch;
}

module.exports = {
    getHashedPassword,
    verifyPassword
}