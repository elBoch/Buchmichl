const express = require("express");
const router = express.Router();

router.get("/roomList", (req, res) => {
  res.render("roomList.ejs", {
    pageTitle: "List",
  });
});
module.exports = router;
