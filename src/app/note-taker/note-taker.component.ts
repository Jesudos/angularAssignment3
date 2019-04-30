import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';


@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent {

  errMessage: string;
  note = new Note();
  constructor(private noteservice: NotesService) {

  }

  AddNote() {
    if (this.note.title === '' || this.note.text === '') {
      this.errMessage = 'Title and Text both are required fields';
      return false;
    }
    this.noteservice.addNote(this.note).subscribe(res => console.log(res), error => this.handleError(error));
    this.note = new Note();
  }

  handleError(error) {
    if (error.status === 404) {
      this.errMessage = error.message;
    } else if (error.status === 403) {
      this.errMessage = error.error.message;
    } else {
      this.errMessage = error.statusText;
    }
  }

}
