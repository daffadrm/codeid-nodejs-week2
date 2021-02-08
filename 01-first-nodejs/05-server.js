
const http = require('http');

const querystring = require('querystring')

const fs = require('fs');


const port = process.env.PORT || 1337

const products = {
    id: 1,
    names: "Laptop Dell",
    price: 1500.00,
    variant: {
        type: "Gamer",
        core: "i7 Core"
    }
}

const server = http.createServer(function (req, res) {
    if (req.url === '/') return respondText(req, res)
    if (req.url === '/json') return respondJson(req, res)
    if (req.url.match(/^\/echo/)) return respondEcho(req, res)
    if (req.url.match(/^\/static/)) return respondStatic(req, res)

    respondNotFound(req, res)

});



function respondText(req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.end('hi gaez')
}

function respondJson(req, res) {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(products))
}

function respondNotFound(req, res) {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('Page Not Found')

}


/**
 * createReadStream => create a stream object, representing file
 * pipe =>  method pipe akan load data from local storage to browser
 * on => method listen for an error
 * file yg ada di folder public akan di maaping menjadi static di browser
 */
function respondStatic(req, res) {
    const filename = `${__dirname}/public${req.url.split('/static')[1]}`
    fs.createReadStream(filename)
        .on('error', () => respondNotFound(req, res))
        .pipe(res); 

}





// destructuring array
function respondEcho(req, res) {
    const { input = '' } = querystring.parse(
        req.url
            .split('?')
            .slice(1)
            .join('')
    )
    res.setHeader('Content-Type', 'application/json')
    res.end(
        JSON.stringify({
            yourInput: input,
            upper: input.toUpperCase(),
            stringLength: input.length,
            reverse: input
                .split('')
                .reverse()
                .join('')
        })
    )
}


server.listen(port)
console.log(`Server listening on port ${port}`)