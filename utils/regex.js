//Que contenga @ y un .
const validateEmail = (email) => {
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexEmail.test(email.toLowerCase());
};
//minimo 8 caracteres, minusculas, mayusculas, caracter especial y numero
const validatePassword = (password) => {
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\_\-])(?=.{8,})/;
    return regexPassword.test(password);
};

const validateName = (name) => {
    const regexName = /^[A-Za-z]+$/;
    return regexName.test(name)
}

const regex = {
    validateEmail,
    validatePassword,
    validateName
};

module.exports = regex;
