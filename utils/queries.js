//QUERIES

const signUpUserQuery = `INSERT INTO users(name,surname,email,password) VALUES ($1,$2,$3,$4)`
const getUsersQuery = `SELECT * FROM users`;

/* const logInQuery = `INSERT INTO users(name,surname,email,password) VALUES ($1,$2,$3,$4)`
 */
const queries = {
signUpUserQuery,
getUsersQuery,
/* logInQuery */
}



module.exports = queries;