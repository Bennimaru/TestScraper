const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser')
const scraper = require('../scraper')


app.use(bodyParser.json())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
})

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))


app.get('/creators', async (req, res) => {

    const creators = [{ name: 'Theirry Henry', img: 'https://' }]

    res.send(creators)
})

app.post('/creators', async (req, res) => {
    const channelData = await scraper.scrapeItem(req.body.input)
    console.log({ channelData })
    res.send('success')
})