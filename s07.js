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

function write(response, body, type){
    response.writeHead(200, headers[type]);
    response.write(body);
    response.end();
}

function funcx(response){
    response.writeHead(200, headers);
    response.write("hello xxxxxx 4");
    response.end();
}

function funcy(response){
    response.writeHead(200, headers);
    response.write("hello yyyyyyyy 4");
    response.end();
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
        if(error){
            response.writeHead(200, headers.text);
            response.write("ERROR 404");
            response.end();
        }
        else{
            response.writeHead(200, headers.html);
            response.write(data);
            response.end();
        }
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

function requestHandler2(request, response) {
    console.log('url ', request.url);
    console.log('splitted ', request.url.split('/'));
    let firstPart = request.url.split('/')[1];

    if (firstPart !== "favicon.ico") {
        console.log('firstPart')
    }

}