require('dotenv').config()
const createError = require('http-errors')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const CSocServer = require('./lib/classes/CSocServer')
const CSocClient = require('./lib/classes/CSocClient')
const express = require('express')
const dtsClient = new CSocServer(process.env.DS_SOC_PORT, 'DTS-Client')
const tbsServer = new CSocClient(process.env.TBS_URL, 'TBS-Server')

/**
 * Telegram Bot Server Listeners
 */

// Transmit the message to Data Transformation Server
tbsServer.on('message', (data) => {
    try {
        dtsClient.sendMessage(data)
        console.log('Message success provided to Data Transformation Server')
    } catch (err) {
        console.log(`${dtsClient.name} is offline.`, err)
    }
})

/**
 * Express middlewares
 */
const webRouter = require('./routes/web')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

//routes
app.use('/api/web', (req, res, next) => {
    // Transmit the dtsClient instance to use in rout
    req.dtsClient = dtsClient
    next()
}, webRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.json(JSON.stringify(err))
});

module.exports = app
