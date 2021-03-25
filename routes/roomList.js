var express = require("express");
var router = express.Router();

router.get("/roomList", (req, res) => {
  res.render("roomList.ejs", {
    pageTitle: "List",
  });
});
module.exports = router;
