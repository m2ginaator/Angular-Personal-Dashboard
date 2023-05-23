import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TodoService } from '../shared/todo.service';
import { Todo } from '../shared/todo.model';
import { NgForm } from '@angular/forms';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnInit {
  todo: Todo | undefined;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private router: Router,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const todoId = paramMap.get('id');
      if (todoId) {
        this.todo = this.todoService.getTodo(todoId);
      }
    });
  }

  onFormSubmit(form: NgForm) {
    if (form.invalid || !this.todo) {
      return;
    }
    this.todoService.updateTodo(this.todo.id, form.value);
    this.router.navigateByUrl("/todo");

    this.notificationService.show('Updated todo!')
  }
}
