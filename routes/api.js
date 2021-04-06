const express = require('express');
const router = express.Router();
const client = require("./login").client;

const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);


const passwordHash = require("password-hash");



/*router.get('/checkIfAuthenticated', async (req, res) => {
    try {
        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        let decrypted = decipher.update(req.cookies['HorwathToken'] + "", 'hex', 'utf8');

        decrypted = decrypted + decipher.final('utf8');

        let daten = decrypted.split(",");

        const user = await client.query(
            "SELECT passwort FROM benutzer WHERE username=$1;",
            [daten[0]]
        );


        if (passwordHash.verify(daten[1], user.rows[0].passwort)) {
            req.app.locals.authenticated = true;
            req.app.locals.username = daten[0];
        }
        else {
            req.app.locals.authenticated = false;
            req.app.locals.username = "";
        }
    }
    catch (err) {
        req.app.locals.authenticated = false;
        req.app.locals.username = "";
    }
    res.send("finished");
    //console.log("in api" + req.app.locals.authenticated);

});*/


router.post("/authenticate", async (req, res) => {
    try {
        const data = await client.query(
            "SELECT passwort FROM benutzer WHERE username=$1",
            [req.body.name]
        );
        if (passwordHash.verify(req.body.passw, data.rows[0].passwort)) {


            let cipher = crypto.createCipheriv(algorithm, key, iv);
            let cookieHash = cipher.update(req.body.name + "," + req.body.passw);
            //console.log("nach update encrypt: "+cookieHash);
            cookieHash = Buffer.concat([cookieHash, cipher.final()]);
            cookieHash = cookieHash.toString('hex');


            //console.log(cookieHash);
            res.cookie('HorwathToken', cookieHash, { maxAge: 900000, httpOnly: true });
            //console.log('cookie created successfully');

            res.send({ query: "ok" });
        } else {
            res.send({ query: "nicht ok" });
        }
    } catch (error) {
        res.send({ query: "nicht ok" });
    }
});

module.exports = router;

module.exports.checkAuthentication = async function checkIfAuthenticated(req,res){
    try {
        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        let cookieData = req.cookies['HorwathToken'];
        
        let decrypted = decipher.update(cookieData + "", 'hex', 'utf8');

        decrypted = decrypted + decipher.final('utf8');
        

        let daten = decrypted.split(",");

        const user = await client.query(
            "SELECT passwort FROM benutzer WHERE username=$1;",
            [daten[0]]
        );


        if (passwordHash.verify(daten[1], user.rows[0].passwort)) {
            req.app.locals.username = daten[0];
            return true;
            
        }
        else {
            req.app.locals.username = "";
            return false;
        }
    }
    catch (err) {
        req.app.locals.username = "";
        return false;
    }
}