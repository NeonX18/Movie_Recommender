
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
server.get("/search", async(request, response) => {
    try {
        const database = client.db("sample_mflix");
        const coll = database.collection("movies");

        const agg = [
          {
            $search: {
              index: "autocomplete-tutorial",
              autocomplete: { query: `${request.query.term}`, path: "title", fuzzy: { maxEdits: 1 }}
            }
          },
          {
            $project: {
              _id: 0,
              title: 1,
              score: {
                $switch: {
                  branches: [
                    { case: { $eq: ["$title", request.query.term] }, then: 10 },
                    { case: { $regexMatch: { input: "$title", regex: `^${request.query.term}`, options: "i" } }, then: 5 },
                    { 
                      case: { 
                        $regexMatch: { 
                          input: "$title", 
                          regex: `${request.query.term}`, 
                          options: "i" 
                        } 
                      }, 
                      then: { 
                        $add: [ 
                          2, 
                          { $divide: [{ $subtract: [{ $strLenCP: "$title" }, { $indexOfCP: ["$title", request.query.term] }] }, { $strLenCP: "$title" }] }
                        ]
                      }
                    },
                    { case: { $eq: [{ $substrCP: ["$title", 0, 1] }, request.query.term[0]] }, then: 1 },
                  ],
                  default: 0
                }
              }
            }
          },
          { $sort: { score: -1 } },
          { $limit: 20 }
        ];

        const result = await coll.aggregate(agg).toArray();

        response.send(result);
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