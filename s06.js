let http = require("http");
let server = http.createServer(requestHandler);
server.listen(8037);

let headers = {"Content-Type": "Text/Plain"}

function requestHandler(request, response){
    console.log("request-url: ",request.url);
    console.log("request-method: ", request.method)

    console.log("request recived: ", request.url);
    response.writeHeader(200, headers);
    response.write("Hello");
    response.end();
}