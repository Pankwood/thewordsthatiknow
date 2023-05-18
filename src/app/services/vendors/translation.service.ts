import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  urlAPI = environment.API_URL_TRANSLATION;


  constructor(private http: HttpClient) { }

  getTranslation(text: string, sourceLang: string, targetLang: string) {
    const url = this.urlAPI + `get?q=${text}&langpair=${sourceLang}|${targetLang}`;
    console.debug(url);
    return this.http.get(url).pipe(
      map((data: any) => data.responseData.translatedText),
      shareReplay(1)
    )
  };

}
