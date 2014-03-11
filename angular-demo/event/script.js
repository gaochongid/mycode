function EventController( $scope ) {
	console.log('===============');

	$scope.count = 0;
	$scope.$on('MyEvent', function () {
		$scope.count++;
	});

	/**
	 * 从当前作用域向父作用域广播，类似事件冒泡。
	 * 不会向子作用域广播
	 * @return {[type]} [description]
	 */
	$scope.emitTrigger = function () {
		$scope.$emit('MyEvent');
	};

	/**
	 * 从当前作用域向下传播，只能是自己或者子作用域
	 * 不能向父作用域传播
	 * @return {[type]} [description]
	 */
	$scope.broadcastTrigger = function () {
		$scope.$broadcast('MyEvent');
	}
}