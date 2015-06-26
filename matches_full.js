var x = require('x-ray')();
var fs = require('fs');
var match = require('./match');

var results = [];

function handle(err) {
	if(err) { console.log(err); throw err; }
};

function onFinish(matches) {
	var json = JSON.stringify(matches, null, 4);
	fs.writeFile('data/matches_full.json', json, function(err) {
	    handle(err);
	    console.log(matches.length + ' matches processed!');
	}); 
}

x('http://www.dotabuff.com/matches', 'tbody tr', [{
	match_id: 'td a',
	winner: 'td .team',
	heroes: ['td .image-container img@alt']
}])
.paginate('.next a@href')
.limit(1)
(function(err, matches) {
	handle(err);

	for(i in matches) {
		match(matches[i].match_id, i, function(err, data, index) {
			handle(err);

			results.push(data);

			if(index == matches.length-1) {
				onFinish(results);
			}
		});
	}

	
})



