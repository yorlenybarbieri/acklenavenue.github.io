var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var SlackMessages = mongoose.model('SlackMessages');

router.route('/messages/:numMessages/:channelName').get(function(req, res) {
	var query = SlackMessages.find({});
		query.where('ChannelName').equals(req.params.channelName);
		query.sort({'SlackDateTime': -1})
		query.limit(req.params.numMessages)
		query.exec(function(err, result) {
		if (!err) {
		    res.json(result)
		} else {
		    res.json('Error retrieving data. ' + err)
		}
	});
});

module.exports = router;
