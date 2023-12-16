const http = require('http');
const fs = require('fs');


const hostname = '127.0.0.1';
const port = 3000;

const index = fs.readFileSync('./index.html')
const home = fs.readFileSync('./home.html')
const about= fs.readFileSync('./about.html')
const service = fs.readFileSync('./services.html')
const contact = fs.readFileSync('./contact.html')

const server = http.createServer((req,res)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    res.end(home);

});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});