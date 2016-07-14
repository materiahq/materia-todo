app.controller('TodoCtrl', function($mdDialog, $scope, TodoService) {
	$scope.cancel = function() { $mdDialog.cancel() }
	$scope.ok = function() {
		if ( ! $scope.todo.task.$error ) {
			TodoService.add($scope.todo).then(function(result) {
				$mdDialog.hide(result.data)
			})
		}
	}
})
