import { Injectable, OnDestroy } from '@angular/core';
import { Todo } from './todo.model';
import { Subscription, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService implements OnDestroy{

  todos: Todo[] = []

  storageListenSub: Subscription

  constructor() { 
    this.loadState()

   this.storageListenSub = fromEvent<StorageEvent>(window, 'storage'). subscribe((event: StorageEvent) => {
      if(event.key === 'todos') this.loadState()
    })
  }

  ngOnDestroy(): void {
    if (this.storageListenSub) this.storageListenSub.unsubscribe();
  }


  getTodos() {
    return this.todos
  }

  getTodo (id: string) {
    return this.todos.find(t => t.id === id)
  }

  addTodo(todo: Todo) {
    this.todos.push(todo)

    this.saveState()
  }

  updateTodo(id: string, updatedTodoFields: Partial<Todo>) {
    const todo = this.getTodo(id)
    if(todo) {
      Object.assign(todo, updatedTodoFields)

      this.saveState()

    }
  }

  deleteTodo(id: string) {
    const index = this.todos.findIndex(t => t.id === id)
    if (index == -1) return

    this.todos.splice(index, 1)

    this.saveState()
  }

  saveState() {
    localStorage.setItem('todo', JSON.stringify(this.todos))
  }

  loadState() {
    try {
      const todosInStorage = localStorage.getItem('todo');
  
      if (!todosInStorage) return;
  
      const parsedTodos = JSON.parse(todosInStorage);
      if (!Array.isArray(parsedTodos)) return;
  
      this.todos.length = 0;
      this.todos.push(...parsedTodos);
    } catch(e) {
      // Handle the error if necessary
    }
  }
} 
