//esp to nodejs
var http = require('http');
var url = require("url");

//We need version 2 mongodb application url here
const mongourl = "";
const dbName = "database"; //database name
const collectionName = "collection"; //collection name

//nodejs to mongodb
var assert = require('assert');
const MongoClient = require('mongodb').MongoClient;

//nodejs to mongodb
assert.throws(
    function() {
      throw new Error("Wrong value");
    },
    function(err) {
      if ( (err instanceof Error) && /value/.test(err) ) {
        return true;
      }
    },
    "unexpected error"
  );

//esp to nodejs
var defaultName = "";

//nodejs to mongodb
const client = new MongoClient(mongourl, { useNewUrlParser: true, useUnifiedTopology: true });


//nodejs to mongodb
client.connect(err => {
    const collection = client.db(dbName).collection(collectionName);

    //esp to nodejs
    var server = http.createServer(function (req, res) {

        var urlObj = url.parse(req.url, true);

        if (urlObj['query']['pptomcat123'] != undefined) {
            defaultName = urlObj['query']['pptomcat123'];
            //nodejs to mongodb
            collection.insertOne({ data: String(defaultName)}, { } , function(err, result) {
  });
        }
        res.end();
    });

    //esp to nodejs
    server.listen(process.env.PORT || 5000);
});
