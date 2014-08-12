var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var Connection = require('mongodb').Connection;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;


TrainingsProvider = function (host, port) {
	this.db= new Db('trainings-table', new Server(host, port, {safe: false}, {auto_reconnect: true}, {}));
  	this.db.open(function(){});
};

TrainingsProvider.prototype.getCollection = function(callback) {
	this.db.collection('trainings', function(error, trainings_collection) {
    if( error ) callback(error);
    else callback(null, trainings_collection);
  });
};

TrainingsProvider.prototype.findAll = function(callback) {
    this.getCollection(function(error, trainings_collection) {
      if( error ) callback(error)
      else {
        trainings_collection.find().toArray(function(error, results) {
          if( error ) callback(error)
          else callback(null, results)
        });
      }
    });
};

TrainingsProvider.prototype.findBasedOnParamsPassed = function(trainingType, callback){
  this.getCollection(function(error,trainings_collection){
    if (error) {callback(error)}
      else{
        console.log("trainingType "+ trainingType)
        trainings_collection.find({id: trainingType.toString()}, function(error, results){
          if (error) {
            callback(error);
            console.log("error"+ error);
          }
          else{
            console.log("success")
            results.toArray(function(error, results) {
              if( error ) callback(error)
              else callback(null, results)
            });
           
          }
        })
      }
  })
}

TrainingsProvider.prototype.save = function(trainings, callback) {
    this.getCollection(function(error, trainings_collection) {
        console.log("saving method")
      if( error ) callback(error)
      else {
        if( typeof(trainings.length)=="undefined")
          trainings = [trainings];

        for( var i =0;i< trainings.length;i++ ) {
          training = trainings[i];
         // training.created_at = new Date();
        }
      //  console.log("Get collection no error",trainings_collection );
        trainings_collection.insert(trainings, function() {
          callback(null, trainings);
        });
      }
    });
};

TrainingsProvider.prototype.findById = function(id, callback){
  this.getCollection(function(error, trainings_collection){
    if (error) {callback(error)}
      else{
        trainings_collection.findOne({_id:trainings_collection.db.bson_serializer.ObjectID.createFromHexString(id)}, function(error, result){
          if( error ) callback(error)
          else callback(null, result)
        });
      }
  })
}

TrainingsProvider.prototype.update = function(id,updatedTraining, callback){
this.getCollection(function(error, trainings_collection){
  if (error) {callback(error)}
    else{
      trainings_collection.update({_id: trainings_collection.db.bson_serializer.ObjectID.createFromHexString(id)},updatedTraining, function(error,result){
        if (error) {callback(error)}
          else callback(null,result)
      })
    }
})
}

TrainingsProvider.prototype.delete = function(id, callback){
  this.getCollection(function(error, trainings_collection){
    if (error) {callback(error)}
      else{
        trainings_collection.remove({
          _id:trainings_collection.db.bson_serializer.ObjectID.createFromHexString(id)        }, function(error, result){
            if (error) {callback(error)}
              else   callback(null, result);
          })
      }
  })
}
exports.TrainingsProvider = TrainingsProvider;