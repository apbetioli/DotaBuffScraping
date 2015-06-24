var x = require('x-ray')();

x('http://www.dotabuff.com/matches', 'tbody tr', [{
	match_id: 'td a',
	result: 'td .team',
	heroes: ['td .image-container img@alt']

}])
.paginate('.next a@href')
.limit(200)
.write('data/matches.json')


