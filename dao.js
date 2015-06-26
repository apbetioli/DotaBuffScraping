var insertMatch = function(db, match) {
	db.matches.count({match_seq_num: match.match_seq_num}, function (err, result){
		if(err) { console.log(err); throw err; }

		if(result == 0) {

		db.matches.insert(match, function (err, result) {
			if(err) { console.log(err); throw err; }

			console.log("Match inserted: " + match.match_seq_num);
		});

		} else {
			console.log("Match already exists: " + match.match_seq_num);
		}

	});
};

exports.insertMatch = insertMatch;

