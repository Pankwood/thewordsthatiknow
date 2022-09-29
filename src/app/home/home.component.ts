import { LanguagesService } from './../services/languages.service';
import { Component } from '@angular/core';
import { WordsService } from '../services/words.service';
import { NotificationService } from '../services/notification.service';
import { clearForms, removeExtraSpace } from '../../utils';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  wordsFromDB: string[] = [];
  typedWords: string[] = [];
  checkedWords: string[] = [];
  languages: any = [];
  selectedLanguage: string = "en";

  constructor(private serviceWord: WordsService, private serviceLanguage: LanguagesService, private serviceNotification: NotificationService) {
    //The data will fill the cmbLanguage field.
    this.serviceLanguage.getLanguages().subscribe(data => {
      this.languages = data;
      if (data.length <= 0)
        this.serviceNotification.showError("There is no language data to show. Contact the administrator.", "Error");

      console.debug("Languages", this.languages);
    }, error => {
      this.serviceNotification.showError("Error to load languages. Try again later.", "Error");
      console.dir("Error to load languages.", error);
    });
  }

  changeCmbLanguages(event: any) {
    console.debug("Language selected", event.target.value);
    clearForms([this.wordsFromDB, this.typedWords, this.checkedWords]);
  }

  btncheckWordsClick(form: any) {
    try {
      let text = removeExtraSpace(form.value.text);
      //Get language from combobox cmblanguages
      this.selectedLanguage = form.value.cmblanguages ?? "en";
      clearForms([this.wordsFromDB, this.typedWords, this.checkedWords]);
      if (text != "") {
        //Split all word in an array
        this.typedWords = text.split(' ');
        //Remove duplicated words
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
        this.serviceNotification.showWarning("Type any word before check it in.", "Warning");
      }
    } catch (error) {
      this.serviceNotification.showError("Error to show words. Try again later.", "Error");
      console.dir("Error to show words.", error);
    }
  }

  saveWords() {
    //Validate if there is words to be checked
    if (this.checkedWords.length <= 0) {
      this.serviceNotification.showWarning("Choose the words you know before save it.", "Warning");
      return;
    }

    //For each word of checkedWords array do:
    this.checkedWords.forEach(word => {
      //Get word and language from DB
      this.serviceWord.getWordByWordAndLanguage(word, this.selectedLanguage).subscribe(data => {
        //If there is word and language from the DB equal to the word and language the user is trying to save, skip it.
        let isWordDuplicated = data != null;
        if (isWordDuplicated)
          return;

        //For now, ignore the userId
        let userId = localStorage.getItem("userId") ?? 0;
        console.debug("Chosen Language", this.selectedLanguage);
        //Saving the word and language (and userId)
        this.serviceWord.saveWord({ languageId: this.selectedLanguage, userId: userId, wordName: word }).subscribe(() => {
          this.serviceNotification.showSuccess("Word(s) saved.", "Success");
          console.debug("Saved Words", this.checkedWords);
        }, error => {
          this.serviceNotification.showError("Error to save words. Try again later.", "Error");
          console.debug("Error to save words. Try again later.", error);
        }, () => {
          this.checkedWords = [];
        });
      });
    });
  }

  isDefaultChecked(item: string) {
    //Check if the word exist in the DB and mark it as checked(green)
    return this.wordsFromDB.includes(item.trim().toLowerCase())
  }

  //This event is triggered when the user check/uncheck a word
  wordChkSelect(event: any) {
    //check if the word is checked already, if it is already in the checkedWords variable(avoiding duplicate words) and if
    //the word is already in the DB
    if (event.target.checked && !this.checkedWords.includes(event.target.value) && !this.wordsFromDB.includes(event.target.value)) {
      this.checkedWords.push(event.target.value);
      console.debug("Word Included", this.checkedWords);
    } else if (!event.target.checked) {
      //remove the unchecked word from checkedWords variable
      var index = this.checkedWords.indexOf(event.target.value);
      if (index !== -1) {
        this.checkedWords.splice(index, 1);
      }
      console.debug("Word Included", this.checkedWords);
    }
  }
}
