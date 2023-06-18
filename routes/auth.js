const router = require("express").Router();
const User = require('../models/User')

//Register
router.post('/register', async (req, res)=>{
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: password
    })
    res.json({
        error: null,
        message: "Respuesta exitosa desde el /register."
    })
})

module.exports = router;