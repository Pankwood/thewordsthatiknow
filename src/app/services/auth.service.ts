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

  ngOnDestroy(): void {
    this.logout();
  }

  login(credentials: any) {
    this.logout();
    return this.http.post(this.urlLogin,
      JSON.stringify(credentials),
      this.httpOptions)
      .pipe(
        map((response: any) => {
          if (response.accessToken) {
            localStorage.setItem('token', response.accessToken);
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
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    if (!token)
      return false;

    return !new JwtHelperService().isTokenExpired(token);
  }

  get currentUser() {
    const token = localStorage.getItem('token');
    if (!token)
      return null;

    return new JwtHelperService().decodeToken(token);
  }
}