import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { map } from 'rxjs/operators';

import { TodoService } from './services/todo.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('todoFormTemplate', {static: true}) todoFormTemplate: TemplateRef<any>;
  todos: any[];
  todoForm: FormGroup;
  todoFormDialog: MatDialogRef<any>;

  constructor(
    private todoService: TodoService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.todoForm = this.fb.group({
      task: [null, Validators.required]
    });
    this.listTodos();
  }

  addTask() {
    if (this.todoForm.valid) {
      this.todoService.create(this.todoForm.value).subscribe(() => {
        this.closeModal();
        this.listTodos();
      });
    }
  }

  deleteTask(id) {
    this.todoService.delete(id).subscribe(() => this.listTodos());
  }

  updateTaskStatus(task) {
    this.todoService.put({id_todo: task.id_todo, done: ! task.done}).subscribe(() => this.listTodos());
  }

  listTodos() {
    this.todoService.list().pipe(
      map((result: any) => result.data)
    ).subscribe((todos) => this.todos = todos);
  }

  openModal() {
    this.todoForm.reset();
    this.todoFormDialog = this.dialog.open(this.todoFormTemplate);
  }

  closeModal() {
    this.todoFormDialog.close();
  }
}
