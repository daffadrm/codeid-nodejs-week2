
const http = require('http');
// gunakan querystring untuk parsing stringurl
const querystring = require('querystring')


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



server.listen(port)
console.log(`Server listening on port ${port}`)

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
