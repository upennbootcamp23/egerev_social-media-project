let mongooseDB = require("mongoose");
const { MongoClient, ServerApiVersion } = require('mongodb');
let express = require('express');

let application = express();
const PORT = process.env.PORT || 3001;

application.use(express.json());
application.use(express.urlencoded({ extended: true }));
application.use(express.static('public'));

mongooseDB.connect(process.env.MONGODB_URI || "mongodb://localhost/socialmediaDB", {
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {

    await client.connect();

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

    await client.close();
  }
}
run().catch(console.dir);

// log mongo queries being executed
mongooseDB.set("debug", true);

application.use(require('./routes'));

console.log("Connecting...")
application.listen(PORT, () => console.log(`Now LIVE on localhost:${PORT}`));
