const { MongoClient } = require("mongodb");
const createError = require("http-errors");
const { movieQueryCheckSchema } = require("../middlewares/validation");
const expressAsyncHandler = require("express-async-handler");
// Initialize MongoDB client
const client = new MongoClient(process.env.MONGO_URI);

function adjustScoresAndSort(results) {
  results.forEach((item) => {
    // Default values if missing
    const imdbRating = item.imdbRating || 1;
    item.year = item.year || 1980;
    item.score = item.score + imdbRating / 20;

    // Round score to 4 decimal places
    item.score = Math.round(item.score * 100) / 100;
  });

  // Sort by score and then by year if scores are tied
  results.sort((a, b) => {
    if (a.score === b.score) {
      return b.year - a.year;
    }
    return b.score - a.score;
  });
  return results;
}

// Search endpoint
const fuzzySearchResults = expressAsyncHandler(async (request, response) => {
  let result;
  try {
    result = await movieQueryCheckSchema.validateAsync(request.query);
  } catch (error) {
    if (error.isJoi === true) {
      throw createError.UnprocessableEntity(error.details[0].message);
    }
    throw createError.BadRequest();
  }

  const title = result.query;
  let { limit } = result.limit;

  limit = Number(limit);
  if(limit==="" || limit === undefined || isNaN(limit)) {
    limit = 25
  }

  if(!title){
    throw createError.BadRequest();
  }


  try {
    await client.connect();
    const database = client.db(process.env.DB_NAME);
    const coll = database.collection("movies");

    const agg = [
      {
        $search: {
          index: "autocomplete",
          autocomplete: {
            query: `${title}`,
            path: "title",
            fuzzy: {
              maxEdits: 2,
              prefixLength: 3,
              maxExpansions: 100,
            },
          },
        },
      },
      {
        $addFields: {
          customScore: {
            $switch: {
              branches: [
                { case: { $eq: ["$title", title] }, then: 5 },
                {
                  case: {
                    $regexMatch: {
                      input: "$title",
                      regex: new RegExp(`^${title}`, "i"),
                    },
                  },
                  then: 0.2,
                },
              ],
              default: 0,
            },
          },
        },
      },
      {
        $addFields: {
          score: { $add: ["$customScore", { $meta: "searchScore" }] },
        },
      },

      {
        $project: {
          _id: 1,
          title: 1,
          poster: 1,
          genres: 1,
          plot: 1,
          year: 1,
          imdbRating: "$imdb.rating" || 0,
          score: 1,
        },
      },

      { $sort: { score: -1 } },
      { $limit: limit },
    ];

    const result = await coll.aggregate(agg).toArray();
    const adjustedResults = adjustScoresAndSort(result);

    response.status(200).send(adjustedResults);
  } catch (e) {
    // console.error(e);
    response.status(500).send({ message: e.message });
  } finally {
    await client.close();
  }
});

module.exports = fuzzySearchResults;
