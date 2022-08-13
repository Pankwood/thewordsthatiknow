import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WordsService {

  constructor(private http: HttpClient) { }

  getWords() {
    let url = "http://localhost:1987/word";
    return this.http.get<any>(url);
  }
}
