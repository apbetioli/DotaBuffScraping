var brain = require('brain');
var net = new brain.NeuralNetwork();

net.train([{input: {'Ogre Magi':1, 'Queen of Pain':1, 'Shadow Fiend':-1, 'Treant Protector':-1, 'Viper':-1}, output: {'Abaddon':1}},
           {input: {'Abaddon':1,   'Queen of Pain':1, 'Shadow Fiend':-1, 'Treant Protector':-1, 'Viper':-1}, output: {'Ogre Magi':1}},
           {input: {'Abaddon':1,   'Ogre Magi':1,     'Shadow Fiend':-1, 'Treant Protector':-1, 'Viper':-1}, output: {'Queen of Pain':1}}]);

var input = {'Ogre Magi':1, 'Shadow Fiend':-1, 'Treant Protector':-1, 'Viper':-1};
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

