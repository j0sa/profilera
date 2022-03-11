const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const userModel = require("../models/User");
const cors = require("cors");

router.get("/", (req, res) => {
  userModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

// EMAIL IS UNIQUE
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

router.post("/login", async (req, res) => {
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

// router.get("/:id", cors(), async (req, res) => {
//   var id = req.params.id;
//   userModel.find({ _id: id }, function (err, users) {
//     if (err) res.send(err);
//     //console.log(id);
//     res.json(users);
//   });
// });

// router.get("/delete/:id", cors(), async (req, res) => {
//   var id = req.params.id;
//   userModel.findByIdAndDelete({ _id: id }, function (err) {
//     if (err) return res.send(500, err);
//     console.log(`User: ${id} was deleted...`);
//     res.redirect("/users");
//   });
// });

router
  .route("/:id")
  .get((req, res, next) => {
    userModel
      .findOne({
        _id: req.params.id,
      })
      .then((thing) => {
        res.status(200).json(thing);
      })
      .catch((error) => {
        res.status(404).json({
          error: error,
        });
      });
  })
  .put((req, res, next) => {
    const user = new userModel({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
      admin: req.body.admin,
      analysis: req.body.analysis,
    });
    userModel
      .updateOne({ _id: req.params.id }, user)
      .then(() => {
        res.status(201).json({
          message: "User updated successfully!",
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  })
  .delete((req, res, next) => {
    userModel
      .deleteOne({ _id: req.params.id }) // deleteOne() is used to delete a single document, findOneAndDelete() returns the deleted document after having deleted it (in case you need its contents after the delete operation)
      .then(() => {
        res.status(200).json({
          message: "User Was deleted!",
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  });

module.exports = router;
