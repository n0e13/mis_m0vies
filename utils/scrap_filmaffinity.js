const puppeteer = require('puppeteer');

const scrap_filmaffinity = async (title) => {
    try{
      
      console.log("Empieza scrap Filmaffinity");
    
    //lanzamos chrome
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.setViewport({width:1440, height:614});

    //abrimos site
    await page.goto('https://www.filmaffinity.com/es/main.html');


    if(await page.$('#qc-cmp2-main > div')){
        await page.click('#qc-cmp2-ui > div.qc-cmp2-footer.qc-cmp2-footer-overlay > div > button.css-v43ltw');
    } 

    //escribimos en el buscador el nombre que le introduzcamos como argumento
    await page.type('#top-search-input', title)
   

    //selecciono la clase común a las cajas que me interesan (se ven en la propia pagina)
    await page.click('#button-search');
    await page.waitForSelector('.ye-w')    

    const links = await page.evaluate(() => {
      const elements = document.querySelectorAll('.mc-title a')

      let links = [];
      for(let element of elements){
          links.push(element.href);
      }
      return links;
  })
  console.log("Estos son los enlaces de peliculas que aparecen como resultado de búsqueda", links);

    //hacemos click en ese enlace
    await page.goto(links[0]);
    await page.waitForSelector('#main-title');
  
    await page.click('.ntabs li:nth-child(2)');

  //sacamos el primer comentario de las reviews de usuarios (username + comentario)
  let innerTextOfReview = await page.$eval('.review-text1', el => el.innerText) 
  let innerUserOfReview = await page.$eval('.user-info :nth-child(1)', el => el.innerText)
  
  console.log("console log en scrap js de innerTextOfReview: ", innerTextOfReview); 
  console.log("console log en scrap js de innerUserOfReview: ", innerUserOfReview); 

  const reviewsFilmaffinity = {
    innerTextOfReview,
    innerUserOfReview
  
  }
  
    await browser.close();
    return reviewsFilmaffinity;

} catch (error) {
  return console.log(`ERROR: ${error.stack}`);
  
  }
}

module.exports = scrap_filmaffinity;