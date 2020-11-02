import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'convertPeriod'})
export class PeriodFormatterPipe implements PipeTransform {
  transform(valueStr: string, ...args: any[]): string {
    const value = parseInt(valueStr, 10);
    const hour = Math.floor(value / 60);
    const minutes = value - hour * 60;

    if (hour === 0) {
      return `${minutes}min`;
    }

    return `${hour}h ${minutes}min`;
  }
}
