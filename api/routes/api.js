var express = require('express');
var apiRouter = express.Router();
var usersController = require('../controllers/users.js');
var eventsController = require('../controllers/events.js');


// Non-Authenticated
// make a user
apiRouter.route('/users')
	.post(usersController.create)
// login
apiRouter.route('/authenticate')
	.post(usersController.authenticate)


// Authenticated
// config middleware for auth
apiRouter.use(usersController.checkUser)
// logged in user detail
apiRouter.route('/me')
	.get(function(request, response) {
		response.send(request.decoded);
	})


// CRUD
apiRouter.route('/users')
	.get(usersController.index)
    
apiRouter.route('/users/:user_id')
	.get(usersController.show)
	.put(usersController.update)
	.delete(usersController.destroy)
    
apiRouter.route('/users/:user_id/events')
	.get(eventsController.index)
	.post(eventsController.create)

apiRouter.route('/users/:user_id/events/:id')
    .get(eventsController.show)
	.delete(eventsController.destroy)
	.put(eventsController.update)
    
    .post(eventsController.mailer)

module.exports = apiRouter