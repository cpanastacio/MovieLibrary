const { Schema, model } = require("mongoose");

const movieSchema = new Schema(
  {
    title: { type: String, required: true },
    year: { type: Date, required: true },
    released: { type: Date, required: true },
    genre: { type: String, required: true },
    plot: { type: String, required: true },
    poster: { type: String, required: true },
    rating: { type: Array, required: true },
    type: { type: String, required: true },
    totalSeasons: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model("Movie", movieSchema);
