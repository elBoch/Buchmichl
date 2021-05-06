const express = require("express");
const router = express.Router();
const client = require("./api").client;
const passwordHash = require("password-hash");


router.get("/login", (req, res) => {
  res.render("login.ejs", {
    pageTitle: "Login",
  });
});

router.post("/register", async (req, res) => {
  console.log(req.body.passwort);
  let hashedPassword = passwordHash.generate(req.body.passwort);
  try {
    const data = await client.query(
      "SELECT COUNT(*) FROM benutzer WHERE username = $1",
      [req.body.username]
    );

    if (data.rows[0].count != 0) {
      res.send("username bereits vergeben");
    } else {
      //default anschriftid immer hinzugefügt
      await client.query(
        "INSERT INTO benutzer (username, passwort, vorname, nachname, geburtsdatum, email, anschriftid) VALUES($1,$2,$3,$4,TO_DATE($5,'DD.MM.YYYY'),$6,6)",
        [req.body.username, hashedPassword,req.body.vorname,req.body.nachname,req.body.date, req.body.email]
      );
      const getUserId = await client.query(
        "SELECT userid FROM benutzer WHERE username = $1",
        [req.body.username]
      );
      console.log(req.body.admin);
      if(req.body.admin==true){
        await client.query(
          "INSERT INTO anbieter (userid,telefonnummer) VALUES($1,$2)",
          [getUserId.rows[0].userid,req.body.telefonnummer]
        );
      }
      res.send("register successed");
    }
  } catch (error) {
    console.log("ERROR:", error);
    res.send("register failed");
  }
});

router.get("/logout",(req,res)=> {
  //req.app.locals.username="";
  res.clearCookie("AUTH-Token");
  res.render("start.ejs", {
    pageTitle: "Login",
    username: "",
    options:"<a id='login'>Login</a>",
  });
});


module.exports = router;
