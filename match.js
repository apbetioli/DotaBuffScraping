var x = require('x-ray')();

var getMatch = function(id, callback, index) {
	x('http://www.dotabuff.com/matches/' + id, 'html', {
		winner: '.match-result',
		results: x('.team-results', [{
			radiant: x('tr.faction-radiant', [{
				hero: 'td img.image-hero@alt',
				player: 'a.player-radiant',
				stats: ['td.cell-centered'],
				items: ['td img.image-item@alt']
			}]),
			dire: x('tr.faction-dire', [{
				hero: 'td img.image-hero@alt',
				player: 'a.player-dire',
				stats: ['td.cell-centered'],
				items: ['td img.image-item@alt']
			}])
		}]),
		builds: x('.match-ability-builds tbody tr', [{
			hero: 'td.cell-icon img.image-hero@alt',
			abilities: ['td.ability img.image-skill@alt']
		}])
	})
	(function (err, data) {
		data.id = id;
		callback(err, data, index);
	});
}

module.exports = getMatch;

getMatch('1582726489', function(err, match, id) {
	if(err) { console.log(err); return; }

	console.log(JSON.stringify(match, null, 4));
});

