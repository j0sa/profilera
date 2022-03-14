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
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  userModel.findOne({ email }).then((user) => {
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "This user does not exist." });
    bcrypt.compare(password, user.password, (err, data) => {
      if (err) throw err;
      if (data) {
        return res
          .status(200)
          .json({ success: true, message: "Login success." });
      } else {
        return res
          .status(401)
          .json({ success: false, message: "Invalid credentials." });
      }
    });
  });
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
        res.status(400).json({
          success: false,
          message: error,
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
          res
            .status(200)
            .json({ success: true, message: "User was successfully updated!" });
        } else {
          res.status(401).json({ success: false, message: err });
        }
      }
    );
  })
  .delete((req, res, next) => {
    userModel
      .deleteOne({ _id: req.params.id }) // deleteOne() is used to delete a single document, findOneAndDelete() returns the deleted document after having deleted it (in case you need its contents after the delete operation)
      .then(() => {
        res.sendStatus(200).json({
          success: true,
          message: "User Was deleted!",
        });
      })
      .catch((error) => {
        res.status(400).json({
          success: false,
          message: error,
        });
      });
  });

module.exports = router;
