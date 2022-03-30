//QUERIES

const signUpUserQuery = `INSERT INTO users(name,surname,email,password) VALUES ($1,$2,$3,$4)`

const logInQuery = `INSERT INTO users(name,surname,email,password) VALUES ($1,$2,$3,$4)`

const queries = {
signUpUserQuery,
logInQuery
}



module.exports = queries;