const express = require("express");
const router = express.Router();
const client = require("./api").client;
let checkAuthentication = require("./api").checkAuthentication;
let unterkunft;


router.get("/unterkunftdetails", async (req, res) => {
  const unterkunftView = await client.query(
    "SELECT * FROM unterkunft WHERE unterkunftname=$1",
    [unterkunft]
  );
  const unterkunftData = await client.query(
    "SELECT e.einrichtungsname, ua.unterkunftartname, r.regionname, fa.freizeitausstattungsname, u.sterne, s.sehenswuerdigkeitsname, v.verpflegungname " +
    "FROM einrichtung e INNER JOIN unterkunftseinrichtung ue ON e.einrichtungsid = ue.einrichtungsid " +
                       "INNER JOIN unterkunft u ON ue.unterkunftid = u.unterkunftid " +
                       "INNER JOIN unterkunftart ua ON u.unterkunftartid = ua.unterkunftartid " +
                       "INNER JOIN anschrift a ON u.anschriftid = a.anschriftid "+
                       "INNER JOIN gemeinde g ON a.gemeindeid = g.gemeindeid "+
                       "INNER JOIN region r ON r.regionid = g.regionid " +
                       "LEFT OUTER JOIN freizeitausstattungregion far ON far.regionid = r.regionid " +
                       "LEFT OUTER JOIN freizeitausstattung fa ON fa.freizeitausstattungid = far.freizeitausstattungid " +
                       "LEFT OUTER JOIN sehenswuerdigkeiten s ON s.regionid = r.regionid " +
                       "INNER JOIN zimmerartinunterkunft ziu ON ziu.unterkunftid = u.unterkunftid " +
                       "INNER JOIN zimmerverpflegunginunterkunft zviu ON zviu.unterkunftid = ziu.unterkunftid " +
                       "INNER JOIN verpflegung v ON v.verpflegungid = zviu.verpflegungid " +
    "WHERE u.unterkunftname = $1;",
    [unterkunft]
  );

  let einrichtungsString = buildString(unterkunftData.rows, "einrichtungsname");
  let sterneString = buildString(unterkunftData.rows, "sterne");
  let unterkunftartString = buildString(unterkunftData.rows, "unterkunftartname");
  let regionString = buildString(unterkunftData.rows, "regionname");
  let freizeitausstattungString = buildString(unterkunftData.rows, "freizeitausstattungsname");
  let sehenswuerdigkeitString = buildString(unterkunftData.rows, "sehenswuerdigkeitsname");
  let verpflegungString = buildString(unterkunftData.rows, "verpflegungname");


  let check = await checkAuthentication(req,res);

  if (check!="") {
    res.render("unterkunftdetails.ejs", {
      pageTitle: "Detail",
      username: check,
      options: "<a id='konto'>Konto</a> <a id='logout'>Logout</a> ",
      unterkunftname: unterkunftView.rows[0].unterkunftname,
      unterkunftstext: unterkunftView.rows[0].unterkunftstext,
      einrichtungen: einrichtungsString,
      sterne: sterneString,
      unterkunftart: unterkunftartString,
      region: regionString,
      freizeitausstattung: freizeitausstattungString,
      sehenswuerdigkeit: sehenswuerdigkeitString,
      verpflegung: verpflegungString,
    });
  }
  else {
    res.render("unterkunftdetails.ejs", {
      pageTitle: "Detail",
      username: check,
      options: "<a id='login'>Login</a>",
      unterkunftname: unterkunftView.rows[0].unterkunftname,
      unterkunftstext: unterkunftView.rows[0].unterkunftstext,
      einrichtungen: einrichtungsString,
      sterne: sterneString,
      unterkunftart: unterkunftartString,
      region: regionString,
      freizeitausstattung: freizeitausstattungString,
      sehenswuerdigkeit: sehenswuerdigkeitString,
      verpflegung: verpflegungString,
    });
  }


});

router.post("/unterkunftdetails", (req, res) => {
  unterkunft = req.body.unterkunft;
});

router.post("/getRoomList", async (req, res) => {
  const zimmer = await client.query(
    "SELECT z.zimmername, z.preis, z.anzahlpersonen, za.zimmerartname " +
    "FROM unterkunft u INNER JOIN zimmerartinunterkunft ziu ON u.unterkunftid = ziu.unterkunftid " +
                      "INNER JOIN zimmer z ON ziu.zimmerartid = z.zimmerartid AND ziu.unterkunftid = z.unterkunftid " +
                      "INNER JOIN zimmerart za ON ziu.zimmerartid = za.zimmerartid " +
    "WHERE u.unterkunftname = $1;",
    [unterkunft]
  );
  res.send(zimmer.rows);
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
