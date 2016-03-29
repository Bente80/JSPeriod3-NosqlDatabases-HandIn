/**
 * Created by Bente on 29-03-2016.

 05. Explain, using relevant examples, the strategy for querying MongoDB (all CRUD operations) Demonstrate, using a REST-API, how to perform
     all CRUD operations on a MongoDB.

Here is an example of this. In this example I have used other names and put it up a bit different.
To see the full example look at my own project: 	JSPeriod3Mean1
Here is the link to the code: 	                    https://github.com/Bente80/JSPeriod3Mean1

 */

    var _getallJokes = function(callback){
        var db = connect.get();
        db.collection("jokes").find({}).toArray(function(err,data){     // This is our seach thing
            if(err){
                callback(err);
            }else{
                callback(null,data);
            }
        });
    }

var _getOneJoke = function(id,callback){
    var db = connect.get();
    db.collection("jokes").find({"_id" : ObjectId(id)}).toArray (function(err,data){     // This is our seach thing
        if(err){
            callback(err);
        }else{
            callback(null,data);
        }
    });
}


var _updateOneJoke = function(id, toUpdate,callback){
    var db = connect.get();
    db.collection("jokes").updateOne({"_id": id},toUpdate,function(err,data){
        if(err){
            callback(err);
        }
        else{
            callback(null,'The Joke was succesfully edited'+data);
        }
    });
}

var _createOneJoke = function(theJoke,callback){
    var db = connect.get();
    db.collection("jokes").insertOne(theJoke,function(err,data){
        if(err){
            callback(err);
        }
        else{
            callback(null,'This Joke was succesfully added'+data);
        }
    });
}

var _deleteOneJoke = function(id,callback){
    var db = connect.get();
    db.collection("jokes").deleteOne({"_id": ObjectId(id)}, function(err,data){
        if(err){
            callback(err);
        }
        else{
            callback(null,'Joke was succesfully deleted'+data);
        }
    });
}
