import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { NotesComponent } from './notes/notes.component';
import { TodoComponent } from './todo/todo.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { EditNoteComponent } from './edit-note/edit-note.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { EditTodoComponent } from './edit-todo/edit-todo.component';
import { AddBookmarkComponent } from './add-bookmark/add-bookmark.component';
import { ManageBookmarksComponent } from './manage-bookmarks/manage-bookmarks.component';
import { EditBookmarkComponent } from './edit-bookmark/edit-bookmark.component';

const routes: Routes = [
  {path:'bookmarks', component: BookmarksComponent, data: { tab: 1}},
  { path: 'bookmarks/add', component:AddBookmarkComponent},
  { path: 'bookmarks/manage', component: ManageBookmarksComponent, children: [
    { path: ':id', component: EditBookmarkComponent}
  ] },
  {path:'todo', component: TodoComponent , data: { tab: 2}},
  { path: 'todo/add', component: AddTodoComponent},
  { path: 'todo/:id', component: EditTodoComponent},
  {path:'notes', component: NotesComponent , data: { tab: 3}},
  { path: 'notes/add', component: AddNoteComponent},
  { path: 'notes/:id', component: EditNoteComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }