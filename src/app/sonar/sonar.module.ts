import {NgModule} from '@angular/core';
import {SonarElementComponent} from './sonar.element.component';
import {HttpService} from '../common/services/app.http.service';
import {SonarService} from './services/app.sonar.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PipeModule} from '../pipe/pipe.module';
import {SonarModalBodyComponent} from './modal/sonar.modal-body.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    SonarElementComponent,
    SonarModalBodyComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PipeModule,
    RouterModule,
  ],
    exports: [
        SonarElementComponent,
        SonarModalBodyComponent,
    ],
  providers: [
    SonarService,
    HttpService,
  ]
})
export class SonarModule {}
