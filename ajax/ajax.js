var $ = {};

$.getXHR = function () {
	if ( typeof XMLHttpRequest != 'undefined' ) {
		return new XMLHttpRequest();
	} else if ( typeof ActiveXObject != 'undefined' ) {
		var fn = arguments.callee;
		if ( typeof fn.ActiveXString != 'string' ) {
			var versions = [ 'MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp' ]
			, i
			, len = versions.length;
			for ( i = 0; i < len; i++ ) {
				try {
					new ActiveXObject( versions[i] );
					fn.ActiveXString = versions[i];
					break;
				} catch (ex) {
				}
			}
		}
		return new ActiveXObject( fn.ActiveXString );
	} else {
		throw new Error('No XHR Object');
	}
};

$.handler = function ( xhr, sc, ec ) {
	var hand = function () {
		if ( xhr.readyState == 4 ) {
			if ( (xhr.status >= 200 && xhr.status < 300)  || xhr.status == 304 ) {
				sc( xhr.responseText );
			} else {
				ec( xhr.status );
			}
		}
	};
	// xhr.onload = hand;
	xhr.onreadystatechange = hand;
};

$.param = function ( data ) {
	var arr = [];
	for ( var i in data ) {
		arr.push( i + '=' + data[i]  );
	}
	if ( arr.length > 0 ) {
		return arr.join('&')
	}
	return '';
};

$.get = function ( url, data, sc, ec ) {
	var xhr = this.getXHR();
	this.handler( xhr, sc, ec );
	xhr.open( 'GET', url+'?'+this.param( data ), true );
	xhr.send(null);
};

$.post = function ( url, data, sc, ec ) {
	var xhr = this.getXHR();
	this.handler( xhr, sc, ec );
	xhr.open( 'POST', url, true );
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.send( this.param( data ) );
};