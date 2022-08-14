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

  constructor(private service: WordsService) {
    this.savedWords = [];
    this.typedWords = [];
    this.checkedWords = [];

    service.getWords().subscribe(data => {
      this.savedWords = [...data].map(a => a.wordName.trim().toLowerCase());
      console.log(this.savedWords);
    }, error => console.log("Erro!!"));
  }

  submit(form: any) {
    this.typedWords = form.value.text.split(' ');
    console.log(this.typedWords);
  }

  saveWords() {
    this.checkedWords.forEach(word => {
      this.service.saveWord(word).subscribe();
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
