var fs = require('fs');
var brain = require('brain');

var net = new brain.NeuralNetwork();

var matches = JSON.parse(fs.readFileSync('data/matches.json', 'utf8'));

train(matches);

fs.writeFile("data/network.json", JSON.stringify(net.toJSON()), function(err) {
    if(err)
        return console.log(err);

    console.log("Network trained!");
}); 

function train(rawarray) {

	var allData = [];

	for(r in rawarray) {
		var raw = rawarray[r];

		var radiant = raw.team == 'Radiant Victory';

		var winners = [];
		var loosers = [];

		for(i=0; i < 5; i++) {
			winners.push(radiant ? raw.heroes[i] : raw.heroes[i+5]);
			loosers.push(!radiant ? raw.heroes[i] : raw.heroes[i+5]);
		}
	

		for(x=0; x < 5; x++) {

			var data = {
				input: {},
				output: {}
			};

			data.output[winners[x]] = 1;

			for(i=0; i < 5; i++) {
				data.input[loosers[i]] = -1;	
				if(i != x)
					data.input[winners[i]] = 1;	
			}

			allData.push(data);
		}
	}

	net.train(allData);
}

