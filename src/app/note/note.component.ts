import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {

@Input() note;

constructor(private routerservice: RouterService) {}

OpenPopUp() {
  this.routerservice.routeToEditNoteView(this.note.id);
}

}
