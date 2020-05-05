import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'convertList'})
export class ListConverterPipe implements PipeTransform {
  transform(content: string, separator: string): Array<string> {
    return content.split(separator);
  }
}
