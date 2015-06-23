var x = require('x-ray')();

x('http://www.dotabuff.com/matches', 'tbody tr', [{
	match: 'td a',
	team: 'td .team',
	heroes: ['td .image-container img@alt']

}])
.paginate('.next a@href')
.limit(200)
.write('data/matches/matches.json')


