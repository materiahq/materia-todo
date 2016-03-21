app.controller('AppCtrl', function($scope, $mdDialog, $q, TodoService) {
	TodoService.list().success(function(data) {
			$scope.todos = data
	})

	$scope.toggleDone = function(todo) {
		TodoService.update(todo.id, {
			done: ! todo.done
		})
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
			$scope.todos.push(todo)
		})
	}
		
	var doneTask = [];
	$scope.getDoneTask = function() {
		doneTask.splice(0, doneTask.length) //clear the array without creating a new one.
		for (var i in $scope.todos) {
			var todo = $scope.todos[i];
			if (todo.done) {
				doneTask.push(todo.id)
			}
		}
		return doneTask
	}

	$scope.removeTodos = function() {
		var p = $q.resolve()
		for (var i in $scope.todos) {
			(function(i) {
				p = p.then(function() {
					var todo = $scope.todos[i]
					if (todo.done) {
						return TodoService.del(todo.id)
					}
					else {
						return $q.resolve()
					}
				})
			})(i)
		}
		p.then(function() {
			$scope.todos = $scope.todos.filter(function(e) {
				return ! e.done
			})
		})
	}
})
