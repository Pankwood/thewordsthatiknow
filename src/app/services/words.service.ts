import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WordsService {

  url = environment.API_URL + "word";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(environment.API_LOGIN + ':' + environment.API_PASSWORD),
    })
  };

  constructor(private http: HttpClient) { }

  getWords() {
    return this.http.get<any>(this.url);
  }

  getWordByParameters(wordName: string, languageId: string, userId: any) {
    const params = `/${wordName}/language/${languageId}/userId/${userId}`;
    return this.http.get<any>(this.url + params);
  }

  saveWord(word: any) {
    return this.http.post<any>(this.url, word, this.httpOptions);
  }


}
