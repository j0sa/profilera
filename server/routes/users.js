const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const userModel = require("../models/User");

router.post("/userid", (req, res) => {
  userModel.findOne({ email: req.body.email }).then((user) => {
    res.json(user);
  });
});

router.post("/getAnalyses", (req, res) => {
  userModel.findOne({ _id: req.body._id }).then((user) => {
    res.json(user.analysis);
  });
});

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
router.post("/register", async (req, res) => {
  try {
    const user = {
      name: req.body.name,
      password: await bcrypt.hash(req.body.password, 10),
      email: req.body.email,
      admin: req.body.admin,
      analysis: req.body.analysis,
    };
    const newUser = new userModel(user);
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Successfully inserted user in database!",
      user: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

router.post("/login", (req, res) => {
  userModel.findOne({ email: req.body.email }).then((user) => {
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "This user does not exist." });
    bcrypt.compare(req.body.password, user.password, (err, data) => {
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
  .put(async (req, res, next) => {
    if (req.body.password) {
      userModel.updateOne(
        {
          _id: req.params.id,
        },
        {
          password: await bcrypt.hash(req.body.password, 10),
        },
        function (err) {
          if (!err) {
            res.status(200).json({
              success: true,
              message: "User was successfully updated!",
            });
          } else {
            res.status(401).json({ success: false, message: err });
          }
        }
      );
    } else if (req.body.dataset || req.body.response || req.body.status) {
      userModel.updateOne(
        {
          _id: req.params.id,
        },
        {
          $push: {
            analysis: [
              {
                date: +new Date(),
                dataset: req.body.dataset,
                response: req.body.response,
                status: req.body.status,
              },
            ],
          },
        },
        function (err) {
          if (!err) {
            res.status(200).json({
              success: true,
              message: "Analysis was successfully added.",
            });
          } else {
            res.status(401).json({ success: false, message: err });
          }
        }
      );
    } else {
      userModel.updateOne(
        {
          _id: req.params.id,
        },
        {
          name: req.body.name,
          email: req.body.email,
          admin: req.body.admin,
        },
        function (err) {
          if (!err) {
            res.status(200).json({
              success: true,
              message: "User was successfully updated!",
            });
          } else {
            res.status(401).json({ success: false, message: err });
          }
        }
      );
    }
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
