const fs = require('fs')
const express = require('express')
const port = process.env.PORT || 1337
const app = express()
app.get('/', respondText)
app.get('/json', respondJson)
app.get('/echo', respondEcho)
app.get('/static/*', respondStatic)
app.listen(port, () => console.log(`Server listening on port ${port}`));

const products = {
    id: 1,
    names: "Laptop Dell",
    price: 1500.00,
    variant: {
        type: "Gamer",
        core: "i7 Core"
    }
}

function respondNotFound(req, res) {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('Page Not Found')

}

function respondText(req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.end('hi')
}

function respondJson(req, res) {
    res.json(products)
}

function respondEcho(req, res) {
    const { input = '' } = req.query
    res.json({
        normal: input,
        shouty: input.toUpperCase(),
        characterCount: input.length,
        backwards: input
            .split('')
            .reverse()
            .join('')
    })
}


function respondStatic(req, res) {
    const filename = `${__dirname}/public/${req.params[0]}`
    fs.createReadStream(filename)
        .on('error', () => respondNotFound(req, res))
        .pipe(res)
}