const express = require('express')
const router = express.Router()
const cors = require('cors')

router.options('/', cors())
router.post('/', cors(), (req, res) => {
    console.log(req.body)
    res.json({
        status: 'recieved',
        data: req.body
    })
})

router.get('/', cors(), (req, res) => {
    res.json('Welcome to api')
})

module.exports = router
