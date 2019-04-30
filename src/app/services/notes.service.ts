import { Injectable } from '@angular/core';
import { Note } from '../note';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {tap } from 'rxjs/operators';

@Injectable()
export class NotesService {

  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;

  constructor(private authservice: AuthenticationService, private http: HttpClient) {
    this.notes = [];
    this.notesSubject = new BehaviorSubject(this.notes);
    this.fetchNotesFromServer();
  }

  token = this.authservice.getBearerToken();

  fetchNotesFromServer() {
      this.http.get<Array<Note>>('http://localhost:3000/api/v1/notes', {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
      }).subscribe(data => {
        this.notes = data;
        this.notesSubject.next(this.notes);
      });
  }


  getNotes(): BehaviorSubject<Array<Note>> {
    return this.notesSubject;
  }

  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>('http://localhost:3000/api/v1/notes', note, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
    }).pipe(tap(NewData => {
      this.notes.push(NewData);
      this.notesSubject.next(this.notes);
    }));
  }

  editNote(note: Note): Observable<Note> {
    return this.http.put<Note>(`http://localhost:3000/api/v1/notes/${note.id}`, note, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
    }).pipe(tap(EditNote => {
      const notenew = this.notes.find(res => res.id === EditNote.id);
      Object.assign(notenew, EditNote);
      this.notesSubject.next(this.notes);
    }));
  }

  getNoteById(noteId): Note {
    const note = this.notes.find(res => res.id === noteId);
    return Object.assign({}, note);
  }
}
