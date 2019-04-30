import { Component } from '@angular/core';
import { Note } from '../note';

import { MatSelect, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Inject } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent {
  note: Note;
  states: Array<string> = ['not-started', 'started', 'completed'];
  errMessage: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
  private noteservice: NotesService,
  private matDialogref: MatDialogRef<EditNoteViewComponent>) {

    this.note = this.noteservice.getNoteById(data.noteid);

  }

  onSave() {
    this.noteservice.editNote(this.note).subscribe(res => {
      this.matDialogref.close();
    }, error => {
      this.handleError(error);
    });
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
