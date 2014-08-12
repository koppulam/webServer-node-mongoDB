var express=require('express');
var http = require('http');

// Use this flag to enable/disable the CORS
var enableCORS = true;

//Middleware: Allows cross-domain requests (CORS)
var allowCrossDomain = function(req, res, next) {
	if(enableCORS){
    	if (req.method.toUpperCase() === "OPTIONS"){
 
      	// When dealing with CORS (Cross-Origin Resource Sharing)
        // requests, the client should pass-through its origin (the
        // requesting domain). We should either echo that or use *
        // if the origin was not passed.
        var origin = (req.headers.origin || "*");
        
        console.log('method:' + req.method);
        console.log('origin:' + origin);
 
        // Echo back the Origin (calling domain) so that the
        // client is granted access to make subsequent requests
        // to the API.
        res.writeHead(
            "204",
            "No Content",
            {
    	       "access-control-allow-origin": origin,
            	"access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
                "access-control-allow-headers": "content-type, accept",
                "access-control-max-age": 10, // Seconds.
                "content-length": 0
            }
        );
 
        // End the response - we're not sending back any content.
        return( res.end() ); 
        }
	}

    next();
}


var app = express();
app.use(express.bodyParser());
app.use(allowCrossDomain);
app.use(app.router);

/*app.all('*', function(req, res, next){

    var origin = (req.headers.origin || "*");
        
    console.log('method:' + req.method);
    console.log('origin:' + origin);
     
    // Create a response body to echo back the incoming
    // request.
    var responseBody = (
        "Thank You For The Cross-Domain AJAX Request:\n\n" +
        "Method: " + req.method + "\n\n" 
    );
 
    // Send the headers back. Notice that even though we
    // had our OPTIONS request at the top, we still need
    // echo back the ORIGIN in order for the request to
    // be processed on the client.
    var headers = {
        "content-type": "text/plain",
        "content-length": responseBody.length
    };
	if(enableCORS){
        headers["access-control-allow-origin"] = "*";
    }
                
    res.writeHead(
        "200",
        "OK",
        headers
    );
                
    // Close out the response.
	return( res.end( responseBody ) );
});
*/
var fs = require('fs');

function readJSONFile(filename, callback) {
  fs.readFile(filename,'utf8', function (err, data) {
    if(err) {
      callback(err);
      return;
    }
    try {
      callback(null, data);
    } catch(exception) {
      callback(exception);
    }
  });
}

app.post('/myPost', function(req, res, next){
    var origin = (req.headers.origin || "*");
        
    console.log('method:' + req.method);
    console.log('origin:' + origin);

var responseBody = (
        "Thank You For The Cross-Domain AJAX Request:\n\n" +
        "Method: " + req.method + "\n\n" 
    );

// Send the headers back. Notice that even though we
    // had our OPTIONS request at the top, we still need
    // echo back the ORIGIN in order for the request to
    // be processed on the client.
  
   var content =  fs.readFileSync('jsonData/config.json','utf8');
   console.log(content);
   /*   readJSONFile('jsonData/config.json', function (err, json) {
          if(err) { throw err; }
          console.log(json);
        });     */    
        responseBody = (content); 
          var headers = {
        "content-type": "text/plain",
        "content-length": responseBody.length
    };
    if(enableCORS){
        headers["access-control-allow-origin"] = "*";
    }
    res.writeHead(
        "200",
        "OK",
        headers
    );
                
    // Close out the response.
    return( res.end( responseBody ) );
});


app.post('/addContent', function(req, res, next){
    var origin = (req.headers.origin || "*");
        
    console.log('method:' + req.method);
    console.log('origin:' + origin);
console.log(req.body);
var responseBody = (
        "Thank You For The Cross-Domain AJAX Request:\n\n" +
        "Method: " + req.method + "\n\n" 
    );
// Send the headers back. Notice that even though we
    // had our OPTIONS request at the top, we still need
    // echo back the ORIGIN in order for the request to
    // be processed on the client.
  
   var content =  fs.readFileSync('jsonData/config.json','utf8');
   console.log(content);
   /*   readJSONFile('jsonData/config.json', function (err, json) {
          if(err) { throw err; }
          console.log(json);
        });     */    
        responseBody = (content); 
          var headers = {
            "content-type": "text/plain",
            "content-length": responseBody.length
        };
    if(enableCORS){
        headers["access-control-allow-origin"] = "*";
    }
    res.writeHead(
        "200",
        "OK",
        headers
    );
                
    // Close out the response.
    return( res.end( responseBody ) );
});

var TrainingsProvider = require('./database/trainingsProvider').TrainingsProvider;
var trainingsProvider = new TrainingsProvider('localhost', 27017);

app.post('/add/Training', function (req,res,next) {
    // body...
     var origin = (req.headers.origin || "*");
     var responseBody = (
        "Thank You For The Cross-Domain AJAX Request:\n\n" +
        "Method: " + req.method + "\n\n" 
    );
     var new_training = new Object();
     new_training = req.body.obj;
      trainingsProvider.save({
       name:  req.body.obj.name,
       id: req.body.obj.id,
       registrationLink: req.body.obj.registrationLink,
       dateFrom: req.body.obj.dateFrom,
       dateTo: req.body.obj.dateTo,
       location: req.body.obj.location,
       contact: req.body.obj.contact,
       No_Of_hours: req.body.obj.No_Of_hours,
       typeOfTraining: req.body.obj.typeOfTraining,
     },function(error, docs){
      //  console.log(error);
     })
     trainingsProvider.findAll(function(error, trainingsList){
        console.log(trainingsList);
        responseBody = JSON.stringify(trainingsList);
        var headers = {
            "content-type": "text/plain",
            "content-length": responseBody.length
        };
     if(enableCORS){
        headers["access-control-allow-origin"] = "*";
    }
    res.writeHead(
        "200",
        "OK",
        headers
    );
                
    // Close out the response.
    return( res.end( responseBody ) );
     })
      
});
app.post('/TrainingsProvider/getTrainingByType', function(req,res,next){
    var origin = (req.headers.origin || "*");
    var responseBody = (
        "Thank You For The Cross-Domain AJAX Request:\n\n" +
        "Method: " + req.method + "\n\n" 
    );  
     trainingsProvider.findBasedOnParamsPassed(req.body.id,function(error, trainingsList){
        console.log(trainingsList);
        responseBody = JSON.stringify(trainingsList);
        var headers = {
            "content-type": "text/plain",
            "content-length": responseBody.length
        };
        if(enableCORS){
            headers["access-control-allow-origin"] = "*";
        }
        res.writeHead(
            "200",
            "OK",
            headers
        );
                
        // Close out the response.
        return( res.end( responseBody ) );
         });
})
app.post('/getAllTrainings', function(req,res,next){
   var origin = (req.headers.origin || "*");
    var responseBody = (
        "Thank You For The Cross-Domain AJAX Request:\n\n" +
        "Method: " + req.method + "\n\n" 
    );  

    trainingsProvider.findAll(function(error, trainingsList){
        console.log(trainingsList);
        responseBody = JSON.stringify(trainingsList);
        var headers = {
            "content-type": "text/plain",
            "content-length": responseBody.length
        };
        if(enableCORS){
            headers["access-control-allow-origin"] = "*";
        }
        res.writeHead(
            "200",
            "OK",
            headers
        );
                
        // Close out the response.
        return( res.end( responseBody ) );
     });
})
app.post('/update/TrainingsProvider', function(req, res, next){
    var origin = (req.headers.origin || "*");
    var responseBody = (
        "Thank You For The Cross-Domain AJAX Request:\n\n" +
        "Method: " + req.method + "\n\n" 
    );
    trainingsProvider.update(req.body._id,{
        name:  req.body.name,
       id:  req.body.id,
       registrationLink:  req.body.registrationLink,
       dateFrom: req.body.dateFrom,
       dateTo: req.body.dateTo,
       location: req.body.location,
       contact: req.body.contact,
       No_Of_hours: req.body.No_Of_hours,
       typeOfTraining: req.body.typeOfTraining
    }, function(error, docs){
        console.log(error);
    })
    trainingsProvider.findAll(function(error, trainingsList){
        console.log(trainingsList);
        responseBody = JSON.stringify(trainingsList);
        var headers = {
            "content-type": "text/plain",
            "content-length": responseBody.length
        };
        if(enableCORS){
            headers["access-control-allow-origin"] = "*";
        }
        res.writeHead(
            "200",
            "OK",
            headers
        );
                
        // Close out the response.
        return( res.end( responseBody ) );
     });
})
app.post('/TrainingsProvider/delete', function(req, res, next){
 var origin = (req.headers.origin || "*");
    var responseBody = (
        "Thank You For The Cross-Domain AJAX Request:\n\n" +
        "Method: " + req.method + "\n\n" 
    );
    trainingsProvider.delete(req.body._id, function(error, docs){
        console.log(error);
    });
     trainingsProvider.findAll(function(error, trainingsList){
        console.log(trainingsList);
        responseBody = JSON.stringify(trainingsList);
        var headers = {
            "content-type": "text/plain",
            "content-length": responseBody.length
        };
        if(enableCORS){
            headers["access-control-allow-origin"] = "*";
        }
        res.writeHead(
            "200",
            "OK",
            headers
        );
                
        // Close out the response.
        return( res.end( responseBody ) );
     });
})
http.createServer(app).listen(8888);
console.log("web service is listening on 8088 with CORS " + (enableCORS ? "enabled" : "disabled"));