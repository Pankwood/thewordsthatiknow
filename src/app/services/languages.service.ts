import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {

  constructor(private http: HttpClient) { }

  url = "https://thewordsthatiknowapi.vercel.app/language";

  getLanguages() {
    return this.http.get<any>(this.url);
  }
}
