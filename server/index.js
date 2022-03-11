require('dotenv').config({
    path: '../.env',
    debug: true
});
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userModel = require("./models/Users");
const cors = require("cors");
const bcrypt = require('bcrypt');

const port = process.env.PORT || 5000;
const databaseURI = process.env.DATABASE_URI;

app.use(express.json());
app.use(cors());

mongoose.connect(databaseURI);

 app.get("/getUsers", (req, res) => {
    userModel.find({}, (err, result) =>{
         if (err) {
            res.json(err);
         } else {
            res.json(result);
         }
     });
 });

 //skapar en användare med hashad lösenord
 app.post("/createUser", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = { name: req.body.name, password: hashedPassword, 
                       email: req.body.email, admin: req.body.admin,
                       analysis: req.body.analysis};
        const newUser = new userModel(user);
        await newUser.save();
        res.json(user);
    } catch {
        res.status(500).send();
    } 
 });

app.post('/users/login', async (req, res) => {
    const userLogin = userModel.find(user => user.name == req.body.name);
    console.log(userLogin);
    if (userLogin == null) {
        return res.status(400).send('No user with this name...');
    };
    try {
        if(await bcrypt.compare(req.body.password, userLogin.password)) {
            res.send('Successful!')
        } else {
            res.send('Error...')
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

app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
});