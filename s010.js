let http = require('http');
let fs = require("fs");
const { text } = require('stream/consumers');
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
    write(response, "hello x", "text");
}

function funcy(response){
    write(response, "hello y", "text");
}

function page1controller(response){
    console.log('inside page1controller');
    write(response,
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
        </html>`, "html");
}

function page2controller(response){
    console.log("inside page2controller 1");
    fs.readFile("./square.html", "utf-8", function(error, data){
        console.log("page2controller 2");
        if(error){
            write(response, "FILE NOT FOUND.", "text");
        }
        else{
            write(response, data, "html");
        }
    })
    console.log("page2controller 3")
}

function fileController(request, response) {
    console.log('fileController 1')
    let fileName = request.url.split('/')[2];
    let extension = fileName.split('.')[1];

    fs.readFile(fileName, function (error, data) {
        console.log('fileController 2');
        if(error){
            write(response, 'FILE NOT FOUND.', 'text')
        }
        else{
            write(response, data, extension);
        }
    })
    console.log('fileController 3')
}

function insertToFileC(request, response, data){
    console.log("inside insertToFile", data);

    fs.readFile("Message.txt", function(error, fileData) {
        if(error){
            write(response, "FILE NOT FOUND.", "text");            
        }
        else{
            fileData = JSON.parse(fileData);
            fileData.data.push(JSON.parse(data));
            fileData = JSON.stringify(fileData);

            fs.writeFile('Message.txt', fileData, 'utf-8', function(error) {
                if(error){
                    write(response, "FS ERROR.", "text");
                }
                else{
                    write(response, "Data Saved.", "text")
                }
            })
        }
        console.log("The file has been saved!");
    });
}

let routes = {
    x: funcx,
    y: funcy,
    page1: page1controller,
    page2: page2controller,
    file: fileController,
    insertToFile: insertToFileC
}
function requestHandler(request, response) {
    let firstPart = request.url.split('/')[1];
    if (firstPart !== 'favicon.ico') {

        let data = "";
        request.on("data", function(chunk){
            data += chunk;
        });
        request.on("end", function(){
            console.log("Data:    ", data);
            try{
                routes[firstPart](request, response, data);
            }
            catch(error){
                console.log("CATCHED ERROR", error);
                write(response, "ERROR... ROUTE NOT FOUND.", "text")
            }
        })
    }
      routes[firstPart](request, response);
    }

    console.log("firstPart ", firstPart);

