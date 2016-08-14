app.controller('AppCtrl', function($scope, $mdDialog, $q, TodoService) {
	TodoService.list().success(function(data) {
		$scope.todos = data
	})

	$scope.toggleDone = function(todo) {
		TodoService.update(todo.id, {
			done: ! todo.done
		})
	}

	var nbDoneTodo = 0;
	$scope.getNotDoneTodoLength = function() {
		if ( ! $scope.todos || ! $scope.todos.rows ) {
			return 0
		}

		var res = 0;
		for (var i in $scope.todos.rows) {
			if (! $scope.todos.rows[i].done) {
				res++;
			}
		}
		if (res != nbDoneTodo) {
			nbDoneTodo = res
		}
		return nbDoneTodo;
	}

	$scope.addTodo = function(ev) {
		$mdDialog.show({
			controller: 'TodoCtrl',
			templateUrl: 'modals/todo.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose: true,
			locals: {
				todo: null
			}
		}).then(function(todo) {
			TodoService.list().success(function(data) {
				$scope.todos = data
			})
		})
	}

	var doneTask = [];
	$scope.getDoneTask = function() {
		if ( ! $scope.todos || ! $scope.todos.rows ) {
			return 0
		}

		doneTask.splice(0, doneTask.length) //clear the array without creating a new one.
		for (var i in $scope.todos.rows) {
			var todo = $scope.todos.rows[i];
			if (todo.done) {
				doneTask.push(todo.id)
			}
		}
		return doneTask
	}

	$scope.removeTodos = function() {
		var p = $q.resolve()
		let nbRm = 0;
		for (var i in $scope.todos.rows) {
			(function(i) {
				p = p.then(function() {
					var todo = $scope.todos.rows[i]
					if (todo.done) {
						nbRm++;
						return TodoService.del(todo.id)
					}
					else {
						return $q.resolve()
					}
				})
			})(i)
		}
		p.then(function() {
			TodoService.list().success(function(data) {
				$scope.todos = data
			})
		})
	}
})
