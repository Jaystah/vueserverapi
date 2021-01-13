const express = require('express')
const router = express.Router();

router.get('/login',(req,res)=>{
    res.json({message: "Logged in!"})
})
router.get('/',(req,res)=>{
    res.redirect('https://google.com')
})

module.exports = router;