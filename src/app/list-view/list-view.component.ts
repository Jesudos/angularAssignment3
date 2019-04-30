import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  notStartedNotes: Array<Note> = [];
  startedNotes: Array<Note> = [];
  completedNotes: Array<Note> = [];

  constructor(private noteservice: NotesService) {}

  GetNotes() {
    this.noteservice.getNotes().subscribe(
      notes => {
        notes.forEach(note => {
          if (note.state === 'not-started') { this.notStartedNotes.push(note); }
          if (note.state === 'started') { this.startedNotes.push(note); }
          if (note.state === 'completed') { this.completedNotes.push(note); }
        });
      },
      error => { this.handleError(error); }
    );
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
