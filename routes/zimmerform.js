const express = require("express");
const router = express.Router();
const client = require("./api").client;
let checkAuthentication = require("./api").checkAuthentication;
const upload = require("./api").upload;

router.get("/zimmerform", async (req, res) => {
  let check = await checkAuthentication(req, res);

  let unterkuenfte = await getUnterkunft(check);
  let zimmerarten = await getFormData("zimmerart");
  let zimmerausstattung = await getFormData("zimmerausstattung");
  let verpflegung = await getFormData("verpflegung");

  if (check != "") {
    res.render("zimmerform.ejs", {
      pageTitle: "Start",
      username: check,
      options: "<a id='konto'>Konto</a> <a id='logout'>Logout</a> ",
      unterkunft: unterkuenfte,
      zimmerart: zimmerarten,
      zimmerausstattung: zimmerausstattung,
      verpflegung: verpflegung,
    });
  } else {
    res.render("start.ejs", {
      pageTitle: "Start",
      username: check,
      options: "<a id='login'>Login</a>",
    });
  }
});


router.post("/createZimmer", async (req, res) => {
  //inserts
  try {
    let getZimmerartInUnterkunft = await client.query(
      "SELECT * FROM zimmerartinunterkunft zu INNER JOIN unterkunft u ON zu.unterkunftid = u.unterkunftid " +
        "INNER JOIN zimmerart za ON zu.zimmerartid = za.zimmerartid " +
        "WHERE u.unterkunftname=$1 AND za.zimmerartname=$2;",
      [req.body.unterkunftname, req.body.zimmerart]
    );
    //console.log(getZimmerartInUnterkunft.rows.length);
    if (getZimmerartInUnterkunft.rows.length == 0) {
      const getZimmerartId = await client.query(
        "SELECT zimmerartid FROM zimmerart WHERE zimmerartname=$1;",
        [req.body.zimmerart]
      );

      const getUnterkunftId = await client.query(
        "SELECT unterkunftid FROM unterkunft WHERE unterkunftname=$1;",
        [req.body.unterkunftname]
      );
      //console.log(getZimmerartId.rows[0]);
      const insertZimmerartInUnterkunft = await client.query(
        "INSERT INTO zimmerartinUnterkunft (zimmerartid,unterkunftid) " +
          "VALUES ($1,$2);",
        [
          getZimmerartId.rows[0].zimmerartid,
          getUnterkunftId.rows[0].unterkunftid,
        ]
      );
      const insertZimmer = await client.query(
        "INSERT INTO zimmer (zimmername, zimmerartid, unterkunftid,preis,anzahlpersonen) " +
          "VALUES ($1,$2,$3,$4,$5);",
        [
          req.body.zimmername,
          getZimmerartId.rows[0].zimmerartid,
          getUnterkunftId.rows[0].unterkunftid,
          req.body.preis,
          req.body.personen,
        ]
      );
    } else {
      const insertZimmer = await client.query(
        "INSERT INTO zimmer (zimmername, zimmerartid, unterkunftid,preis,anzahlpersonen) " +
          "VALUES ($1,$2,$3,$4,$5);",
        [
          req.body.zimmername,
          getZimmerartInUnterkunft.rows[0].zimmerartid,
          getZimmerartInUnterkunft.rows[0].unterkunftid,
          req.body.preis,
          req.body.personen,
        ]
      );
    }

    //nochmals für die optionalen Daten einzufügen
    getZimmerartInUnterkunft = await client.query(
      "SELECT * " +
        "FROM zimmerartinunterkunft zu INNER JOIN unterkunft u ON zu.unterkunftid = u.unterkunftid " +
        "INNER JOIN zimmerart za ON zu.zimmerartid = za.zimmerartid " +
        "WHERE u.unterkunftname=$1 AND za.zimmerartname=$2;",
      [req.body.unterkunftname,req.body.zimmerart]
    );

    let verpflegungen = new Array();
    try {
      for (let i = 0; i < req.body.verpflegung.length; i++) {
        const getVerpflegungId = await client.query(
          "SELECT verpflegungid FROM verpflegung WHERE verpflegungname = $1;",
          [req.body.verpflegung[i]]
        );
        verpflegungen.push(getVerpflegungId.rows[0]);
      }
      for (let i = 0; i < verpflegungen.length; i++) {
        try {
          const insertVerpflegungen = await client.query(
            "INSERT INTO zimmerverpflegunginunterkunft (verpflegungid, zimmerartid, unterkunftid) " +
              "VALUES ($1,$2,$3);",
            [
              verpflegungen[i].verpflegungid,
              getZimmerartInUnterkunft.rows[0].zimmerartid,
              getZimmerartInUnterkunft.rows[0].unterkunftid,
            ]
          );
        } catch (err) {
          //nicht schlimm nur key error
        }
      }
    } catch (err) {
      //keine vorhanden ist ok
    }

    let ausstattungen = new Array();
    try {
      for (let i = 0; i < req.body.verpflegung.length; i++) {
        const getAusstattungId = await client.query(
          "SELECT ausstattungid FROM zimmerausstattung WHERE ausstattungsname = $1;",
          [req.body.zimmerausstattung[i]]
        );
        ausstattungen.push(getAusstattungId.rows[0]);
      }
      for (let i = 0; i < ausstattungen.length; i++) {
        try {
          const insertAusstatungen = await client.query(
            "INSERT INTO zimmerausstattunginunterkunft (ausstattungid, zimmerartid, unterkunftid) " +
              "VALUES ($1,$2,$3);",
            [
              ausstattungen[i].ausstattungid,
              getZimmerartInUnterkunft.rows[0].zimmerartid,
              getZimmerartInUnterkunft.rows[0].unterkunftid,
            ]
          );
        } catch (err) {
          //nicht schlimm nur key error
        }
      }
    } catch (err) {
      //keine vorhanden ist ok
    }
    //console.log("dufhgfgjoidfghj");
    res.send("success");
  } catch (err) {
    res.send("unsuccess");
  }
});

async function getUnterkunft(name) {
  let htmlData = "";
  let data = await client.query(
    "SELECT  unterkunftname " +
      "FROM unterkunft u INNER JOIN anbieter a ON u.userid = a.userid " +
      "INNER JOIN benutzer b ON a.userid = b.userid " +
      "WHERE b.username = $1;",
    [name]
  );

  for (let i = 0; i < data.rows.length; i++) {
    htmlData += "<option>" + data.rows[i].unterkunftname + "</option>";
  }
  return htmlData;
}
async function getFormData(type) {
  let htmlData = "";
  let data;
  switch (type) {
    case "zimmerart":
      data = await client.query("SELECT zimmerartname FROM zimmerart");
      for (let i = 0; i < data.rows.length; i++) {
        htmlData += "<option>" + data.rows[i].zimmerartname + "</option>";
      }
      break;

    case "zimmerausstattung":
      data = await client.query(
        "SELECT ausstattungsname FROM zimmerausstattung"
      );
      for (let i = 0; i < data.rows.length; i++) {
        htmlData +=
          '<div class="input-checkbox equipment-tag"><div class="checkbox-form"><input type="checkbox" class="zimmercheckboxen" id="' +
          data.rows[i].ausstattungsname +
          '" />&nbsp;</div><div class="chekbox-form"><p class="styled-p">' +
          data.rows[i].ausstattungsname +
          "</p></div></div>";
      }
      break;
    case "verpflegung":
      data = await client.query("SELECT verpflegungname FROM verpflegung");
      for (let i = 0; i < data.rows.length; i++) {
        htmlData +=
          '<div class="input-checkbox equipment-tag"><div class="checkbox-form"><input type="checkbox" class="verpflegungcheckboxen" id="' +
          data.rows[i].verpflegungname +
          '" />&nbsp;</div><div class="chekbox-form"><p class="styled-p">' +
          data.rows[i].verpflegungname +
          "</p></div></div>";
      }
      break;
  }
  return htmlData;
}
module.exports = router;
