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
    "SELECT e.einrichtungsname, ua.unterkunftartname, r.regionname, fa.freizeitausstattungsname, u.sterne, s.sehenswuerdigkeitsname FROM einrichtung e INNER JOIN unterkunftseinrichtung ue ON e.einrichtungsid = ue.einrichtungsid INNER JOIN unterkunft u ON ue.unterkunftid = u.unterkunftid INNER JOIN unterkunftart ua ON u.unterkunftid = ua.unterkunftartid INNER JOIN region r ON r.regionid = u.regionid INNER JOIN freizeitausstattungregion far ON far.regionid = r.regionid INNER JOIN freizeitausstattung fa ON fa.freizeitausstattungid = far.freizeitausstattungid INNER JOIN sehenswuerdigkeiten s ON s.regionid = r.regionid WHERE unterkunftname = $1;",
    [unterkunft]
  );
  let einrichtungsString = buildString(unterkunftData.rows, "einrichtungsname");
  let sterneString = buildString(unterkunftData.rows, "sterne");
  let unterkunftartString = buildString(unterkunftData.rows, "unterkunftartname");
  let regionString = buildString(unterkunftData.rows, "regionname");
  let freizeitausstattungString = buildString(unterkunftData.rows,"freizeitausstattungsname");
  let sehenswuerdigkeitString = buildString(unterkunftData.rows,"sehenswuerdigkeitsname");

  res.render("detailedRoom.ejs", {
    pageTitle: "Detail",
    unterkunftname: unterkunftView.rows[0].unterkunftname,
    unterkunftstext: unterkunftView.rows[0].unterkunftstext,
    einrichtungen: einrichtungsString,
    sterne: sterneString,
    unterkunftart: unterkunftartString,
    region: regionString,
    freizeitausstattung: freizeitausstattungString,
    sehenswuerdigkeit: sehenswuerdigkeitString
  });
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
  return dataString;
};

module.exports = router;
