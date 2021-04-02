const express = require('express');
const router = express.Router();
const client = require("./login").client;
let unterkunft;

router.get('/detailedRoom', async (req, res) => {
    const unterkunftView = await client.query(
        "SELECT * FROM unterkunft WHERE unterkunftname=$1",
        [unterkunft]
    );
    const einrichtungen = await client.query(
        "SELECT einrichtungsname FROM einrichtung e INNER JOIN UnterkunftsEinrichtung ue ON e.einrichtungsid = ue.einrichtungsid INNER JOIN unterkunft u ON ue.unterkunftid = u.unterkunftid WHERE unterkunftname = $1",
        [unterkunft]
    );

    //console.log(einrichtungen.rows);
    let einrichtungsString = buildString(einrichtungen.rows,"einrichtungsname");


    res.render("detailedRoom.ejs", {
        pageTitle: "Detail",
        unterkunftname: unterkunftView.rows[0].unterkunftname,
        unterkunftstext: unterkunftView.rows[0].unterkunftstext,
        einrichtungen : einrichtungsString,
    });
});

router.post("/detailedRoom", (req, res) => {
    unterkunft = req.body.unterkunft;

});




function buildString(data,type) {
    //console.log(data)
    let dataString="";
    for (let i = 0; i < data.length; i++) {

        if (i == data.length - 1) {
            dataString += data[i][type];
        }
        else {
            dataString += data[i][type] + ",";
        }
    }
    console.log(dataString);
    return dataString;
}

module.exports = router;