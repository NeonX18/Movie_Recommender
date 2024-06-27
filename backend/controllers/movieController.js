const createError = require("http-errors");
const expressAsyncHandler = require("express-async-handler");
const Movies = require("../models/movieModel");
module.exports = {
  getMoviesById: expressAsyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
      throw createError.BadRequest();
    }

    const movie = await Movies.find({ _id: id }).select(
      "-award -__v -tomatoes -lastupdated"
    );

    if (!movie) {
      throw createError.NotFound();
    }

    res.status(200).send(movie);
  }),

  getMovies: expressAsyncHandler(async (req, res) => {
    const { limit, page, genres } = req.query;

    let movies;

    if (genres) {
      movies = await Movies.find({
        poster: { $ne: null },
        "imdb.rating": { $ne: "" },
        genres: genres,
      })
        .select({
          _id: 1,
          title: 1,
          poster: 1,
          genres: 1,
          plot: 1,
          year: 1,
          imdbRating: "$imdb.rating" || 0,
          score: 1,
        })
        .limit(limit || 100)
        .skip(((page || 1) - 1) * (limit || 100));
    } else {
      movies = await Movies.find({
        poster: { $ne: null },
        "imdb.rating": { $ne: "" },
      })
        .select({
          _id: 1,
          title: 1,
          poster: 1,
          genres: 1,
          plot: 1,
          year: 1,
          imdbRating: "$imdb.rating" || 0,
          score: 1,
        })
        .limit(limit || 100)
        .sort({ "imdb.rating": -1 })
        .skip(((page || 1) - 1) * (limit || 100));

      if (!movies) {
        throw createError.NotFound();
      }
    }

    res.status(200).send(movies);
  }),
};
