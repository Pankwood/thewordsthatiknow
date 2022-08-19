import { LanguagesService } from './../services/languages.service';
import { Component, OnInit } from '@angular/core';
import { WordsService } from '../services/words.service';
import { NotificationService } from '../services/notification.service';

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
  selectedLanguage: string;

  constructor(private serviceWord: WordsService, private serviceLanguage: LanguagesService, private serviceNotification: NotificationService) {
    this.savedWords = [];
    this.typedWords = [];
    this.checkedWords = [];
    this.languages = [];
    this.selectedLanguage = "en";

    this.serviceWord.getWords().subscribe(data => {
      this.savedWords = [...data].map(a => a.wordName.trim().toLowerCase());
      console.debug("Words from db", this.savedWords);
    }, error => console.dir("Error to get words", error));

    this.serviceLanguage.getLanguages().subscribe(data => {
      this.languages = data;
      if (data.length <= 0)
        this.serviceNotification.showError("Error to load languages. Try again later.", "Error");

      console.debug("Languages", this.languages);
    }, error => {
      this.serviceNotification.showError("Error to load languages. Try again later.", "Error");
      console.dir("Error to load languages.", error);
    });
  }

  submit(form: any) {
    try {
      this.typedWords = form.value.text.split(' ');
      this.selectedLanguage = form.value.cmblanguages ?? "en";
      console.debug("Words Splitted", this.typedWords);
    } catch (error) {
      this.serviceNotification.showError("Error to show words. Try again later.", "Error");
      console.dir("Error to show words.", error);
    }
  }

  saveWords() {
    if (this.checkedWords.length <= 0) {
      this.serviceNotification.showWarning("Choose the words you know before save it.", "Warning");
      return;
    }

    this.checkedWords.forEach(word => {
      let userId = localStorage.getItem("userId") ?? 0;
      console.debug("Chosen Language", this.selectedLanguage);
      this.serviceWord.saveWord({ languageId: this.selectedLanguage, userId: userId, wordName: word }).subscribe(() => {
      }, error => {
        this.serviceNotification.showError("Error to save words. Try again later.", "Error");
      }
      );
    });
    this.serviceNotification.showSuccess("Word(s) saved.", "Success");
    console.debug("Saved Words", this.checkedWords);
    this.checkedWords = [];
  }

  isChecked(item: string) {
    return this.savedWords.includes(item.trim().toLowerCase());
  }

  onSelect(event: any) {
    if (event.target.checked)
      this.checkedWords.push(event.target.value);
  }

}
