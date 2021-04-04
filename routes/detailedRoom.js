const express = require("express");
const router = express.Router();
const client = require("./login").client;
let unterkunft;


router.get("/detailedRoom", async (req, res) => {
  const unterkunftView = await client.query(
    "SELECT * FROM unterkunft WHERE unterkunftname=$1",
    [unterkunft]
  );
  const unterkunftData = await client.query(
    "SELECT e.einrichtungsname, ua.unterkunftartname, r.regionname, fa.freizeitausstattungsname, u.sterne, s.sehenswuerdigkeitsname, v.verpflegungname "+
    "FROM einrichtung e INNER JOIN unterkunftseinrichtung ue ON e.einrichtungsid = ue.einrichtungsid "+
                       "INNER JOIN unterkunft u ON ue.unterkunftid = u.unterkunftid "+
                       "INNER JOIN unterkunftart ua ON u.unterkunftartid = ua.unterkunftartid "+
                       "INNER JOIN region r ON r.regionid = u.regionid "+
                       "LEFT OUTER JOIN freizeitausstattungregion far ON far.regionid = r.regionid "+
                       "LEFT OUTER JOIN freizeitausstattung fa ON fa.freizeitausstattungid = far.freizeitausstattungid "+
                       "LEFT OUTER JOIN sehenswuerdigkeiten s ON s.regionid = r.regionid "+
                       "INNER JOIN zimmerartinunterkunft ziu ON ziu.unterkunftid = u.unterkunftid "+
                       "INNER JOIN zimmerverpflegunginunterkunft zviu ON zviu.unterkunftid = ziu.unterkunftid "+
                       "INNER JOIN verpflegung v ON v.verpflegungid = zviu.verpflegungid "+
    "WHERE u.unterkunftname = $1;",
    [unterkunft]
  );

  let einrichtungsString = buildString(unterkunftData.rows, "einrichtungsname");
  let sterneString = buildString(unterkunftData.rows, "sterne");
  let unterkunftartString = buildString(unterkunftData.rows, "unterkunftartname");
  let regionString = buildString(unterkunftData.rows, "regionname");
  let freizeitausstattungString = buildString(unterkunftData.rows,"freizeitausstattungsname");
  let sehenswuerdigkeitString = buildString(unterkunftData.rows,"sehenswuerdigkeitsname");
  let verpflegungString = buildString(unterkunftData.rows,"verpflegungname");

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
    verpflegung: verpflegungString,
  });

  const zimmer = await client.query(
    "SELECT ua.unterkunftartname " +
      "FROM unterkunftart ua INNER JOIN unterkunft u ON u.unterkunftartid = ua.unterkunftartid WHERE u.unterkunftname=$1",
    [unterkunft]
  );
});

router.post("/detailedRoom", (req, res) => {
  unterkunft = req.body.unterkunft;
});

const buildString = (data, type) => {
  const dataSet = new Set();
  for (let i = 0; i < data.length; i++) {
    dataSet.add(data[i][type]);
  }
  const dataArray = [...dataSet];

  let dataString = "";
  for (let i = 0; i < dataArray.length; i++) {
    if(dataArray[i] != null) {
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
