const express = require('express');
const router = express.Router();
let checkAuthentication = require("./api").checkAuthentication;
const client = require("./api").client;
let unterkunft,zimmer,preis;

router.get('/zimmerdetails', async(req, res) => {
    
    const zimmerData = await client.query(
                "SELECT z.preis, z.anzahlpersonen, za.zimmerartname, v.verpflegungname, u.unterkunftname, u.unterkunftstext, zas.ausstattungsname "+
                "FROM unterkunft u INNER JOIN zimmerartinunterkunft ziu ON u.unterkunftid = ziu.unterkunftid "+
                                  "INNER JOIN zimmer z ON ziu.zimmerartid = z.zimmerartid AND ziu.unterkunftid = z.unterkunftid " +
                                  "INNER JOIN zimmerart za ON ziu.zimmerartid = za.zimmerartid " + 
                                  "LEFT OUTER JOIN zimmerverpflegunginunterkunft zvi ON zvi.unterkunftid = ziu.unterkunftid " +
                                  "LEFT OUTER JOIN verpflegung v ON v.verpflegungid = zvi.verpflegungid " +
                                  "LEFT OUTER JOIN zimmerausstattunginunterkunft zaiu ON zaiu.zimmerartid = ziu.zimmerartid AND zaiu.unterkunftid = ziu.unterkunftid " +
                                  "LEFT OUTER JOIN zimmerausstattung zas ON zas.ausstattungid = zaiu.ausstattungid " +
                "WHERE u.unterkunftname = $1 AND z.zimmername=$2 AND z.preis=$3; ",
                [unterkunft,zimmer,preis]
      );

      let verpflegungString = buildString(zimmerData.rows, "verpflegungname");
      let ausstattungString = buildString(zimmerData.rows, "ausstattungsname");

    let check = await checkAuthentication(req,res);
    if (check!="") {
        res.render('zimmerdetails.ejs', {
            username: check,
            options: "<a id='konto'>Konto</a> <a id='logout'>Logout</a> ",
            zimmername: unterkunft+" - "+zimmer,
            zimmertext: zimmerData.rows[0].unterkunftstext,
            preis: zimmerData.rows[0].preis+" €",
            anzahlpersonen: zimmerData.rows[0].anzahlpersonen,
            verpflegung: verpflegungString,
            zimmerart: zimmerData.rows[0].zimmerartname,
            zimmerausstattung: ausstattungString,
        });
    }
    else {
    res.render('zimmerdetails.ejs', {
        username: check,
        options: "<a id='login'>Login</a>",
        zimmername: unterkunft+" - "+zimmer,
        zimmertext: zimmerData.rows[0].unterkunftstext,
        preis: zimmerData.rows[0].preis+" €",
        anzahlpersonen: zimmerData.rows[0].anzahlpersonen,
        verpflegung: verpflegungString,
        zimmerart: zimmerData.rows[0].zimmerartname,
        zimmerausstattung: ausstattungString,
    });
}
});

router.post("/zimmerdetails", (req, res) => {
    unterkunft = req.body.unterkunft;
    zimmer = req.body.zimmer.split(",")[0];
    preis = req.body.zimmer.split(",")[1];
    res.send("yeah");
  });


  buildString = (data, type) => {
    const dataSet = new Set();
    for (let i = 0; i < data.length; i++) {
      dataSet.add(data[i][type]);
    }
    const dataArray = [...dataSet];
  
    let dataString = "";
    for (let i = 0; i < dataArray.length; i++) {
      if (dataArray[i] != null) {
        if (i == dataArray.length - 1) {
          dataString += dataArray[i];
        } else {
          dataString += dataArray[i] + ", ";
        }
      }
    }
    if (dataString == "") {
      dataString += "------";
    }
    return dataString;
  };
module.exports = router;

