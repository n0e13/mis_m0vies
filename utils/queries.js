//QUERIES

const signUpUserQuery = `INSERT INTO users(name,surname,email,password) VALUES ($1,$2,$3,$4)`
const getUsersQuery = `SELECT * FROM users`;   
// const updateUserPassQuery = `` 

/* const loginUserQuery= `SELECT * FROM users (email, password) WHERE email = $1 && password = $2`
 */

const queries = {
signUpUserQuery,
getUsersQuery,
/* loginUserQuery */

}



module.exports = queries;