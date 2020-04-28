const puppeteer = require('puppeteer')

async function scrapeItem(url) {

    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto(url)

    const [itemPic] = await page.$x('//*[@id="img"]')
    const src = await itemPic.getProperty('src')
    const srcText = await src.jsonValue()

    const [itemName] = await page.$x('//*[@id="text-container"]')
    const text = await itemName.getProperty('textContent')
    const name = await text.jsonValue()
    const trimName = await name.trim()

    console.log({ trimName, srcText })

    browser.close()

    return { trimName, srcText }
}

scrapeItem('https://www.youtube.com/channel/UCUT8RoNBTJvwW1iErP6-b-A')


module.exports = {
    scrapeItem
}