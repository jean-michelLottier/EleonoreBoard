import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'capitalize'})
export class CapitalizePipe implements PipeTransform {
  transform(content: string, separator: string): string {
    return content.split(separator).map((word, index) => word[0].toUpperCase() + word.slice(1)).join(' ');
  }
}
