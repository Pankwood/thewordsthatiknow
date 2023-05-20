import { AuthService } from './../../services/auth.service';
import { LanguagesService } from '../../services/languages.service';
import { Component, OnInit } from '@angular/core';
import { WordsService } from '../../services/words.service';
import { NotificationService } from '../../services/notification.service';
import { processWordsByConfiguration } from '../../../utils';
import { TranslationService } from 'src/app/services/vendors/translation.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  wordsFromDB: string[] = [];
  typedWords: string[] = [];
  countChararacteres: string = "";
  checkedWords: string[] = [];
  languages: any = [];
  selectedLanguage: string = "en";
  errorMessage: string = "";
  maxLengthWord: number = 100000;
  remainCharacter: number = this.maxLengthWord;
  selectLanguage = "en";
  bannerIsExpanded = true;
  isTranslationEnable = environment.IS_TRANSLATION_ENABLE;
  translationTimeFrame: ReturnType<typeof setTimeout> = setTimeout(() => '', 0);

  constructor(private serviceWord: WordsService, private serviceLanguage: LanguagesService,
    private serviceNotification: NotificationService, private authService: AuthService,
    private translationService: TranslationService) {

  }
  ngOnInit(): void {
    //The data will fill the cmbLanguage field.
    this.serviceLanguage.getLanguages().subscribe(data => {
      this.languages = data;
      if (data.length <= 0)
        this.serviceNotification.showError("There is no language data to show. Contact the administrator.", "Error");

      //Set Language combobox to remember the last user's choice
      var lastLanguage = localStorage.getItem("lastLanguage");
      this.selectLanguage = lastLanguage ? lastLanguage : "en";

      //Set Banner show/hide button to remember the last user's choice
      this.bannerIsExpanded = localStorage.getItem("bannerIsExpanded") == "0" ? false : true;

    }, error => {
      this.serviceNotification.showError("Error to load languages. Try again later.", "Error");
      console.dir("Error to load languages.", error);
    });
  }

  clearForm() {
    this.wordsFromDB = [];
    this.typedWords = [];
    this.checkedWords = [];
  }

  changeCmbLanguages(event: any) {
    console.debug("Language selected", event.target.value);
    localStorage.setItem("lastLanguage", event.target.value);
    this.clearForm();
  }

  isTypedWords(): boolean {
    return this.typedWords.length > 0 && this.typedWords[0] != '';
  }

  btnCheckWordsClick(form: any) {
    //Get language from combobox cmbLanguages
    this.selectedLanguage = form.value.cmbLanguages ?? "en";
    this.clearForm();

    this.typedWords = processWordsByConfiguration(form.value.text, form.value.chkRemoveHTML, form.value.chkRemoveNumbers,
      form.value.chkRemoveDuplicated, form.value.txtReplaceChars);
    if (this.isTypedWords()) {
      this.typedWords.forEach(word => {
        this.serviceWord.getWordByParameters(word, this.selectedLanguage, this.authService.currentUser.userId).subscribe(data => {
          if (data != null)
            this.wordsFromDB.push(data.wordName).toString();
        }, error => {
          this.errorMessage = "Error to compare word from DB. Try again later.";
          this.serviceNotification.showError(this.errorMessage, "Error");
          console.debug(error);
        })
      })
      console.debug("Words Splitted", this.typedWords);
    }
    else {
      this.errorMessage = "Type any word before check it in.";
      this.serviceNotification.showWarning(this.errorMessage, "Warning");
    }
  }
  countCharacteres(text: string) {
    this.remainCharacter = this.maxLengthWord - text.length;
  }

  saveWords() {
    //Validate if there is words to be checked
    if (this.checkedWords.length <= 0) {
      this.errorMessage = "Word(s) has/have been already saved. Please choose another word(s).";
      this.serviceNotification.showWarning(this.errorMessage, "Warning");
      return;
    }
    //For each word of checkedWords array do:
    this.checkedWords.forEach(word => {
      //Get word and language from DB
      this.serviceWord.getWordByParameters(word, this.selectedLanguage, this.authService.currentUser.userId).subscribe(data => {
        //If there is word and language from the DB equal to the word and language the user is trying to save, skip it.
        let isWordDuplicated = data != null;

        if (isWordDuplicated) {
          this.errorMessage = "Duplicated word";//not showing to the user
          return;
        }

        if (!this.authService.currentUser.userId) {
          console.debug("User not logged in", this.authService.currentUser)
          this.errorMessage = "User not logged in";//not showing to the user
          return;
        }

        let userId = this.authService.currentUser.userId;
        console.debug("Chosen Language", this.selectedLanguage);
        //Saving word, language and userId
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

  //TODO Change to isSavedWord - remove functions name from test
  isSavedWord(item: string) {
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
    }
  }

  bannerToggle() {
    this.bannerIsExpanded = !this.bannerIsExpanded;
    localStorage.setItem("bannerIsExpanded", this.bannerIsExpanded ? "1" : "0");
  }


  getTranslation(event: any, word: string) {
    if (event.target.title === "" && this.isTranslationEnable) {
      this.translationTimeFrame = setTimeout(() => {
        this.translationService.getTranslation(word, this.selectedLanguage, "pt").subscribe((translatedText: string) => {
          event.target.setAttribute('title', translatedText.toLowerCase());
        }, error => {
          event.target.setAttribute('title', word);
        })
      }, 900);
    }
  }

  resetTime() {
    //The mouseenter will be trigger if the user stay the mouse cursor for 900ms, 
    //if the user move the mouse cursor out, the timeout restarts.
    //This feature avoid to call the translation API to much times.
    clearTimeout(this.translationTimeFrame);
  }
}
