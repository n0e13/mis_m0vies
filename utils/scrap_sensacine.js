const puppeteer = require('puppeteer');

const scrap_sensacine = async (movie) => {
    console.log("Empieza scrap Sensacine");
    
    //lanzamos chrome
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.setViewport({width:1440, height:614});

    //abrimos site
    await page.goto('https://www.sensacine.com/peliculas/');
    /* await page.screenshot({ path: 'sensacine1.png' }); */

    //escribimos en el buscador el nombre que le introduzcamos como argumento
    await page.type('#header-search-input', movie)
   

    //selecciono la clase común a las cajas que me interesan (se ven en la propia pagina)
    await page.click('.header-search-submit');
    await page.waitForSelector('.mdl')


    const links = await page.evaluate(() => {
      const elements = document.querySelectorAll('.rating-holder a')

      let links = [];
      for(let element of elements){
          links.push(element.href);
      }
      return links;
  })
  console.log("Estos son los enlaces", links);


    //buscamos el enlace que contenga "criticas-espectadores"
    const match = links.find(element => element.includes('criticas-espectadores'));
    console.log("Resultado de match: ", match);
    
   
    //hacemos click en ese enlace
    await page.goto(match);
    await page.waitForSelector('.dropdown-custom-holder');
   
    
   
  //sacamos el primer comentario de las reviews de usuarios (username + comentario)
 
  let innerTextOfReview = await page.$eval('div.review-card-review-holder > div.content-txt.review-card-content', el => el.innerText) 
  let innerUserOfReview = await page.$eval('div.review-card-aside > div > div > div > span', el => el.innerText)

  if(innerUserOfReview == "Un visitante"){
    innerUserOfReview = "Un visitante de Sensacine"
  }
  
  console.log("innerTextOfReview: ", innerTextOfReview); 
  console.log("innerUserOfReview: ", innerUserOfReview);
  

    await browser.close();

};

module.exports = {scrap_sensacine};