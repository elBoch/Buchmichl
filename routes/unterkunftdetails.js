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
    "FROM einrichtung e LEFT OUTER JOIN unterkunftseinrichtung ue ON e.einrichtungsid = ue.einrichtungsid " +
                       "LEFT OUTER JOIN unterkunft u ON ue.unterkunftid = u.unterkunftid " +
                       "LEFT OUTER JOIN unterkunftart ua ON u.unterkunftartid = ua.unterkunftartid " +
                       "LEFT OUTER JOIN anschrift a ON u.anschriftid = a.anschriftid "+
                       "LEFT OUTER JOIN gemeinde g ON a.gemeindeid = g.gemeindeid "+
                       "LEFT OUTER JOIN region r ON r.regionid = g.regionid " +
                       "LEFT OUTER JOIN freizeitausstattungregion far ON far.regionid = r.regionid " +
                       "LEFT OUTER JOIN freizeitausstattung fa ON fa.freizeitausstattungid = far.freizeitausstattungid " +
                       "LEFT OUTER JOIN sehenswuerdigkeiten s ON s.regionid = r.regionid " +
                       "LEFT OUTER JOIN zimmerartinunterkunft ziu ON ziu.unterkunftid = u.unterkunftid " +
                       "LEFT OUTER JOIN zimmerverpflegunginunterkunft zviu ON zviu.unterkunftid = ziu.unterkunftid " +
                       "LEFT OUTER JOIN verpflegung v ON v.verpflegungid = zviu.verpflegungid " +
    "WHERE u.unterkunftname = $1;",
    [unterkunft]
  );

  let bilder = await client.query(
    "SELECT b.url "+
    "FROM bild b INNER JOIN unterkunft u ON b.unterkunftid = u.unterkunftid "+
    "WHERE u.unterkunftname =$1",
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
      bild1: "<img class='demo w3-opacity w3-hover-opacity-off' src='"+bilder.rows[0].url+"' style='width:100%;cursor:pointer' onclick='currentDiv(1)'>",
      bild2: "<img class='demo w3-opacity w3-hover-opacity-off' src='"+bilder.rows[1].url+"' style='width:100%;cursor:pointer' onclick='currentDiv(2)'>",
      bild3: "<img class='demo w3-opacity w3-hover-opacity-off' src='"+bilder.rows[2].url+"' style='width:100%;cursor:pointer' onclick='currentDiv(3)'>",
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
      bild1: "<img class='demo w3-opacity w3-hover-opacity-off' src='"+bilder.rows[0].url+"' style='width:100%;cursor:pointer' onclick='currentDiv(1)'>",
      bild2: "<img class='demo w3-opacity w3-hover-opacity-off' src='"+bilder.rows[1].url+"' style='width:100%;cursor:pointer' onclick='currentDiv(2)'>",
      bild3: "<img class='demo w3-opacity w3-hover-opacity-off' src='"+bilder.rows[2].url+"' style='width:100%;cursor:pointer' onclick='currentDiv(3)'>",
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
    "SELECT z.zimmerid, z.zimmername, z.preis, z.anzahlpersonen, za.zimmerartname,b.url " +
    "FROM unterkunft u INNER JOIN zimmerartinunterkunft ziu ON u.unterkunftid = ziu.unterkunftid " +
                      "INNER JOIN zimmer z ON ziu.zimmerartid = z.zimmerartid AND ziu.unterkunftid = z.unterkunftid " +
                      "INNER JOIN zimmerart za ON ziu.zimmerartid = za.zimmerartid " +
                      "LEFT OUTER bild b ON z.zimmerid = b.zimmerid "+
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
