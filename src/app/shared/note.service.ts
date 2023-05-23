import { Injectable, OnDestroy } from '@angular/core';
import { Note } from './note.model';
import { Subscription, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService implements OnDestroy{

  notes: Note[] = [
    new Note('Test title', 'Test content!'),
    new Note('Hey!', 'Testing ükskakskolm')
  ];

  storageListenSub: Subscription;

  constructor() { 
    this.loadState();

    this.storageListenSub = fromEvent<StorageEvent>(window, 'storage')
      .subscribe((event: StorageEvent) => {
        if (event.key === 'notes') this.loadState();
      });
  }

  getNotes() {
    return this.notes;
  }

  ngOnDestroy(): void {
    if (this.storageListenSub) this.storageListenSub.unsubscribe();
  }

  getNote (id: string) {
    return this.notes.find(n => n.id === id);
  }

  addNote(note: Note) {
    this.notes.push(note);
  }

  updateNote(id: string, updatedFields: Partial<Note>) {
    const note = this.getNote(id);
    if (!note) {
      return;
    }
    Object.assign(note, updatedFields);

    this.saveState();
  }

  deleteNote(id: string) {
    const noteIndex = this.notes.findIndex(n => n.id === id);
    if (noteIndex === -1) return;

    this.notes.splice(noteIndex, 1);
    this.saveState();
  }

  saveState() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  loadState() {
    try {
      const notesInStorage = localStorage.getItem('notes');
      if (!notesInStorage) return;
  
      const parsedNotes = JSON.parse(notesInStorage);
      if (!Array.isArray(parsedNotes)) return;
  
      this.notes.length = 0; // clear notes array (while keeping reference)
      this.notes.push(...parsedNotes);
    } catch (e) {
      // Handle the error if necessary
    }
  }
}