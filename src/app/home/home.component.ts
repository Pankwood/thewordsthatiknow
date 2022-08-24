import { LanguagesService } from './../services/languages.service';
import { Component } from '@angular/core';
import { WordsService } from '../services/words.service';
import { NotificationService } from '../services/notification.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  wordsFromDB: string[];
  typedWords: string[];
  checkedWords: string[];
  languages: any;
  selectedLanguage: string;

  constructor(private serviceWord: WordsService, private serviceLanguage: LanguagesService, private serviceNotification: NotificationService) {
    this.wordsFromDB = [];
    this.typedWords = [];
    this.checkedWords = [];
    this.languages = [];
    this.selectedLanguage = "en";

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

  changeCmbLanguages() {
    this.clearForm();
  }

  clearForm() {
    this.wordsFromDB = [];
    this.typedWords = [];
    this.checkedWords = [];
  }


  submit(form: any) {
    try {
      //remove extra spacing between words
      let text = form.value.text.replace(/\s+/g, " ").trim();
      this.selectedLanguage = form.value.cmblanguages ?? "en";
      this.clearForm();
      if (text != "") {
        this.typedWords = text.split(' ');
        this.typedWords = [...new Set(this.typedWords)];
        this.typedWords.forEach(word => {
          this.serviceWord.getWordByWordAndLanguage(word, this.selectedLanguage).subscribe(data => {
            if (data != null)
              this.wordsFromDB.push(data.wordName).toString();
          }, error => {
            this.serviceNotification.showError("Error to compare word from DB. Try again later.", "Error");
            console.debug(error);
          })
        })
        console.debug("Words Splitted", this.typedWords);
      }
      else {
        this.serviceNotification.showInfo("Type any word before check it in.", "Info");
      }
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

      this.serviceWord.getWordByWordAndLanguage(word, this.selectedLanguage).subscribe(data => {
        let isWordDuplicated = data != null;
        if (isWordDuplicated)
          return;

        let userId = localStorage.getItem("userId") ?? 0;
        console.debug("Chosen Language", this.selectedLanguage);
        this.serviceWord.saveWord({ languageId: this.selectedLanguage, userId: userId, wordName: word }).subscribe(() => {
          this.serviceNotification.showSuccess("Word(s) saved.", "Success");
          console.debug("Saved Words", this.checkedWords);
        }, error => {
          this.serviceNotification.showError("Error to save words. Try again later.", "Error");
          console.debug("Error to save words. Try again later.", error);
        }, () => {
          this.checkedWords = [];
        }

        );
      });
    });

  }

  isChecked(item: string) {
    return this.wordsFromDB.includes(item.trim().toLowerCase())
  }

  onSelect(event: any) {
    if (event.target.checked && !this.checkedWords.includes(event.target.value)) {
      this.checkedWords.push(event.target.value);
      console.debug("Word Included", this.checkedWords);
    } else if (!event.target.checked) {
      var index = this.checkedWords.indexOf(event.target.value);
      if (index !== -1) {
        this.checkedWords.splice(index, 1);
      }

      console.debug("Word Included", this.checkedWords);
    }
  }

}
