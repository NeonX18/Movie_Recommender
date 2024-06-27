const { MongoClient } = require('mongodb');
const Express = require('express');
const BodyParser = require('body-parser');
const Cors = require('cors');

// Initialize MongoDB client
const client = new MongoClient('mongodb+srv://ash22kk:ash22ash@cluster0.u4x7kgr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
});

const server = Express();
server.use(BodyParser.json());
server.use(BodyParser.urlencoded({ extended: true }));
server.use(Cors());

function adjustScoresAndSort(results) {
    results.forEach(item => {
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
server.get("/search", async (request, response) => {
    try {
        await client.connect();
        const database = client.db("sample_mflix");
        const coll = database.collection("movies");

        const agg = [
            {
                $search: {
                    index: "autocomplete",
                    autocomplete: {
                        query: `${request.query.term}`,
                        path: "title",
                        fuzzy: {
                            maxEdits: 2,
                            prefixLength: 3,
                            maxExpansions: 100
                        }
                    },
                }
            },
            {
                $addFields: {
                    customScore: {
                        $switch: {
                            branches: [
                                { case: { $eq: ["$title", request.query.term] }, then: 5 },
                                {
                                    case: {
                                        $regexMatch: {
                                            input: "$title",
                                            regex: new RegExp(`^${request.query.term}`, "i")
                                        }
                                    },
                                    then: 0.2
                                }
                            ],
                            default: 0
                        }
                    }
                }
            },
            {
                $addFields: {
                    score: { $add: ["$customScore", { $meta: "searchScore" }] }
                }
            },
            {
                $project: {
                    _id: 0,
                    title: 1,
                    score: 1,
                    imdbRating: "$imdb.rating" || 0,
                    year: 1
                }
            },
            { $sort: { score: -1 } },
            { $limit: 40 }
        ];

        const result = await coll.aggregate(agg).toArray();
        const adjustedResults = adjustScoresAndSort(result);
        response.send(adjustedResults);
        console.log(adjustedResults);
    } catch (e) {
        console.error(e);
        response.status(500).send({ message: e.message });
    } finally {
        await client.close();
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
