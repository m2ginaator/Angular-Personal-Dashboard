import { Component, OnInit } from '@angular/core';
import { TodoService } from '../shared/todo.service';
import { Todo } from '../shared/todo.model';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  animations: [
    trigger('todoItemAnim', [
      transition(':leave', [
        animate(1000, style({
          opacity: 0,
          height: 0,
          marginBottom: 0
        }))
      ])
    ])
  ]
})
export class TodoComponent implements OnInit {

  todos!: Todo []

  constructor(private todoService: TodoService, private router: Router) { }

  ngOnInit(): void {
    this.todos = this.todoService.getTodos()
  }


  toggleCompleted(todo: Todo) {
    this.todoService.updateTodo(todo.id, {completed: !todo.completed})
  }

  onEditClick(todo: Todo) {
    this.router.navigate(['/todo', todo.id])
  }

  onDeleteClick(todo: Todo) {
    this.todoService.deleteTodo(todo.id)
  }

  trackById(index: number, item: Todo) {
    return item.id
  }
}
