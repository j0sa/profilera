const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      admin: {
        type: Boolean,
        required: true,
      },
      analysis: {
          date: {
            type: Date,
            required: false,
          },
          dataset: {
            type: String,
            required: false,
          },
          response: {
            type: String,
            required: false,
          },
          status: {
            type: Number,
            required: false,
          },
      },
});

// UserSchema.pre('save', async function (next) {
//     try {
//         console.log("Running before saving...")
//     } catch (error) {
//         next(error)
//     }
// })

const User = mongoose.model("users", UserSchema);
module.exports = User;