import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextProcessorService {

  constructor() { }
  processWordsByConfiguration(text: string, removeHTML: boolean, removeNumbers: boolean, removeDuplicated: boolean, replaceChars: string) {
    if (removeHTML) {
      text = this.removeHTMLFromString(text);
    }

    if (removeNumbers) {
      text = this.removeNumbersFromString(text);
    }

    if (replaceChars) {
      text = this.removeSpecialCharactersFromString(text, replaceChars);
    }

    if (removeDuplicated) {
      text = this.removeDuplicateFromString(text);
    }

    text = text.replace(/[\n\r]/g, ' ').trim().toLowerCase();

    let textArray = text
      .split(' ')
      .filter(String)
      .filter(item => item !== '-');

    return textArray;
  }

  private removeHTMLFromString(text: string): string {
    return text.replace(/(<([^>]+)>)/ig, '');
  }

  private removeDuplicateFromString(text: string): string {
    let textArray = text.split(' ');
    textArray = [...new Set(textArray)];
    return textArray.join(' ');
  }

  private removeNumbersFromString(text: string): string {
    return text.replace(/[0-9]/g, '');
  }

  private removeSpecialCharactersFromString(text: string, chars: string): string {
    const addRegex = /[\\\]]/g;
    chars = chars.replace(addRegex, '\\$&');

    const regex = new RegExp(`[${chars}]`, 'g');
    return text.replace(regex, ' ');
  }
}
