//QUERIES

const signUpUserInsert = `INSERT INTO users(name,surname,email) VALUES ($1,$2,$3)`


const queries = {
signUpUserInsert
}



module.exports = queries;