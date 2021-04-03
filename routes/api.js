const express = require('express');
const router = express.Router();
const passwordHash = require("password-hash");

router.get('/checkIfAuthenticated', (req, res) => {
    console.log(req.headers.cookie);
    checkAuthentication(req.headers.cookie);

});

function checkAuthentication(cookie){
    
}
module.exports = router;