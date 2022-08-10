import { Component, OnInit } from '@angular/core';
import { WordsService } from '../services/words.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  typedWords: any;
  savedWords: string[];

  constructor(private service: WordsService) {
    this.savedWords = [];

    service.getWords().subscribe(data => {
      this.savedWords = [...data].map(a => a.word.trim().toLowerCase());
      console.log(this.savedWords);
    });
    ;
  }

  submit(form: any) {
    this.typedWords = form.value.text.split(' ');
    console.log(this.typedWords);
  }

  isChecked(item: string) {
    return this.savedWords.includes(item.trim().toLowerCase());
  }

}
