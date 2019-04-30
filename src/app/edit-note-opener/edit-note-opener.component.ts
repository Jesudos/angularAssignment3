import { Component } from '@angular/core';

import { MatDialog } from '@angular/material';
import { EditNoteViewComponent } from '../edit-note-view/edit-note-view.component';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-edit-note-opener',
  templateUrl: './edit-note-opener.component.html',
  styleUrls: ['./edit-note-opener.component.css']
})
export class EditNoteOpenerComponent {

  constructor(private matDialog: MatDialog, private activaterout: ActivatedRoute, private routerservice: RouterService) {
    const id = +this.activaterout.snapshot.paramMap.get('noteId');

    this.matDialog.open(EditNoteViewComponent, {
      data: {noteid: id}
    }).afterClosed().subscribe(res => {
      this.routerservice.routeBack();
    });
  }
}
