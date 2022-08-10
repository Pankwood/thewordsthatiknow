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
  //isChecked: boolean = true;

  constructor(service: WordsService) {
    this.savedWords = service.getWords();
  }

  submit(form: any) {
    this.typedWords = form.value.text.split(' ');
  }

  isChecked(item: string) {
    return this.savedWords.includes(item.trim().toUpperCase());
  }

}
