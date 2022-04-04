const puppeteer = require('puppeteer');

const scrap_filmaffinity = async (title) => {
    console.log("Empieza scrap Filmaffinity");
    
    //lanzamos chrome
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.setViewport({width:1440, height:614});

    //abrimos site
    await page.goto('https://www.filmaffinity.com/es/main.html');
    await page.screenshot({ path: 'screenshot 1.png' });

    if(await page.$('#qc-cmp2-main > div')){
        await page.click('#qc-cmp2-ui > div.qc-cmp2-footer.qc-cmp2-footer-overlay > div > button.css-v43ltw');
    } 
    await page.screenshot({ path: 'screenshot 2.png' });

    //escribimos en el buscador el nombre que le introduzcamos como argumento
    await page.type('#top-search-input', title)
   

    //selecciono la clase común a las cajas que me interesan (se ven en la propia pagina)
    await page.click('#button-search');
    await page.waitForSelector('.z-search')
    await page.screenshot({ path: 'screenshot 3.png' });
    


    const links = await page.evaluate(() => {
      const elements = document.querySelectorAll('.mc-title a')

      let links = [];
      for(let element of elements){
          links.push(element.href);
      }
      return links;
  })
  console.log("Estos son los enlaces", links);
  await page.screenshot({ path: 'screenshot 4.png' });

    //hacemos click en ese enlace
    await page.goto(links[0]);
    await page.waitForSelector('#main-title');
    await page.screenshot({ path: 'screenshot 5.png' });
   
    
   
  //sacamos el primer comentario de las reviews de usuarios (username + comentario)
 
  let innerTextOfReview = await page.$eval('.pro-review div:nth-child(1)', el => el.innerText) 
  let innerUserOfReview = await page.$eval('.pro-crit-med', el => el.innerText)
  
  console.log("innerTextOfReview: ", innerTextOfReview); 
  console.log("innerUserOfReview: ", innerUserOfReview); 
  

    await browser.close();

};

module.exports = scrap_filmaffinity;