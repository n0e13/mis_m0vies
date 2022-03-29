const fetch = require("node-fetch")


const getFilmsByTitle = async (title) => {
    try{
        let response = await fetch(`https://imdb-api.com/API/AdvancedSearch/k_93vq1388/?title=${title}`);//{}
        let films = await response.json();//{}
        return films;
      }catch(error){
        console.log(`ERROR: ${error.stack}`);
        return [];
      }
}


const films = {
    getFilmsByTitle
}

module.exports = films;