require('dotenv').config()
const port = Number(process.env.DS_SOC_PORT)
const io = require("socket.io")(port);

class CMySoc {
    constructor() {
        io.sockets.on("connection", (socket) => {

            console.log("DTS-Client connected!");

            socket.on("message", function (data) {
                console.log(data)
            });

            socket.on("disconnect", function (data) {
                console.log('DTS-Client disconnected!')
            });

            this.socket = socket
        });
    }
    sendMessage(data) {
        this.socket.send(data)
    }
}

const socket = new CMySoc()

module.exports = socket
