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

    //me lleva a las reviews de ¿¿usuarios??
    await page.click('.rating-holder a');
    await page.waitForSelector('.hred')
    await page.screenshot({ path: 'sensacine4.png' });


    //inspeccionamos página
   const review = await page.evaluate(() => {
    let reviews = document.querySelectorAll(".hred review-card cf")
    return reviews;
    })

    console.log(review);


    await browser.close();

};

scrap_sensacine("rey leon 2");

