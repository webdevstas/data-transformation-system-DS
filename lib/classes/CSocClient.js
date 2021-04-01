/**
 * @class CSocClient
 * @classdesc Class to create client socket connection
 */
class CSocClient {
    /**
     * @constructor
     * @param {string} url Server url
     * @param {string} name Will be used for logging
     */
    constructor(url, name) {
        this.socket = require("socket.io-client")(url)
        this.name = name

        this.on('connect', () => {
            console.log(`${this.name} connected!`)
        })

        this.on('disconnect', () => {
            console.log(`${this.name} disconnected!`)
        })
    }

    /**
     * Sends the data by using socket.send method
     * @param {Object} data
     */
    sendMessage(data) {
        this.socket.send(data)
    }

    /**
     * Wrapper function around this.socket.on()
     * @param {string} event
     * @param {function} callback
     */
    on(event, callback) {
        this.socket.on(event, callback)
    }
}

module.exports = CSocClient
