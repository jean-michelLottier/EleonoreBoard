import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {DashboardModalComponent} from './dashboard/modal/dashboard.modal.component';
import {ElementComponent} from './element/element.component';
import {ElementModalComponent} from './element/modal/element.modal.component';
import {HeaderComponent} from './header/header.component';
import {LoginComponent} from './login/login.component';
import {NavComponent} from './nav/nav.component';

import {HttpService} from './services/app.http.service';
import {LoginService} from './login/login.service';
import {FluxService} from './services/app.flux.service';
import {SonarService} from './services/app.sonar.service';

import {ReplaceCharactersPipe} from './pipe/app-replacecharacters-pipe';
import {CapitalizePipe} from './pipe/app-capitalize-pipe';

@NgModule({
  declarations: [
    AppComponent,
    BreadcrumbComponent,
    CapitalizePipe,
    DashboardComponent,
    DashboardModalComponent,
    ElementComponent,
    ElementModalComponent,
    HeaderComponent,
    LoginComponent,
    NavComponent,
    ReplaceCharactersPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [FluxService, HttpService, LoginService, SonarService],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule {
}
