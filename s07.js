let http = require('http');
let fs = require("fs");
let port = 8037;
let server = http.createServer(requestHandler);
server.listen(port)
console.log("Srver is running on port:", port)

let headers = {
    text: {'Content-Type': 'Text/Plain'},
    html: {'Content-Type': 'Text/Html'}
};

function funcx(response){
    console.log("this is x");
    response.writeHead(200, headers);
    response.write("hello xxxxxx 4");
    response.end();
}

function funcy(response){
    console.log("this is y");
    response.writeHead(200, headers);
    response.write("hello yyyyyyyy 4");
}

function page1controller(response){
    console.log('inside page1controller');
    response.writeHead(200, headers.html);
    response.write(
        `<html>
            <head>
            <style>
                .square{
                width: 200px;
                height: 202px;
                background-color: lightgreen;
            }
            </style>
            </head>
            <body>
                <div class = "square"></div>
            </body>
        </html>`);
    response.end();
}

function page2controller(response){
    console.log("inside page2controller 1");
    fs.readFile("./square.html", "utf-8", function(error, data){
        console.log("page2controller 2");
        console.log("page2controller 2 error", error);
        console.log("page2controller 2 data", data);
    })
    console.log("page2controller 3")
}

let obj = {
    x: funcx,
    y: funcy,
    page1: page1controller,
    page2: page2controller
}

let routes = {
    x: funcx,
    y: funcy,
    page1: page1controller,
    page2: page2controller
}
function requestHandler(request, response) {
    let firstPart = request.url.split('/')[1];
    if (firstPart !== 'favicon.ico') {
      obj[firstPart](response);
    }
  }