/**
 * Created by cshihadeh on 3/17/2015.
 */
var express = require('express');
var router = express.Router();
var xml2js = require('xml2js').parseString;
var http=require("http");
var newsRss="http://feeds.alwatanvoice.com/ar/palestine.xml";


/* GET users listing. */
router.get('/', function(req, res, next) {
  //  res.send('respond with a resource');
    console.log("Request Received for 'news' was called.");
   // res.writeHead(200,{"Content-Type":"application/json; charset=utf-8"});
    var xml='',json;

    req=http.get(newsRss,function(response){
        response.on('data', function (chunk){
            xml += chunk;
        });
        response.on('end', function () {
            // convert xml to json
            //    console.log(xml);
            xml2js(xml, function (err, result) {
                json = JSON.stringify(result);
                //   console.log("json = " + json);

                res.send(json);
                res.end();
            });
        });
    });

});

module.exports = router;