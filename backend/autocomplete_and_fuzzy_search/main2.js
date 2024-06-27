const {MongoClient} = require('mongodb'); 
const Express = require('express');
const BodyParser = require('body-parser');
const Cors = require('cors');

const client =new MongoClient('mongodb+srv://ash22kk:ash22ash@cluster0.dt031fp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
const server = Express();
server.use(BodyParser.json());
server.use(BodyParser.urlencoded({ extended: true }));
server.use(Cors());
var collection;
function adjustScoresAndSort(results) {
    results.forEach(item => {
        const imdbRating = item.imdbRating || 1;
        item.year = item.year || 1980;
        item.score = item.score + imdbRating / 20;
        item.score = Math.round(item.score * 10000) / 10000;
    });
    results.sort((a, b) => {
        if (a.score === b.score) {
            return b.year - a.year; // If scores are tied, newer movies come first
        }
        return b.score - a.score; // Otherwise, sort by score
    });

    return results;
}
server.get("/search", async(request, response) => {
    try {
        const database = client.db("sample_mflix");
        const coll = database.collection("movies");

const agg = [
    {
      $search: {
        index: "autocomplete-tutorial", // Ensure this index is created in your MongoDB Atlas collection
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
      $project: {
        _id: 0,
        title: 1,
        score: {$meta: "searchScore"},
        imdbRating: 1,
        year: 1
      }
    },
    { 
      $sort: { 
        score: -1,
      } 
    },
    { $limit: 200 }
  ];
  
const result = await coll.aggregate(agg).toArray();
const adjustedResults = adjustScoresAndSort(result);
response.send(adjustedResults);
console.log(adjustedResults);

} catch (e) {
  response.status(500).send({message :e.message});
}
});
const PORT = process.env.PORT || 3000; 
server.listen(PORT, async() => {
try{
  await client.connect();
  collection = client.db('sample_mflix').collection('movies');
} catch(e){
  console.error(e);
}
});