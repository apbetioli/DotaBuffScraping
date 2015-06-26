var request = require('request');
var config = require('config');
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/dota', ['matches']);
var dao = require('./dao');
                        
var lastMatchSeqNum = 1417783672;

var insert = function(result) {
    try {
	if(!result.match_id) {
		console.log('Invalid match: ' + result.match_id + ' - ' +JSON.stringify(result));
		return;
	}

	dao.insertMatch(db, result);
    } catch (e) {
	console.log(e);
	throw e;
    }
}

function getMatches() {
	var url = "https://api.steampowered.com/IDOTA2Match_570/GetMatchHistoryBySequenceNum/V001?key=" + config.get('apikey');
	if(lastMatchSeqNum) {
		lastMatchSeqNum -= 100;
		url += "&start_at_match_seq_num="+lastMatchSeqNum;
	}
	console.log(url);

	get(lastMatchSeqNum, url, function(result) {
		for(i in result.matches) {
			var match = result.matches[i];
			insert(match);
		}

		getMatches();
	});
}

function getMatch(match_id) {
	var url = "https://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/V001/?match_id="+match_id+"&key=" + config.get('apikey');
	get(match_id, url, insert);
}

var get = function(match_id, url, callback) {
	
	request({
	    url: url,
	    json: true
	}, function (error, response, body) {
	    if(error) {
		console.log(error);
		return;
	    }

	    if (response.statusCode === 200) {
		callback(body.result);
	    } else {
		console.log(JSON.stringify(response));
		console.log('Waiting 30 seconds and trying again');
		setTimeout(function() { get(url, callback) }, 30);
	    }
	});
}


getMatches();

