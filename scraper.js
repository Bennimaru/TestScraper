const puppeteer = require('puppeteer')

async function scrapeItem(url) {

    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto(url)

    const [itemPic] = await page.$x('//*[@id="mainSlide_02WC-000N-01HU6"]')
    const src = await itemPic.getProperty('src')
    const srcText = await src.jsonValue()

    const [itemName] = await page.$x('//*[@id="grpDescrip_2WC-000N-01HU6"]')
    const name = await itemName.getProperty('innerHTML')
    const title = await name.jsonValue()

    console.log({ srcText, title })

    browser.close()
}

scrapeItem('https://www.newegg.com/lunar-white-asus-rog-zephyrus-g14-ga401iv-br9n6-gaming-entertainment/p/2WC-000N-01HU6?Description=asus%20g14&cm_re=asus_g14-_-2WC-000N-01HU6-_-Product&quicklink=true')

