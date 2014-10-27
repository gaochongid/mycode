app.factory('scopeService', ['$rootScope', function ( scope ) {
	console.log( 'scope in scopeService: ', scope );
	return function () {
		return scope;
	};
}]);