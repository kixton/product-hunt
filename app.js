var express = require('express');
var app = express();
var request = require('request');

app.use(express.static(__dirname + '/static'));

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
 });

app.all('/api/', function (req, res) {
  console.log(req.query.url);
  var requestUrl = "https://api.producthunt.com/" + req.query.url;
  console.log(requestUrl);


  var options = {
      url: requestUrl,
      headers: {
          'Authorization': 'Bearer ***REMOVED***'      },
      rejectUnauthorized: false
  };

  request(options, function (error, response, body) {
    if(error){
      console.log(error);
    }else{
      res.status(response.statusCode);
      res.send(response.body);
    }
  });
  
});

var server = app.listen(4000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});