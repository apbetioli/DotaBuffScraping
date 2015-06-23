var x = require('x-ray')();
var fs = require('fs');
var HashMap = require('hashmap');

var map = new HashMap();

function handle(err) {
	if(err) {
		console.log(err);
		throw err;
	}
};

x('http://dotabuff.com/heroes', '.hero-grid a', [{
	name: '.hero .name',
	img: '.hero@style',
	link: '@href'

}])(function(err, heroes) {
	handle(err);
	
	for(i in heroes) {
		var hero = heroes[i];
		hero.img = hero.img.replace('background: url(', '').replace(')', '');
		hero.matchups = [];

		map.set(hero.name, hero);

 		x(hero.link + '/matchups', 'body', [{
			name : x('#container-header', 'img.image-avatar@alt'),
			values: x('#page-content section article table tbody tr', [['td']])
		  }])(function(err, matchups) {
			handle(err);

			var name = matchups[0].name;
			var values = matchups[0].values;
			for(k in values) {
				var value = values[k];
				var m = {
					hero: value[1],
					advantage: value[2],
					winrate: value[3],
					matchesplayed: value[4]
				};
				var current = map.get(name); 
				current.matchups.push(m);
				map.set(current.name, current);
			}
			
			var json = JSON.stringify(map.get(name), null, 4);
			fs.writeFile('heroes/' + name + '.json', json, function(err) {
			    handle(err);
			    console.log(name + ' Finished!');
			}); 
			
		});

	}

});


