import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get('api/todos');
  }

  put(todo) {
    return this.http.put(`api/todos/${todo.id_todo}`, todo);
  }

  create(todo) {
    return this.http.post('api/todos', todo);
  }

  delete(id: number) {
    return this.http.delete(`api/todos/${id}`);
  }
}
