import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class WordsService {

  constructor(private http: HttpClient) { }
  getWords() {
    let url = "https://localhost:44312/Words";
    return this.http.get<any>(url)
    //return ["TEST", "OTHERTEST", "WORD"]
  }
}
