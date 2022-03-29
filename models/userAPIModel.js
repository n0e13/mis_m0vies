require('dotenv').config();

const loginUser = async (email) => {
    // TODO: login
}

const signUpUser = async (email) => {
    // TODO: registro
}

const recoverPassword = async (email) => {
    // TODO: recoverpass
}

const resetPassword = async (email) => {
    // TODO: resetpass
}

const logoutUser = async (email) => {
    // TODO: logout
}


const userAPI = {
    loginUser,
    signUpUser,
    recoverPassword,
    resetPassword,
    logoutUser
}

module.exports = userAPI;