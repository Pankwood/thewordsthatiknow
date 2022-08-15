import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WordsService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:1987/word";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  getWords() {
    return this.http.get<any>(this.url);
  }

  saveWord(word: any) {
    let wordObject = word;
    return this.http.post<any>(this.url, wordObject, this.httpOptions);
  }


}
