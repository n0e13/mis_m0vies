
const puppeteer = require('puppeteer');

const scrap_sensacine = async (title) => {
    console.log("Empieza scrap Sensacine");
    
    //lanzamos chrome
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.setViewport({width:1440, height:614});

    //abrimos site
    await page.goto('https://www.sensacine.com/peliculas/');
    await page.screenshot({ path: 'sensacine1.png' });

    //escribimos en el buscador el nombre que le introduzcamos como argumento
    await page.type('#header-search-input', title)
    await page.screenshot({ path: 'sensacine2.png' });

    //selecciono la clase común a las cajas que me interesan (se ven en la propia pagina)
    await page.click('.header-search-submit');
    await page.waitForSelector('.mdl')
    await page.screenshot({ path: 'sensacine3.png' });
    console.log("Hecho el 3er screenshot");


    
    //inspeccionamos página para sacar los enlaces de las reviews
  const links = await page.evaluate(() => { 
    console.log("A ver eso QUÉ?1");
        const elements = document.querySelectorAll('.xXx rating-title a');
        console.log(elements);
        
        return elements;/* elements.map((element) => element.href) */
    })
    console.log("Estos son los resultados y enlaces", links); 


    //buscamos el enlace que contenga "criticas-espectadores"
    /* const match = links.find(element => element.includes('criticas-espectadores'));
    console.log("Resultado de match: ", match);
     */
   /* 
    //hacemos click en ese enlace
    await page.goto(match);
    await page.waitForSelector('.titlebar');
    await page.screenshot({ path: 'sensacine4.png' }); */
   
    
     

    //inspeccionamos página para sacar los comentarios de las reviews de usuarios
   /*  const review = await page.evaluate(() => { 

        const obj = {}; //div con la info de la review
        obj.div
        const elements = document.querySelectorAll('.hred review-card cf').innerText
        return obj
    })
    console.log(review);
    await page.screenshot({ path: 'sensacine5.png' });
 */

    await browser.close();

};

scrap_sensacine("amelie");


/* module.exports = scrap_sensacine; */