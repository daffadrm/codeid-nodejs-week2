// load http module & disimpan di variable http, 
// require adalah global function di nodejs
// http library adalah core module,artinya kita bisa load via require
const http = require('http')

// kita tentukan port untuk listening webserver,
// setiap request dari browser akan dihandle di port 1337
// process ada global object
const port = process.env.PORT || 1337

// create httpserver object
//res => untuk send data back to browser
const server = http.createServer(function (req, res) {
    res.end('hi gaez')
})

server.listen(port)
console.log(`Server listening on port ${port}`)