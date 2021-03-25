const express = require("express");
const router = express.Router();
const db1 = require("./login").client;
let filterStatement = "";

const buildStatement = (req) => {
  filterStatement +=
    " SELECT * " +
    "FROM unterkunft u INNER JOIN zimmerartinunterkunft zu ON u.unterkunftid=zu.unterkunftid " +
    "INNER JOIN zimmer z ON z.zimmerartid = zu.zimmerartid AND z.unterkunftid= zu.unterkunftid " +
    "INNER JOIN unterkunftart ua ON u.unterkunftartid = ua.unterkunftartid " +
    "INNER JOIN region r ON u.regionid = r.regionid " +
    "WHERE z.preis BETWEEN " +
    req.body.preis_von +
    " AND ";

  if (req.body.preis_bis != "") {
    filterStatement += req.body.preis_bis;
  } else {
    filterStatement += "1000000";
  }
  if (req.body.sterne != "Egal") {
    filterStatement += " AND u.sterne=" + req.body.sterne;
  }
  if (req.body.region != "") {
    filterStatement +=
      " AND u.regionid=(SELECT regionid FROM region WHERE regionname='" +
      req.body.region +
      "')";
  }
  if (req.body.anz_pers != "") {
    filterStatement += " AND z.anzahlpersonen=" + req.body.anz_pers;
  }
  if (req.body.unterkunftart != "Egal") {
    filterStatement +=
      " AND ua.unterkunftartname = '" + req.body.unterkunftart + "'";
  }

  filterStatement += " ORDER BY u.unterkunftid;";
};

router.get("/filter", (req, res) => {
  res.render("filter.ejs", {
    pageTitle: "Filter",
    data: "nothing",
  });
});

router.post("/getUnterkunftList", (req, res) => {
  buildStatement(req);
  db1
    .query(filterStatement)
    .then((data) => {
      console.log(data);
      res.send(data.rows);
      filterStatement = "";
    })
    .catch((error) => {
      console.log("ERROR:", error);
    });
});

module.exports = router;
