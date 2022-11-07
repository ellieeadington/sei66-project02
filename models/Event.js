const mongoose = require("mongoose");

// schema
const eventSchema = mongoose.Schema(
  {
    name: String,
    venue: String,
    addressLine1: String,
    city: String,
    postcode: String,
    date: Date,
    month: String,
    monthYear: String,
    description: String,
    artist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artist",
      },
    ],

    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    eventPhoto: String,
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = { Event };
