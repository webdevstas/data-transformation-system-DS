const express = require('express')
const router = express.Router()
const cors = require('cors')
const socket = require('../providers/socket')

router.options('/', cors())

router.post('/', cors(), (req, res) => {
    try {
        socket.sendMessage(req.body)
        res.json({
            status: 'received',
            msg: 'Успешно передано'
        })
    } catch (err) {
        res.json({
            status: 'failed',
            msg: 'Не удалось передать',
            err
        })
        console.log(err)
    }
})


module.exports = router
