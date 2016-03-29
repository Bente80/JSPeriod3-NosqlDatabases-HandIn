/**
 * Created by Bente on 25-03-2016.

07.	Explain the benefits from using Mongoose, and provide an example involving all CRUD operations

This example just show how to make CRUD operations with mongoose, but does not work here.
This class uses the file user.js included in this project.

 Mongoose is an object modeling tool for MongoDB and Node.js, somehow similar to a ORM tool as we know.
 The reason why there are benefits of using Mongoose, is that it provides a straight-forward, schema-based solution
 for modeling your application data and includes, out of the box:
    o	Schemas
    o	Built-in type casting
    o	Validation (also include with plain MongoDB as of v. 3.2)
    o	Query building
    o	Business logic hooks (middleware)
This all makes it quicker and easier to make a database than just using MongoDB.

Another reason is, that Mongoose allows us to have access the MongoDB commands for CRUD simply and easily.

Futhermore Mongoose offers more functionality (one of them is being an ODM (Object Document Mapping)).

Mongoose also adds in some necessary data manipulation functions and it works as a layer to be used for
future additions (plugins) , rather than messing with the source of MongoDB itself.

With mongoose, you also got update, delete, validation framework, support for custom middleware etc.

Links: 		http://js2016.azurewebsites.net/mongoose/mongoose.html#2
            https://www.quora.com/Node-js/Whats-the-advantages-of-using-MongoDB-Mongoose
            https://www.airpair.com/javascript/complete-expressjs-nodejs-mongodb-crud-skeleton
            https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications

 */

var User = require('./model/user');

var tomBrady = new User({
    name: 'Tom Brady',
    username: 'tomBrady',
    password: 'new12England'
});

var newUser = User({
    name: 'Bente Andersen',
    username: 'ba',
    password: 'scoopee87Doo',
    admin: true
});

newUser.save(function (err) {
    if (err) {
        throw err;
    }
    console.log('User created!');
});

tomBrady.dudify(function (err, name) {
    if (err) {
        throw err;
    }
    console.log('Your new name is: ' + name);
});

tomBrady.save(function (err) {
    if (err) {
        throw err;
    }
    console.log('User saved successfully!');
});


//find all
User.find({}, function (err, users) {
    if (err) {
        throw err;
    }
    console.log(users);
});

//find one
User.find({username: 'ba'}, function (err, user) {
    if (err) {
        throw err;
    }
    console.log(user);
});

//find by id
User.findbyId(1, function (err, user) {
    if (err) {
        throw err;
    }
    console.log(user);
});

// get any admin that was created in the past month

// get the date 1 month ago
var monthAgo = new Date();
monthAgo.setMonth(monthAgo.getMonth() - 1);

User.find({admin: true}).where('created_at').gt(monthAgo).exec(function (err, users) {
    if (err) {
        throw err;
    }
    console.log(users);
});

//update - GET A USER, THEN UPDATE
User.findbyId(1, function (err, user) {
    if (err) {
        throw err;
    }
    user.location = 'uk';

    user.save(function (err) {
        if (err) {
            throw err;
        }
        console.log('User successfully updated!');
    });
});

//update - FIND AND UPDATE
User.findOneAndUpdate({username: 'ba'}, {username: 'benteA'}, function (err, user) {
    if (err) {
        throw err;
    }
    console.log(user);
});

//update - FIND BY ID AND UPDATE
User.findByIdAndUpdate(4, {username: 'benteA'}, function (err, user) {
    if (err) {
        throw err;
    }
    console.log(user);
});

//delete - GET A USER, THEN REMOVE
User.find({username: 'ba'}, function (err, user) {
    if (err) {
        throw err;
    }
    user.remove(function (err) {
        if (err) {
            throw err;
        }
        console.log('User successfully deleted!');
    });
});

//delete - FIND AND REMOVE
User.findOneRemove({username: 'ba'}, function (err) {
    if (err) {
        throw err;
    }
    console.log('User deleted!');
});

//delete - FIND BY ID AND REMOVE
User.findByIdAndRemove(4, function (err) {
    if (err) {
        throw err;
    }
    console.log('User deleted!');
});


