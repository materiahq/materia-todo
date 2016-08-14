app.factory('TodoService', function($http) {
	return {
		apiRoot: 'http://localhost:8080/api',
		list: function() {
			return $http.get(this.apiRoot + '/todos?limit=200&page=1')
		},

		add: function(data) {
			return $http.post(this.apiRoot + '/todos', data)
		},

		update: function(id, data) {
			return $http.put(this.apiRoot + '/todos/' + id, data)
		},

		del: function(id) {
			return $http.delete(this.apiRoot + '/todos/' + id)
		}
	}
})
