const express = require('express')
const router = express.Router()
const cors = require('cors')

router.options('/', cors())

router.post('/', cors(), (req, res) => {
    try {
        req.dtsClient.sendMessage(req.body)
        res.json({
            status: 'received',
            msg: 'Успешно передано'
        })
    } catch (err) {
        res.json({
            status: 'failed',
            msg: 'Не удалось передать'
        })
        console.log('Client service is offline.', err)
    }
})

module.exports = router
