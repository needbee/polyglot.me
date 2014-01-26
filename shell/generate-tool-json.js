var fs = require('fs');

var featuresetFileName = '../data/featuresets.json';
var toolDir = '../data/tools/';
var newToolId = null;
var newToolFile = null;
if (process.argv.length >= 3 ) {
	newToolId = process.argv[2];
	newToolFile = toolDir + newToolId + '.json';
}

fs.readFile(featuresetFileName, 'utf-8', function(err,featuresetJson) {
	if(err) { throw err; }
	var featuresetObj = JSON.parse(featuresetJson);
	var toolObj = {
		"id": newToolId || "",
		"name": "",
		"api": "",
		"featuresets": {}
	};

	for( var i in featuresetObj.featuresets ) {
		var featureset = featuresetObj.featuresets[i];
		
		var toolFeatureset = {};
		toolObj.featuresets[featureset.id] = toolFeatureset;

		for( var j in featureset.features ) {
			var feature = featureset.features[j];
			toolFeatureset[feature.id] = {
				"code": "",
				"api": ""
			};
		}
	}

	var toolJson = JSON.stringify(toolObj, undefined, "\t");
	if( newToolFile ) {
		fs.writeFile(newToolFile, toolJson, function(err) {
			if( err ) { throw err; }
		});
	} else {
		console.log(toolJson);
	}
});
