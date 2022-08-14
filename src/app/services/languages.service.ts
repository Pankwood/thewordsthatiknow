import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:1987/language";

  getLanguages() {
    return this.http.get<any>(this.url);
  }
}
