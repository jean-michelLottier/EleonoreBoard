import {NgModule} from '@angular/core';
import {CapitalizePipe} from './app-capitalize-pipe';
import {ListConverterPipe} from './app-listconverter-pipe';
import {PeriodFormatterPipe} from './app-periodformatter-pipe';
import {RatingPipe} from './app-rating-pipe';
import {ReplaceCharactersPipe} from './app-replacecharacters-pipe';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    CapitalizePipe,
    ListConverterPipe,
    PeriodFormatterPipe,
    RatingPipe,
    ReplaceCharactersPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    CapitalizePipe,
    ListConverterPipe,
    PeriodFormatterPipe,
    RatingPipe,
    ReplaceCharactersPipe,
  ]
})
export class PipeModule { }
