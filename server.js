let mongooseDB = require("mongoose");
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

// log mongo queries being executed
mongooseDB.set("debug", true);

application.use(require('./routes'));

console.log("Connecting...")
application.listen(PORT, () => console.log(`Now LIVE on localhost:${PORT}`));
