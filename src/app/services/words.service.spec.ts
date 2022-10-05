import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { WordsService } from './words.service';
import { from, empty } from 'rxjs';


describe('WordsService', () => {
  let service: WordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [WordsService]
    });
    service = TestBed.inject(WordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should subscribe getWords', () => {
    let words = ['word1', 'word2', 'word3']
    let result = 0;
    let spy = spyOn(service, 'getWords').and.callFake(() => {
      return from([words]);
    })

    service.getWords().subscribe(data => { result = data.length });

    expect(spy).toHaveBeenCalled();
    expect(result).toBe(3);
  });

  it('should subscribe getWordByWordAndLanguage', () => {
    let word = ['word1'];
    let result = 0;
    let spy = spyOn(service, 'getWordByWordAndLanguage').and.callFake(() => {
      return from([word]);
    })

    service.getWordByWordAndLanguage("arg1", "arg2").subscribe(data => { result = data.length });

    expect(spy).toHaveBeenCalled();
    expect(result).toBe(1);
  });

  it('should subscribe saveWord', () => {
    let spy = spyOn(service, 'saveWord').and.callFake(() => {
      return empty();
    })

    service.saveWord("word");

    expect(spy).toHaveBeenCalled();
  });

});
