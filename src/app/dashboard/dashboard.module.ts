import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DashboardRoutingModule} from './dashboard-routing.module';

import {DashboardComponent} from './dashboard.component';
import {DashboardModalComponent} from './modal/dashboard.modal.component';

import {HttpService} from '../common/services/app.http.service';
import {ElementComponent} from './element/element.component';
import {ElementModalComponent} from './element/modal/element.modal.component';
import {SonarModule} from '../sonar/sonar.module';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardModalComponent,
    ElementComponent,
    ElementModalComponent,
  ],
  imports: [
    SonarModule,
    CommonModule,
    FormsModule,
    DashboardRoutingModule
  ],
  providers: [
    HttpService,
  ]
})
export class DashboardModule { }
