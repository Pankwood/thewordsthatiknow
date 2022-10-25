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
  urlLogin = environment.API_URL + "account/login";
  urlSignup = environment.API_URL + "account/signup";

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
    return this.http.post(this.urlLogin,
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

  signup(user: any) {
    return this.http.post<any>(this.urlSignup, user, this.httpOptions);
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
