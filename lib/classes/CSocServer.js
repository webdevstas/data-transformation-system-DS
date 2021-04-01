/**
 * @class CSocServer
 * @classdesc Class to create server socket connection
 */
class CSocServer {
    /**
     * @constructor
     * @param {number} port Port for socket connection
     * @param {string} name Will be used for logging
     */
    constructor(port, name) {
        const io = require("socket.io")(port)
        this.name = name
        io.sockets.on("connection", (socket) => {

            console.log(`${this.name} connected!`);

            socket.on("message", (data) => {
                console.log(data)
            });

            socket.on("disconnect", (data) => {
                console.log(`${this.name} disconnected!`)
            });

            this.socket = socket
        });
    }

    /**
     * Sends the data by using socket.send method
     * @param {Object} data
     */
    sendMessage(data) {
        this.socket.send(data)
    }
}

module.exports = CSocServer
