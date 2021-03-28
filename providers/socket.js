const io = require("socket.io")(8100);

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
