const express = require('express');
const router = express.Router();

const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const passwordHash = require("password-hash");

const { Client } = require("pg");
const client = new Client({
  connectionString:
    "postgres://kkrxjxdhduntnc:ae8b79d1199e4142793100aebdb647e15711b5e0e2bca190b7e8875b8f64590b@ec2-54-72-155-238.eu-west-1.compute.amazonaws.com:5432/d9k5kpg39ia48r",
  ssl: {
    rejectUnauthorized: false,
  },
});


client.on("error", (er) => console.log);
client.connect();



router.post("/authenticate", async (req, res) => {
    try {
        const data = await client.query(
            "SELECT passwort FROM benutzer WHERE username=$1",
            [req.body.name]
        );
        /*const data2 = await client.query(
            "UPDATE benutzer SET passwort = $1 WHERE username='hormad17'",
            [passwordHash.generate(data.rows[0].passwort)]
        );
        const data3 = await client.query(
            "SELECT passwort FROM benutzer WHERE username=$1",
            [req.body.name]
        );*/

        if (passwordHash.verify(req.body.passw, data.rows[0].passwort)) {


            let cipher = crypto.createCipheriv(algorithm, key, iv);
            let cookieHash = cipher.update(req.body.name + "," + req.body.passw);
            //console.log("nach update encrypt: "+cookieHash);
            cookieHash = Buffer.concat([cookieHash, cipher.final()]);
            cookieHash = cookieHash.toString('hex');


            //console.log(cookieHash);
            res.cookie('AUTH-Token', cookieHash, { maxAge: 900000, httpOnly: true });
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
module.exports.client = client;

module.exports.checkAuthentication = async function checkIfAuthenticated(req,res){
    try {
        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        let cookieData = req.cookies['AUTH-Token'];
        
        let decrypted = decipher.update(cookieData + "", 'hex', 'utf8');

        decrypted = decrypted + decipher.final('utf8');
        

        let daten = decrypted.split(",");

        const passw = await client.query(
            "SELECT passwort FROM benutzer WHERE username=$1;",
            [daten[0]]
        );


        if (passwordHash.verify(daten[1], passw.rows[0].passwort)) {
            //req.app.locals.username = daten[0];
            return daten[0];
            
        }
        else {
            //req.app.locals.username = "";
            return "";
        }
    }
    catch (err) {
        //req.app.locals.username = "";
        return "";
    }
}