const express = require("express");
const router = express.Router();
const client = require("./login").client;
let unterkunft;

router.get("/detailedRoom", async (req, res) => {
  const unterkunftView = await client.query(
    "SELECT * FROM unterkunft WHERE unterkunftname=$1",
    [unterkunft]
  );
  /*const unterkunftData = await client.query(
    "SELECT e.einrichtungsname, ua.unterkunftartname, r.regionname, fa.freizeitausstattungsname, u.sterne, s.sehenswuerdigkeitsname "+
    "FROM einrichtung e INNER JOIN unterkunftseinrichtung ue ON e.einrichtungsid = ue.einrichtungsid "+
                        "INNER JOIN unterkunft u ON ue.unterkunftid = u.unterkunftid "+
                        "INNER JOIN unterkunftart ua ON u.unterkunftartid = ua.unterkunftartid "+
                        "INNER JOIN region r ON r.regionid = u.regionid "+
                        "INNER JOIN freizeitausstattungregion far ON far.regionid = r.regionid "+
                        "INNER JOIN freizeitausstattung fa ON fa.freizeitausstattungid = far.freizeitausstattungid "+
                        "INNER JOIN sehenswuerdigkeiten s ON s.regionid = r.regionid "+
    "WHERE unterkunftname = $1;",
    [unterkunft]
  );*/
  const einrichtungSterne = await client.query(
    "SELECT e.einrichtungsname, u.sterne FROM einrichtung e INNER JOIN unterkunftseinrichtung ue ON e.einrichtungsid = ue.einrichtungsid "+
    "INNER JOIN unterkunft u ON ue.unterkunftid = u.unterkunftid WHERE unterkunftname=$1",
    [unterkunft]
  );
  const unterkunftArt = await client.query(
    "SELECT ua.unterkunftartname "+
    "FROM unterkunftart ua INNER JOIN unterkunft u ON u.unterkunftartid = ua.unterkunftartid WHERE u.unterkunftname=$1",
    [unterkunft]
  );
  /*const region = await client.query(
    "SELECT r.regionname FROM region r INNER JOIN unterkunft u ON r.regionid = u.regionid WHERE unterkunftname=$1",
    [unterkunft]
  );*/
  const regionFreizeitSehens = await client.query(
    "SELECT r.regionname, fa.freizeitausstattungsname, s.sehenswuerdigkeitsname "+
    "FROM region r INNER JOIN freizeitausstattungregion far ON far.regionid = r.regionid "+
                   "INNER JOIN freizeitausstattung fa ON fa.freizeitausstattungid = far.freizeitausstattungid "+
                   "INNER JOIN sehenswuerdigkeiten s ON r.regionid = s.regionid "+
                   "INNER JOIN unterkunft u ON r.regionid = u.regionid WHERE unterkunftname=$1",
    [unterkunft]
  );
  const verpflegung = await client.query(
    "SELECT v.verpflegungname "+
    "FROM verpflegung v INNER JOIN zimmerverpflegunginunterkunft zviu ON v.verpflegungid = zviu.verpflegungid "+
                        "INNER JOIN zimmerartinunterkunft zaiu ON zviu.zimmerartid = zaiu.zimmerartid AND zviu.unterkunftid =zaiu.unterkunftid "+
                        "INNER JOIN unterkunft u ON zaiu.unterkunftid = u.unterkunftid WHERE unterkunftname=$1",
    [unterkunft]
  );

  //console.log(verpflegung.rows);
  let einrichtungsString = buildString(einrichtungSterne.rows, "einrichtungsname");
  let sterneString = buildString(einrichtungSterne.rows, "sterne");
  let unterkunftartString = buildString(unterkunftArt.rows, "unterkunftartname");
  let regionString = buildString(regionFreizeitSehens.rows, "regionname");
  let freizeitausstattungString = buildString(regionFreizeitSehens.rows,"freizeitausstattungsname");
  let sehenswuerdigkeitString = buildString(regionFreizeitSehens.rows,"sehenswuerdigkeitsname");
  let verpflegungString = buildString(verpflegung.rows,"verpflegungname");

  res.render("detailedRoom.ejs", {
    pageTitle: "Detail",
    unterkunftname: unterkunftView.rows[0].unterkunftname,
    unterkunftstext: unterkunftView.rows[0].unterkunftstext,
    einrichtungen: einrichtungsString,
    sterne: sterneString,
    unterkunftart: unterkunftartString,
    region: regionString,
    freizeitausstattung: freizeitausstattungString,
    sehenswuerdigkeit: sehenswuerdigkeitString,
    verpflegung : verpflegungString
  });

  const zimmer = await client.query(
    "SELECT ua.unterkunftartname "+
    "FROM unterkunftart ua INNER JOIN unterkunft u ON u.unterkunftartid = ua.unterkunftartid WHERE u.unterkunftname=$1",
    [unterkunft]
  );

});

router.post("/detailedRoom", (req, res) => {
  unterkunft = req.body.unterkunft;
});

const buildString = (data, type) => {
  let dataString = "";
  for (let i = 0; i < data.length; i++) {
    if (i == data.length - 1) {
      dataString += data[i][type];
    } else {
      if (data[i][type] != data[i + 1][type]) {
        dataString += data[i][type] + ", ";
      }
    }
  }
  if(dataString == ""){
      dataString+="------"
  }
  return dataString;
};

module.exports = router;
