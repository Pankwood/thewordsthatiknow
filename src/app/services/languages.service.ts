import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {

  constructor(private http: HttpClient) { }

  url = environment.API_URL + "language";

  getLanguages() {
    return this.http.get<any>(this.url);
  }
}
