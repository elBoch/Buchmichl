const express = require("express");
const router = express.Router();
const client = require("./login").client;
let unterkunft;

router.get("/roomList", async(req, res) => {
  const data = await client.query(
    "SELECT * FROM unterkunft WHERE unterkunftname=$1",
    [unterkunft]
  );

  //console.log(data.rows[0]);

  res.render("roomList.ejs", {
    pageTitle: "List",
    unterkunftname: data.rows[0].unterkunftname,
    unterkunftstext: data.rows[0].unterkunftstext,
  });
});

router.post("/roomList", (req, res) => {
  unterkunft = req.body.unterkunft;
  
});

router.get("/unterkunftDaten",async(req,res)=>{
  
});
module.exports = router;
