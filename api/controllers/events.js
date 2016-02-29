var Event = require('../models/event.js');
var H_GMAIL_KEY = process.env.H_GMAIL_KEY || require('../../key.js');

// GET api/:id/events
function index(request, response) {
  var user_id = request.params.user_id;

  Event.find({ user_id: user_id}, function (error, events) {
      if(error) {
          response.json({ message: "getEvents ERROR:" + error });
      } else {
          response.json({ events: events });
      };
  }).select('-__v');
};

// POST api/users/:user_id/events/
function create(request, response) { 
  var event = new Event();

  event.title = request.body.title;
  event.location = request.body.location;
  event.date = request.body.date;
  event.location = request.body.location;
  event.people_involved = request.body.people_involved;
  event.situation = request.body.situation;
  event.triggers = request.body.triggers;
  event.bodily_sensations = request.body.bodily_sensations;
  event.emotion = request.body.emotion;
  event.automatic_thoughts = request.body.automatic_thoughts;
  event.rational_response = request.body.rational_response;
  event.behaviors = request.body.behaviors;
  event.consequences = request.body.consequences;
  event.challenged_beliefs = request.body.challenged_beliefs;
  event.lesson = request.body.lesson;
  event.old_perspective = request.body.old_perspective;
  event.new_perspective = request.body.new_perspective;
  event.coping_strategies = request.body.coping_strategies;
  event.user_id = request.params.user_id;
    
  event.save(function (error) {
    if(error) {
        response.json({ message: "postEvent ERROR:" + error });
    } else {
        response.json({ message: "postEvent confirmation" });
    };
  });
};

// GET api/:id/events/:id
function show(request, response) {
  var id = request.params.id;

  Event.findById({ _id: id }, function (error, event) {
    if(error) {
        response.json({ message: "getEvent ERROR:" + error });
    } else {
        response.json({ event: event });
    };
  }).select('-__v');
};

// PUT api/:id/events/:id
function update(request, response) {
  var id = request.params.id;

  Event.findById({ _id: id }, function(error, event) {
    if(error) response.send(error)

    if(request.body.title) event.title = request.body.title;
    if(request.body.location) event.location = request.body.location;
    if(request.body.date) event.date = request.body.date;
    if(request.body.location) event.location = request.body.location;
    if(request.body.people_involved) event.people_involved = request.body.people_involved;
    if(request.body.situation) event.situation = request.body.situation;
    if(request.body.triggers) event.triggers = request.body.triggers;
    if(request.body.bodily_sensations) event.bodily_sensations = request.body.bodily_sensations;
    if(request.body.emotion) event.emotion = request.body.emotion;
    if(request.body.automatic_thoughts) event.automatic_thoughts = request.body.automatic_thoughts;
    if(request.body.rational_response) event.rational_response = request.body.rational_response;
    if(request.body.behaviors) event.behaviors = request.body.behaviors;
    if(request.body.consequences) event.consequences = request.body.consequences;
    if(request.body.challenged_beliefs) event.challenged_beliefs = request.body.challenged_beliefs;
    if(request.body.lesson) event.lesson = request.body.lesson;
    if(request.body.old_perspective) event.old_perspective = request.body.old_perspective;
    if(request.body.new_perspective) event.new_perspective = request.body.new_perspective;
    if(request.body.coping_strategies) event.coping_strategies = request.body.coping_strategies;
        
    event.save( function(error) {
      if(error) {
          response.json({ message: "putEvent SAVE ERROR:" + error });
      } else {
        response.json({ message: "putEvent confirmation" , data : event});
      }
    });
  });
};

// DELETE api/:id/events/:id
function destroy(request, response) {
  var id = request.params.id;

  Event.remove({ _id: id }, function (error) {
    if(error) {
        response.json({ message: "deleteEvent ERROR:" + error });
    } else {
        response.json({ message: "deleteEvent confirmation" });
    };
  });
};


// MAILER
function mailer(request, response) {
  var id = request.params.id;

  var recipient             = request.body.recipient;
  var email                 = request.body.email;
  var subject               = request.body.subject;
  var message               = request.body.message;

  Event.findById({_id: id}, function (error, message_user){
    if(error) console.log( "There is an error sending your message because:" + error );
    
    console.log("Reporting for duty from Event Mailer")
    console.log(message_user.local.email)

    var nodemailer  = require('nodemailer');

    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport(H_GMAIL_KEY);

    var mailOptions = {
        from: 'SomatiColors',
        to: [recipient, email],
        subject: subject,
        text: message,
        html: message
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
  });
  
  response.redirect('/confirmation')
};

module.exports = {
  index: index,
  create: create,
  show: show,
  update: update,
  destroy: destroy,
  mailer: mailer
};