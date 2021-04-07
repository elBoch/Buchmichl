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
  let hashedPassword = passwordHash.generate(req.body.passw);
  try {
    const data = await client.query(
      "SELECT COUNT(*) FROM benutzer WHERE username = $1",
      [req.body.name]
    );

    if (data.rows[0].count != 0) {
      res.send("username bereits vergeben");
    } else {
      await client.query(
        "INSERT INTO benutzer (username, passwort, vorname, nachname, geburtsdatum, addresse, email, admin) VALUES($1,$2, 'vorname','nachname','01.01.2020','adresse',$3,'false')",
        [req.body.name, hashedPassword, req.body.email]
      );
      res.send("register successed");
    }
  } catch (error) {
    console.log("ERROR:", error);
    res.send("register failed");
  }
});

router.get("/logout",(req,res)=> {
  req.app.locals.username="";
  res.clearCookie("HorwathToken");
  res.render("start.ejs", {
    pageTitle: "Login",
    username: "",
    options:"<a id='login'>Login</a>",
  });
});


module.exports = router;
