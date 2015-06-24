var fs = require('fs');
var brain = require('brain');

var networkData = JSON.parse(fs.readFileSync('data/network.json', 'utf8'));

var net = new brain.NeuralNetwork();
net.fromJSON(networkData);

var input = {'Luna':1, 
	'Omniknight':1,
	'Sven':1,
	'Wraith King':1,
	'Phantom Lancer':-1,
	'Slark':-1,
	'Pugna':-1, 
	'Jakiro':-1, 
	'Windranger':-1};

var output = net.run(input);

console.log(transform(output));




function transform(output) {

	var result = [];

	var keys = Object.keys(output);
	for(i in keys) {
		result.push({name:keys[i], value:output[keys[i]]});
	}

	result.sort(function(a, b){
		return b.value - a.value;
	});

	return result;

}

