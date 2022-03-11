const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const userModel = require("../models/User");

router.get("/", (req, res) => {
  userModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

router.post("/new", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = {
      name: req.body.name,
      password: hashedPassword,
      email: req.body.email,
      admin: req.body.admin,
      analysis: req.body.analysis,
    };
    const newUser = new userModel(user);
    await newUser.save();
    res.json(user);
  } catch {
    res.status(500).send();
  }
});

router.post("/users/login", async (req, res) => {
  const userLogin = userModel.find((user) => user.name == req.body.name);
  console.log(userLogin);
  if (userLogin == null) {
    return res.status(400).send("No user with this name...");
  }
  try {
    if (await bcrypt.compare(req.body.password, userLogin.password)) {
      res.send("Successful!");
    } else {
      res.send("Error...");
    }
  } catch (error) {
    res.status(500).send();
    console.log(error);
  }
});

//inloggning kollar om namn och lösenord stämmer TODO
//  app.post('/users/login', async (req, res) => {
//     const userL = userModel.find(user => user.name == req.body.name)
//     if (userL == null) {
//       return res.status(400).send('Cannot find user')
//     }
//     try {
//       if(await bcrypt.compare(req.body.password, userL.password)) {
//         res.send('Success')
//       } else {
//         res.send('Not Allowed');
//       }
//     } catch {
//       res.status(500).send();
//     }
//   });

module.exports = router;
