import { NotificationService } from './../services/notification.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { By } from '@angular/platform-browser';
import { WordsService } from '../services/words.service';
import { empty, from, Observable, of, throwError } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



describe('HomeComponent', () => {
  let component: HomeComponent;
  let service: WordsService;

  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientModule, ToastrModule.forRoot(), FormsModule, BrowserAnimationsModule],
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

  it('isDefaultChecked - should return false', () => {
    component.wordsFromDB.push("");

    let result = component.isDefaultChecked("test");

    expect(result).toBeFalse();
  });

  it('isDefaultChecked should return true', () => {
    component.wordsFromDB.push("test");

    let result = component.isDefaultChecked("test");

    expect(result).toBeTrue();

  });

  it('changeCmbLanguages - should clear variables.', () => {
    component.wordsFromDB.push("test");
    component.typedWords.push("test");
    component.checkedWords.push("test");
    let event = { target: { value: "en" } }

    component.changeCmbLanguages(event);

    expect(component.wordsFromDB).toEqual([]);
    expect(component.typedWords).toEqual([]);
    expect(component.checkedWords).toEqual([]);
  });

  it('btncheckWordsClick - should checkedWords be empty', () => {
    component.checkedWords.push("word");
    let form = { value: { text: "myword" } };

    component.btncheckWordsClick(form);

    expect(component.checkedWords).toEqual([]);
  });

  it('btncheckWordsClick - should cmblanguages has its value changed.', () => {
    let form = { value: { text: "myword", cmblanguages: "ru" } };

    component.btncheckWordsClick(form);

    expect(component.selectedLanguage).toEqual("ru")
  });

  it('btncheckWordsClick - should typedWords not have extra space.', () => {
    let form = { value: { text: "myword " } };

    component.btncheckWordsClick(form);

    expect(component.typedWords).toEqual(['myword']);
  });

  it('btncheckWordsClick - should typedWords not be duplicated.', () => {
    let form = { value: { text: "myword myword" } };

    component.btncheckWordsClick(form);

    expect(component.typedWords).toEqual(['myword']);
  });

  it('btncheckWordsClick - should subscribe getWordByWordAndLanguage with 2 words.', () => {
    let form = { value: { text: "word1 word2" } };
    let spy = spyOn(service, 'getWordByWordAndLanguage').and.returnValue(from([form.value.text]))

    component.btncheckWordsClick(form);

    expect(spy).toHaveBeenCalled();
    expect(component.typedWords.length).toBe(2);
  });

  it('btncheckWordsClick - should subscribe getWordByWordAndLanguage and shows error', () => {
    let form = { value: { text: "word" } };
    let spy = spyOn(service, 'getWordByWordAndLanguage').and.callFake(() => {
      return throwError('');
    })

    component.btncheckWordsClick(form);

    expect(spy).toHaveBeenCalled();
    expect(component.errorMessage).not.toEqual('');
  });

  it('btncheckWordsClick - should shows error if text is empty', () => {
    let form = { value: { text: "" } };

    component.btncheckWordsClick(form);

    expect(component.errorMessage).not.toEqual('');
  });

  it('btncheckWordsClick - should shows error if there is no word to add', () => {
    let form = { value: { text: "" } };

    component.btncheckWordsClick(form);

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

});
