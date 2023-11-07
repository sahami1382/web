let http = require("http");
let port = 8037
let server = http.createServer(requestHandler);
server.listen(port);
console.log("Server is running on port", port)

let headers = {"Content-Type": "Text/Plain"}

let obj = {
    x : function(){
        console.log("how are you?");

        response.writeHeader(200, headers);
        response.write("how are you?");
        response.end();
    },
    y : function(){
        console.log("what are you doing?");

        response.writeHeader(200, headers);
        response.write("what are you doing?");
        response.end();
    },
    "favicon.ico": function(){
        console.log("favicon")

        response.writeHeader(200, headers);
        response.write("Hello");
        response.end();
    }
}
function requestHandler(request, response){

    console.log(request.url.split("/")[1]);
    console.log("request-method: ", request.method)

    response.writeHeader(200, headers);
        response.write("Hello");
        response.end();

}
