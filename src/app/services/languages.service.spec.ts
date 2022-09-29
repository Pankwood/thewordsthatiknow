import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { LanguagesService } from './languages.service';
import { from } from 'rxjs';


describe('LanguagesService', () => {
  let service: LanguagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [LanguagesService]
    });
    service = TestBed.inject(LanguagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should subscribe getLanguages', () => {
    let languages = ['en', 'fr', 'pt'];

    spyOn(service, 'getLanguages').and.callFake(() => {
      return from([languages]);
    })

    let result = 0;
    service.getLanguages().subscribe(data => { result = data.length });
    expect(result).toBe(3);
  });

});
