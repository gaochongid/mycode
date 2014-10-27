app.controller('SubCtrl', ['$scope', 'scopeService', function ( $scope, scopeService ) {
	console.log('SubCtrl: ', $scope);
	console.log( 'SubCtrl: ', scopeService() );
	console.log('---------------');

	$scope.message = 'world';
}]);