const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      minlength: [3],
      maxlength: [99],
    },
    lastName: {
      required: true,
      type: String,
      minlength: [3],
      maxlength: [99],
    },

    emailAddress: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlenth: [6],
    },
    profileType: {
      type: String,
      required: true,
    },
    event: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
    image: String,
  },
  {
    timestamps: true,
  }
);

userSchema.methods.verifyPassword = function (password) {
//   console.log("password from User: " + password);
//   console.log("password from db: " + this.password);
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
