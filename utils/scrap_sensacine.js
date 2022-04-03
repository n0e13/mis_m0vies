
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


    
    //inspeccionamos página para sacar los enlaces de las reviews
   const links = await page.evaluate(() => { 
        const elements = document.querySelectorAll('.rating-holder a')
        return elements.map((element) => element.href)
    })
    console.log("Estos son los resultados y enlaces", links);


    //buscamos el enlace que contenga "criticas-espectadores"
    const match = links.find(element => element.includes('criticas-espectadores'));
    console.log("Resultado de match: ", match);
    
   
    //hacemos click en ese enlace
    await page.goto(match);
    /* await page.waitForSelector('.hred') */
    await page.screenshot({ path: 'sensacine4.png' });
     


    const review = [];
    


    for(let enlace of enlaces){
        await page.goto(enlace);
        await page.waitForSelector('h1');

        const oferta = await page.evaluate(()=>{
            const tmp = {};
            tmp.title = document.querySelector('h1').innerText;
            tmp.company = document.querySelector('h2').innerText;
            tmp.salary = document.querySelector('dd:nth-of-type(4n)').innerText;
            tmp.url = window.location.href;
            return tmp
        });
        ofertas.push(oferta);
    }
    console.log("Scrap Domestika conseguido!")


    await browser.close();

};

scrap_sensacine("el rey arturo");


