import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    username = new FormControl();
    password = new FormControl();

    submitMessage: string;

    loginForm = new FormGroup ({
      username: this.username,
      password: this.password
    });

    constructor(private authservice: AuthenticationService, private routerservice: RouterService) {}

    loginSubmit() {
      this.authservice.authenticateUser(this.loginForm.value).subscribe(data => {
        this.authservice.setBearerToken(data['token']);
        this.routerservice.routeToDashboard();
      }, error => { this.handleError( error ); });
    }

    handleError(error) {
      if (error.status === 404) {
        this.submitMessage = error.message;
      } else if (error.status === 403) {
        this.submitMessage = error.error.message;
      } else {
        this.submitMessage = error.statusText;
      }
    }
}
