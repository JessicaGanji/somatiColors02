var mongoose = require('mongoose');

var Event = mongoose.Schema({	
	title: String,
	date: String,
	location: String,
    people_involved: String,  
	situation: String,
	triggers: String,
  	bodily_sensations: String,
    emotion: String,    
	automatic_thoughts: String,
	rational_response : String,
	behaviors: String,
	consequences: String,
    challenged_beliefs: String,
    lesson: String,
	old_perspective: String,
	new_perspective: String,
	coping_strategies: String,
    user_id: String
});

module.exports = mongoose.model('Event', Event);