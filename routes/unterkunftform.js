const express = require('express');
const router = express.Router();
const client = require("./api").client;
let checkAuthentication = require("./api").checkAuthentication;
const upload = require("./api").upload;
const storage = require("./api").storage;
const path = require('path')

router.get('/unterkunftform', async (req, res) => {
    let check = await checkAuthentication(req, res);
    let regionen = await getFormData("regionen");
    let unterkunftarten = await getFormData("unterkunftart");
    let freizeitausstattungen = await getFormData("freizeitausstattungen");
    let unterkunftausstattungen = await getFormData("unterkunftausstattungen");

    //if (check != "") {
    res.render('unterkunftform.ejs', {
        pageTitle: 'Start',
        username: check,
        options: "<a id='konto'>Konto</a> <a id='logout'>Logout</a> ",
        region: regionen,
        unterkunftart: unterkunftarten,
        freizeitausstattung: freizeitausstattungen,
        unterkunftausstattung: unterkunftausstattungen,
    });
    /*}
    else {
        res.render('start.ejs', {
            pageTitle: 'Start',
            username: check,
            options: "<a id='login'>Login</a>",
        });
    }*/
});

router.post('/upload', upload.array('avatar'), (req, res) => {
    //const insertImages = await client.query("INSERT INTO image (...");
    
    console.log(req.files[0]['filename']);
    return res.json({status: 'OK', uploaded: req.files.length});
});

router.post("/createUnterkunft", async (req, res) => {
    //Insert Statements
    let check = await checkAuthentication(req, res);
    try {
        const getRegionId = await client.query(
            "SELECT regionid " +
            "FROM region " +
            "WHERE regionname = $1;",
            [req.body.region]
        );

        let gemeindeValid = await client.query("SELECT COUNT(*) FROM gemeinde WHERE gemeindename=$1;", [req.body.ort]);
        if (gemeindeValid == 0) {
            const insertLocation = await client.query(
                "INSERT INTO gemeinde (gemeindename, postleitzahl,regionid) " +
                "VALUES ($1,$2,$3);",
                [req.body.ort, req.body.plz, getRegionId.rows[0].regionid]
            );
        }

        const getGemeindeId = await client.query(
            "SELECT gemeindeid FROM gemeinde WHERE gemeindename=$1;", [req.body.ort]
        );

        const insertAddress = await client.query(
            "INSERT INTO anschrift (strasse, hausnummer,gemeindeid) " +
            "VALUES ($1,$2,$3);",
            [req.body.strasse, req.body.nummer, getGemeindeId.rows[0].gemeindeid]
        );
        //daten für die unterkunfttabelle
        const getAnschriftId = await client.query(
            "SELECT anschriftid FROM anschrift WHERE strasse=$1 AND hausnummer=$2 AND gemeindeid=$3;",
            [req.body.strasse, req.body.nummer, getGemeindeId.rows[0].gemeindeid]
        );
        const getUnterkunftartId = await client.query(
            "SELECT unterkunftartid FROM unterkunftart WHERE unterkunftartname=$1;",
            [req.body.unterkunftart]
        );

        let einrichtungen = new Array();
        let freizeitausstattungId = new Array();
        try{
        for (let i = 0; i < req.body.unterkunftausstattung.length; i++) {
            const getEinrichtungId = await client.query(
                "SELECT einrichtungsid FROM einrichtung WHERE einrichtungsname = $1;",
                [req.body.unterkunftausstattung[i]]
            );
            einrichtungen.push(getEinrichtungId.rows[0]);
        }
        
        for (let i = 0; i < req.body.freizeitausstattung.length; i++) {
            const getFreizeitausstattungId = await client.query(
                "SELECT freizeitausstattungid FROM freizeitausstattung WHERE freizeitausstattungsname = $1;",
                [req.body.freizeitausstattung[i]]
            );
            freizeitausstattungId.push(getFreizeitausstattungId.rows[0]);
        }
    }
    catch(err){

    }
        //unändern
        //check = "hormad17";
        let getUserId = await client.query(
            "SELECT a.userid " +
            "FROM anbieter a INNER JOIN benutzer b ON a.userid = b.userid " +
            "WHERE b.username = $1;",
            [check]
        );

        const insertUnterkunft = await client.query(
            "INSERT INTO unterkunft (unterkunftname,unterkunftstext,unterkunftartid,sterne,userid,anschriftid) " +
            "VALUES ($1,$2,$3,$4,$5,$6);",
            [req.body.unterkunftname, req.body.unterkunftbeschreibung, getUnterkunftartId.rows[0].unterkunftartid,
            req.body.sterne, getUserId.rows[0].userid, getAnschriftId.rows[0].anschriftid]
        );

        const getUnterkunftId = await client.query(
            "SELECT unterkunftid FROM unterkunft WHERE unterkunftname=$1 AND sterne=$2 AND unterkunftstext=$3;",
            [req.body.unterkunftname, req.body.sterne, req.body.unterkunftbeschreibung]
        );

        for (let i = 0; i < einrichtungen.length; i++) {
            const insertEinrichtungsunterkunft = await client.query(
                "INSERT INTO unterkunftseinrichtung (einrichtungsid, unterkunftid) " +
                "VALUES ($1,$2);",
                [einrichtungen[i].einrichtungsid, getUnterkunftId.rows[0].unterkunftid]
            );
        }
        for (let i = 0; i < freizeitausstattungId.length; i++) {
            const insertFreizeitausstattungsregion = await client.query(
                "INSERT INTO freizeitausstattungregion (freizeitausstattungid, regionid) " +
                "VALUES ($1,$2);",
                [freizeitausstattungId[i].freizeitausstattungid, getRegionId.rows[0].regionid]
            );
        }
        res.send("success");
    }
    catch (err) {
        res.send("unsuccess");
    }
    //console.log("funzt");

});



async function getFormData(type) {
    let htmlData = "";
    let data;
    switch (type) {
        case "regionen":
            data = await client.query("SELECT regionname FROM region;");
            for (let i = 0; i < data.rows.length; i++) {
                htmlData += '<option>' + data.rows[i].regionname + '</option>';
            }
            break;
        case "unterkunftart":
            data = await client.query("SELECT unterkunftartname FROM unterkunftart");
            for (let i = 0; i < data.rows.length; i++) {
                htmlData += '<option>' + data.rows[i].unterkunftartname + '</option>';
            }
            break;
        case "freizeitausstattungen":
            data = await client.query("SELECT freizeitausstattungsname FROM freizeitausstattung");
            for (let i = 0; i < data.rows.length; i++) {
                htmlData += '<div class="input-checkbox equipment-tag"><div class="checkbox-form"><input type="checkbox" class="freizeitcheckboxen" id="' + data.rows[i].freizeitausstattungsname + '" />&nbsp;</div><div class="chekbox-form"><p class="styled-p">' + data.rows[i].freizeitausstattungsname + '</p></div></div>';
            }
            break;
        case "unterkunftausstattungen":
            data = await client.query("SELECT einrichtungsname FROM einrichtung");
            for (let i = 0; i < data.rows.length; i++) {
                htmlData += '<div class="input-checkbox equipment-tag"><div class="checkbox-form"><input type="checkbox" class="unterkunftcheckboxen" id="' + data.rows[i].einrichtungsname + '" />&nbsp;</div><div class="chekbox-form"><p class="styled-p">' + data.rows[i].einrichtungsname + '</p></div></div>';
            }
            break;
    }

    return htmlData;

}

module.exports = router;