import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WordsService {

  constructor(private http: HttpClient) { }

  url = environment.API_URL + "word";
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
