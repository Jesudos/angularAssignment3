import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Injectable()

export class AuthenticationService {

  constructor(private http: HttpClient) {

  }

  authenticateUser(data) {
    return this.http.post('http://localhost:3000/auth/v1/', data);
  }

  setBearerToken(token) {
    localStorage.setItem('AuthToken', token);
  }

  getBearerToken() {
    return localStorage.getItem('AuthToken');
  }

  isUserAuthenticated(token): Promise<boolean> {
    return this.http.post('http://localhost:3000/auth/v1/isAuthenticated', {}, {
    headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    }).toPromise().then(res => {
      return res = res['isAuthenticated'];
    });
  }
}
