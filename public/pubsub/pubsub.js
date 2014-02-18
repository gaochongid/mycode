var pubsub = {};
(function ( p ) {

var channels = {}
, subId = 0;

p.publish = function ( channel, args ) {
	
	if ( !channels[channel] ) { return false; }
	
	setTimeout(function () {
		
		var subs = channels[channel]
		, len = subs ? subs.length : 0;
		
		while( len-- ) {
			subs[len].fn(channel, args);
		}
		
	}, 0);
	
	return true;
};

p.subscribe = function ( channel, fn ) {
	
	if ( !channels[channel] ) {
		channels[channel] = [];
	}
	
	var token = ++subId + '';
	
	channels[channel].push({
		token: token,
		fn: fn
	});
	
	return token;
};

p.unsubscribe = function ( token ) {
	for ( var i in channels ) {
		var channel = channels[i];
		if ( channel ) {
			for ( var k = 0, len = channel.length; k < len; k++ ) {
				if ( channel[k].token === token ) {
					channel.splice( k, 1 );
					return token;
				}
			}
		}
	}
};

})(pubsub);