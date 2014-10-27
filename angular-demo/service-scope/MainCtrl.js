app.controller('MainCtrl', ['$scope', 'scopeService', function ( $scope, scopeService ) {
	console.log('MainCtrl: ', $scope);
	console.log('MainCtrl: ', scopeService() );
	console.log('---------------');

	$scope.message = 'hello';
}]);