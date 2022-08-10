import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WordsService {

  constructor() { }
  getWords() {
    return ["TEST", "OTHERTEST", "WORD"]
  }
}
