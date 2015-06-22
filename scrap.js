var xray = require('x-ray')();

xray('http://dotabuff.com/heroes', '.hero-grid a', [{
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
	}

	console.log(objs);

})


