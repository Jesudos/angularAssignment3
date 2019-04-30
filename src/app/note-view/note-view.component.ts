import { Component, OnInit } from '@angular/core';

import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { NoteComponent } from '../note/note.component';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent implements OnInit {

  notes: Array<Note>;

  constructor(private noteservice: NotesService) {}

  GetNotes() {
    this.noteservice.getNotes().subscribe(Notes => this.notes = Notes, error => this.handleError(error));
  }

  handleError(error) {
    if (error.status === 404) {
      console.log(error.message);
    } else if (error.status === 403) {
      console.log(error.message);
    } else {
      console.log(error.message);
    }
  }


  ngOnInit() {
    this.GetNotes();
  }

}
