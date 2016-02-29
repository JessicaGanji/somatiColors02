var User = require('../models/user');
var jwt = require('jsonwebtoken');
var mySpecialSecret = "pizza";

function index(require, response) {
  // get all the users -- index
  User.find(function(error, users) {
    if(error) {
          response.json({ message: "getUsers ERROR:" + error });
      } else {
          response.json({ users: users });
      };
  });
};

function create(require, response) {
  // make a single user -- create
  console.log("Creating a user")
  var user = new User();

  user.name = require.body.name;
  user.username = require.body.username;
  user.password = require.body.password;
  user.first_name = require.body.first_name;
  user.last_name = require.body.last_name;
  user.gender = require.gender;
  user.mental_health_physician = require.body.mental_health_physician;
  user.physician_email = require.body.physician_email;
  user.joy = require.body.joy;   
  user.acceptance = require.body.acceptance;
  user.fear = require.body.fear;
  user.surprise = require.body.surprise;
  user.sadness = require.body.sadness; 
  user.disgust = require.body.disgust;   
  user.anger = require.body.anger; 
  user.anticipation = require.body.anticipation;

  user.save(function(error) {
    if(error) {
      if(error.code == 11000) {
        return response.json({success: false, message: "username already exists" });
      } else {
        response.send(error)
      };
    };
    response.json({success: true, message: "User created, Wahey!"});
  });
};

function show(require, response) {
  //get a single user -- show
  User.findById(require.params.user_id, function(error, user) {
    if(error) {
          response.json({ message: "showUsers ERROR:" + error });
      } else {
          response.json(user);
      }
  })
}

function update(require, response) {
  // update a single user -- update
  User.findById(require.params.user_id, function(error, user) {
    if(error) response.send(error);

    if(require.body.name) user.name = require.body.name;
    if(require.body.username) user.username = require.body.username;
    if(require.body.password) user.password = require.body.password;
    if(require.body.first_name) user.first_name = require.body.first_name;
    if(require.body.last_name) user.last_name = require.body.last_name;
    if(require.body.gender) user.gender = require.body.gender;
    if(require.body.mental_health_physician) user.mental_health_physician = require.body.mental_health_physician;
    if(require.body.physician_email) user.physician_email = require.body.physician_email;
    if(require.body.joy) user.joy = require.body.joy;   
    if(require.body.acceptance) user.acceptance = require.body.acceptance;
    if(require.body.fear) user.fear = require.body.fear;
    if(require.body.surprise) user.surprise = require.body.surprise;
    if(require.body.sadness) user.sadness = require.body.sadness; 
    if(require.body.disgust) user.disgust = require.body.disgust;   
    if(require.body.anger) user.anger = require.body.anger; 
    if(require.body.anticipation) user.anticipation = require.body.anticipation;

    user.save(function(error) {
      if(error) {
          response.json({ message: "putUsers ERROR:" + error });
      } else {
          response.json(user);
      };
    });
  });
};

function destroy(require, response) {
  // delete a single user -- destroy
  User.remove({ _id: require.params.user_id }, function(error, user) {
    if(error) {
        response.send(error);
    } else {
        response.json({success: true, message: "YOU HAVE BEEN TERMINATED!"});
    };
  });
};


//code for apiRouter.route('/authenticate')
function authenticateUser(require, response) {
  console.log('trying to generate a JWT')
  // 1 - find the user in our db
  User.findOne({ username: require.body.username })
    .select('name username password').exec(function(error, user) {
        if(error) throw error
        if(!user) {
            response.json({success: false, message: "No such user"});
        } else if(user) {
            // check passwords
            var validPassword = user.comparePassword(require.body.password);
            if(!validPassword) {
                response.json({success: false, message: "Invalid password"});
            } else {
                // password is good!
                var token = jwt.sign({
                name: user.name,
                username: user.username,
                user_id: user._id
                }, mySpecialSecret, {
                expiresponseInMinutes: 1440
                })
                // now let's actually give it to them!
                console.log("logged in")
                response.json({ success: true, message: "enjoy your token!", token: token});
            };
        };
    });
};

function checkUser(require, response, next) {
  // let's check everywhere for the JWT!
  var token = require.body.token || require.param('token') || require.headers['x-access-token'];
  // if we find the token, let's use mySpecialSecret to try and decode it.
  if(token) {
    jwt.verify(token, mySpecialSecret, function(error, decoded) {
      if(error) {
        response.status(403).send({success: false, message: "forbidden, token can't be decoded"})
      } else {
        require.decoded = decoded
        next()
      };
    });
  } else {
    response.status(403).send({success: false, message: "no token. You're not even trying"})
  };
  // this is going to run EVERY time our API is hit
  // we want to check if the user is logged in here
  console.log("checking if user is logged in")
};

module.exports = {
  index: index,
  create: create,
  show: show,
  update: update,
  destroy: destroy,
  authenticate: authenticateUser,
  checkUser: checkUser
}