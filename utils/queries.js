//QUERIES

const signUpUserQuery = `INSERT INTO users(name,surname,email,password) VALUES ($1,$2,$3,$4)`
const getUsersQuery = `SELECT * FROM users`    
const deleteMovieQuery = `DELETE FROM movies WHERE movie_id = $1`
// const updateUserPassQuery = ``
const getUsersByEmail = `SELECT * FROM users WHERE email=$1`
const getFavs = `SELECT movie_id
FROM movies
INNER JOIN users
ON users.user_id = movies.user_id
WHERE users.email = $1`


const queries = {
signUpUserQuery,
getUsersQuery,
deleteMovieQuery,
getUsersByEmail,
getFavs
}



module.exports = queries;