import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'replaceCharacters'})
export class ReplaceCharactersPipe implements PipeTransform {
  transform(content: string, oldChar: string, newChar: string): string {
    return content.replace(new RegExp(`[${oldChar}]`, 'g'), newChar);
  }
}
