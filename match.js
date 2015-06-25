var x = require('x-ray')();

var getMatch = function(id, callback, index) {
	x('http://www.dotabuff.com/matches/' + id, 'html', [{
		winner: '.match-result',
		results: x('.team-results', [{
			radiant: x('tr.faction-radiant', [{
				hero: 'td img.image-hero@alt',
				player: 'a.player-radiant',
				items: ['td img.image-item@alt'],
				stats: ['td.cell-centered']
			}]),
			dire: x('tr.faction-dire', [{
				hero: 'td img.image-hero@alt',
				player: 'a.player-dire',
				items: ['td img.image-item@alt'],
				stats: ['td.cell-centered']
			}])
		}]),
		builds: x('.match-ability-builds', [{
			radiant: x('.radiant tbody tr', [{
				hero: 'td.cell-icon img.image-hero@alt',
				ability: ['td.ability img.image-skill@alt']
			}]),
			dire: x('.dire tbody tr', [{
				hero: 'td.cell-icon img.image-hero@alt',
				ability: ['td.ability img.image-skill@alt']
			}])
		}])
	}])
	(function (err, data) {
		data[0].id = id;
		callback(err, data, index);
	});
}

module.exports = getMatch;

/*
getMatch('1582726489', function(err, match, id) {
	if(err) { console.log(err); return; }

	console.log(JSON.stringify(match, null, 4));
});
*/
