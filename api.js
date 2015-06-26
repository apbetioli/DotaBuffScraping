var request = require('request');

var apikey = 'E1BCB43B689BDA572C9B90AF415AF86A';
var match_id = '1583266685';
var url = "https://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/V001/?match_id="+match_id+"&key=" + apikey;

request({
    url: url,
    json: true
}, function (error, response, body) {
    if (!error && response.statusCode === 200) {
        process(body);
    } else {
        console.log('Erro');
    }
});

function process(data) {
    console.log(db.collection('matches').find());
}
