import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { tokenGetter } from '../app.module';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: any;
  url = environment.API_URL + "account/login";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(environment.API_LOGIN + ':' + environment.API_PASSWORD),
    })
  };


  constructor(private http: HttpClient) {
    tokenGetter();
  }

  login(credentials: any) {
    return this.http.post(this.url,
      JSON.stringify(credentials),
      this.httpOptions)
      .pipe(
        map((response: any) => {
          if (response.accessToken) {
            localStorage.setItem('token', response.accessToken);

            this.currentUser = tokenGetter();

            return true;
          }
          else return false;
        }));
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser = null;
  }

  isLoggedIn() {
    const jwt = new JwtHelperService();
    return jwt.isTokenExpired('token');
  }
}
