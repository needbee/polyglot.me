var utils = utils || {};
utils.one_or_many = function( maybeArray, callback ) {
	if( _.isArray(maybeArray) ) {
		_.each( maybeArray, callback );
	} else {
		callback( maybeArray, null );
	}
}

utils.sample_link = function( urlString ) {
	if( !urlString ) {
		return '';
	}

	if( -1 != urlString.indexOf('jsfiddle.net') ) {
		label = 'jsfiddle';
	} else if( -1 != urlString.indexOf('gist.github.com')) {
		label = 'gist';
	} else {
		label = 'sample';
	}

	return '<a href="'+urlString+'" target="_blank">'+label+'</a>';
}

utils.has_flash = function() {
	return navigator.mimeTypes["application/x-shockwave-flash"] != undefined;
}
