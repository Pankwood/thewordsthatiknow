import { NotificationService } from '../../services/notification.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { By } from '@angular/platform-browser';
import { WordsService } from '../../services/words.service';
import { empty, from, Observable, of, throwError } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let service: WordsService;

  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientModule, ToastrModule.forRoot(), FormsModule, BrowserAnimationsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();

    service = TestBed.inject(WordsService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('if there is no word on DB it should return false', () => {
    component.wordsFromDB.push("");

    let result = component.isSavedWord("test");

    expect(result).toBeFalse();
  });

  it('if there is word on DB it should return true', () => {
    component.wordsFromDB.push("test");

    let result = component.isSavedWord("test");

    expect(result).toBeTrue();
  });

  it('when Language combobox changed it should clear variables.', () => {
    component.wordsFromDB.push("test");
    component.typedWords.push("test");
    component.checkedWords.push("test");
    let event = { target: { value: "en" } }

    component.changeCmbLanguages(event);

    expect(component.wordsFromDB).toEqual([]);
    expect(component.typedWords).toEqual([]);
    expect(component.checkedWords).toEqual([]);
  });

  it('after click on CheckWords button it should empty the variable that has the words', () => {
    component.checkedWords.push("word");
    let form = { value: { text: "myword" } };

    component.btnCheckWordsClick(form);

    expect(component.checkedWords).toEqual([]);
  });

  it('after click on CheckWords button it should get the language  from Language combobox', () => {
    let form = { value: { text: "myword", cmbLanguages: "ru" } };

    component.btnCheckWordsClick(form);

    expect(component.selectedLanguage).toEqual("ru")
  });

  it('after click on CheckWords button it should remove extra space from typed words.', () => {
    let form = { value: { text: "myword " } };

    component.btnCheckWordsClick(form);

    expect(component.typedWords).toEqual(['myword']);
  });

  it('after click on CheckWords button it should remove duplicated words from typed words.', () => {
    let form = { value: { text: "myword myword" } };

    component.btnCheckWordsClick(form);

    expect(component.typedWords).toEqual(['myword']);
  });

  it('after click on CheckWords button it should get languages from service(2 words example)', () => {
    let form = { value: { text: "word1 word2" } };
    let spy = spyOn(service, 'getWordByWordAndLanguage').and.returnValue(from([form.value.text]))

    component.btnCheckWordsClick(form);

    expect(spy).toHaveBeenCalled();
    expect(component.typedWords.length).toBe(2);
  });

  it('after click on CheckWords button it should get languages from service and handle error', () => {
    let form = { value: { text: "word" } };
    let spy = spyOn(service, 'getWordByWordAndLanguage').and.callFake(() => {
      return throwError('');
    })

    component.btnCheckWordsClick(form);

    expect(spy).toHaveBeenCalled();
    expect(component.errorMessage).not.toEqual('');
  });

  it('after click on CheckWords button it should shows error if text is empty', () => {
    let form = { value: { text: "" } };

    component.btnCheckWordsClick(form);

    expect(component.errorMessage).not.toEqual('');
  });

  it('btncheckWordsClick - should shows error if there is no word to add', () => {
    let form = { value: { text: "" } };

    component.btnCheckWordsClick(form);

    expect(component.errorMessage).not.toEqual('');
  });

  it('saveWords - should shows error if there is no word to add', () => {
    component.saveWords();

    expect(component.errorMessage).not.toEqual('');
  });

  it('saveWords - should subscribe getWordByWordAndLanguage and check if the word already exists - word exist', () => {
    component.checkedWords.push("word");
    let result = false;
    let form = { value: { text: "word" } };
    let spy = spyOn(service, 'getWordByWordAndLanguage').and.callFake(() => {
      result = component.checkedWords[0] === form.value.text;
      return from([form.value.text]);
    });

    component.saveWords();

    expect(spy).toHaveBeenCalled();
    expect(result).toBeTrue();
    expect(component.errorMessage).not.toEqual('');
  });

  it('saveWords - should subscribe getWordByWordAndLanguage and check if the word already exists - word not exist', () => {
    component.checkedWords.push("word");
    let spy = spyOn(service, 'getWordByWordAndLanguage').and.callFake(() => {
      return empty();
    });

    component.saveWords();

    expect(spy).toHaveBeenCalled();
    expect(component.errorMessage).toEqual('');
  });

  it('saveWords - should subscribe saveWords', () => {
    component.checkedWords.push("wordx");
    let spy;
    spyOn(service, 'getWordByWordAndLanguage').and.callFake(() => {
      spy = spyOn(service, 'saveWord').and.returnValue(from(component.checkedWords));
      return from(of(null));//it didn't accept just null, but accepted of(null)
    });

    component.saveWords();

    expect(spy).toHaveBeenCalled();
    expect(component.checkedWords.length).toBe(0);
    expect(component.selectedLanguage).not.toEqual('');
  });

  it('wordChkSelect - should event value not be empty', () => {
    let event = { target: { value: "myword" } };

    component.wordChkSelect(event);

    expect(event.target.value).not.toEqual('');
    expect(event.target.value).not.toBeNull();
  });

  it('wordChkSelect - should add word into checkedWords', () => {
    component.checkedWords = [];
    component.checkedWords.push('otherWord');
    component.wordsFromDB.push('otherWord2');
    let event = { target: { value: "word", checked: true } };

    component.wordChkSelect(event);

    expect(component.checkedWords[1]).toEqual('word');
  });

  it('wordChkSelect - should remove word into checkedWords', () => {
    component.checkedWords = [];
    component.checkedWords.push('word');
    let event = { target: { value: "word", checked: false } };

    component.wordChkSelect(event);

    expect(component.checkedWords.indexOf('word')).toEqual(-1);
  });

  it('wordChkSelect - should checkedWords not changed', () => {
    component.checkedWords = [];
    component.checkedWords.push('word1');
    let event = { target: { value: "word2", checked: false } };

    component.wordChkSelect(event);

    expect(component.checkedWords[0]).toEqual("word1");
  });

  it('wordChkSelect - should checkedWords not changed', () => {
    component.checkedWords = [];
    component.checkedWords.push('word1');
    let event = { target: { value: "word1", checked: true } };

    component.wordChkSelect(event);

    expect(component.checkedWords[0]).toEqual("word1");
  });

  it('isTypedWords - should return true', () => {
    component.typedWords.push('word1');

    let result = component.isTypedWords();

    expect(result).toBeTrue();
  });

  it('isTypedWords - should return false', () => {
    component.typedWords = [];

    let result = component.isTypedWords();

    expect(result).toBeFalse();
  });

  it('countCharacteres - should return 0', () => {
    component.maxLengthWord = 10;

    component.countCharacteres('1234567890');

    expect(component.remainCharacter).toEqual(0);
  });

});
