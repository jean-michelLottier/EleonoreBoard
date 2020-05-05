import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'convertRating'})
export class RatingPipe implements PipeTransform {
  transform(value: string, ...args: any[]): string {
    let rating;
    switch (parseInt(value, 10)) {
      case 1:
        rating = 'A';
        break;
      case 2:
        rating = 'B';
        break;
      case 3:
        rating = 'C';
        break;
      case 4:
        rating = 'D';
        break;
      case 5:
        rating = 'E';
        break;
    }

    return rating;
  }
}
