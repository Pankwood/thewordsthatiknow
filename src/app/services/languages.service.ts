import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {

  url = environment.API_URL + "language";

  constructor(private http: HttpClient) { }

  getLanguages() {
    return this.http.get<any>(this.url);
  }
}
