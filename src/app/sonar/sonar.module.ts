import {NgModule} from '@angular/core';
import {SonarElementComponent} from './sonar.element.component';
import {HttpService} from '../common/services/app.http.service';
import {SonarService} from './services/app.sonar.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PipeModule} from '../pipe/pipe.module';

@NgModule({
  declarations: [
    SonarElementComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PipeModule,
  ],
  exports: [
    SonarElementComponent,
  ],
  providers: [
    SonarService,
    HttpService,
  ]
})
export class SonarModule {}
