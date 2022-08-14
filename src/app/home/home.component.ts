import { LanguagesService } from './../services/languages.service';
import { Component, OnInit } from '@angular/core';
import { WordsService } from '../services/words.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  savedWords: string[];
  typedWords: string[];
  checkedWords: string[];
  languages: any;

  constructor(private serviceWord: WordsService, serviceLanguage: LanguagesService) {
    this.savedWords = [];
    this.typedWords = [];
    this.checkedWords = [];
    this.languages = [];

    serviceWord.getWords().subscribe(data => {
      this.savedWords = [...data].map(a => a.wordName.trim().toLowerCase());
      console.log(this.savedWords);
    }, error => console.log("Error to get words"));

    serviceLanguage.getLanguages().subscribe(data => {
      this.languages = data;
      console.log(this.languages);
    }, error => console.log("Error to get languages"));
  }

  submit(form: any) {
    this.typedWords = form.value.text.split(' ');
    console.log(this.typedWords);
  }

  saveWords() {
    this.checkedWords.forEach(word => {
      this.serviceWord.saveWord(word).subscribe();
    });
  }

  isChecked(item: string) {
    return this.savedWords.includes(item.trim().toLowerCase());
  }

  onSelect(event: any) {
    if (event.target.checked)
      this.checkedWords.push(event.target.value);
  }

}
