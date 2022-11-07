const mongoose = require("mongoose");

const artistSchema = mongoose.Schema(
  {
    bandName: String,
    genres: Array,
    bio: String,

    event: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
    ],

    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    artistImage: String,
  },
  {
    timestamps: true,
  }
);

const Artist = mongoose.model("Artist", artistSchema);

module.exports = { Artist };
