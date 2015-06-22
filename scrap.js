var x = require('x-ray')();

x('http://dotabuff.com/heroes', '.hero-grid a', [{
	name: '.hero .name',
	img: '.hero@style',
	link: '@href',
}])(function(err, objs) {

	if(err) {
		console.log(err);
		throw err;
	}

	for(i in objs) {
		var obj = objs[i];
		obj.img = obj.img.replace('background: url(', '').replace(')', '');

		x(obj.link+'/matchups', '#page-content section article table tbody tr', [{
			values: ['td']
		}])(function (err, matchups) {
			
			var result = [];

			for(i in matchups) {
				var m = {
					hero: matchups[i].values[1],
					advantage: matchups[i].values[2],
					winrate: matchups[i].values[3],
					matchesplayed: matchups[i].values[4]
				};
				result.push(m);
			};

			obj.matchups =  result; //Não funciona
		});

	}

	console.log(objs);

})


