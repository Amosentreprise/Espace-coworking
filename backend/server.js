const http = require("http");
const app = require("./app");
app.set("port", process.env.PORT || 5000);
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

server.listen(PORT, ()=>{console.log(PORT)});
