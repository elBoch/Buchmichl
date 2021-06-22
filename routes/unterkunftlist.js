/**
 * Liste aller Unterkünfte nach Filterkriterien holen.
 */

const express = require("express");
const router = express.Router();
const client = require("./api").client;
let checkAuthentication = require("./api").checkAuthentication;

const buildStatement = (req) => {
  let filterStatement = "";
  filterStatement +=
    " SELECT * " +
    "FROM unterkunft u INNER JOIN zimmerartinunterkunft zu ON u.unterkunftid=zu.unterkunftid " +
                      "INNER JOIN zimmer z ON z.zimmerartid = zu.zimmerartid AND z.unterkunftid= zu.unterkunftid " +
                      "INNER JOIN unterkunftart ua ON u.unterkunftartid = ua.unterkunftartid " +
                      "INNER JOIN anschrift a ON u.anschriftid = a.anschriftid "+
                      "INNER JOIN gemeinde g ON a.gemeindeid = g.gemeindeid "+
                      "INNER JOIN region r ON g.regionid = r.regionid " +
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
      " AND r.regionid=(SELECT regionid FROM region WHERE regionname='" +
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
  return filterStatement;
};


router.get("/unterkunftlist", async(req, res) => {
  let check = await checkAuthentication(req,res);
  if (check!="") {
    res.render("unterkunftlist.ejs", {
      pageTitle: "Filter",
      username: check,
      options: "<a id='konto'>Konto</a><a id='logout'>Logout</a> ",
    });
  }
  else{
    res.render("unterkunftlist.ejs", {
      pageTitle: "Filter",
      username: check,
      options: "<a id='login'>Login</a>",
    });
  }
});

router.post("/getUnterkunftList", async(req, res) => {
  const data = await client.query(
    buildStatement(req),
    []
  );
  res.send(data.rows);
});

module.exports = router;
