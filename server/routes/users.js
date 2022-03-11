const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const userModel = require("../models/User");
const cors = require("cors");
const { json } = require("body-parser");

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
router.post("/", async (req, res) => {
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
  console.log(userLogin);
  if (userLogin == null) {
    const userLogin = userModel.find((user) => user.name == req.body.name);
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

router
  .route("/:id")
  .get((req, res, next) => {
    userModel
      .findOne({
        _id: req.params.id,
      })
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((error) => {
        res.status(404).json({
          error: error,
        });
      });
  })
  .put((req, res, next) => {
    console.log(req.params.id);
    userModel.replaceOne(
      {
        _id: req.params.id,
      },
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        admin: req.body.admin,
      },
      function (err) {
        if (!err) {
          res.send("Successfully updated user!");
        } else {
          res.send(err);
        }
      }
    );
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
