import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {DashboardModule} from './dashboard/dashboard.module';
import {PipeModule} from './pipe/pipe.module';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';
import {HeaderComponent} from './header/header.component';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './login/logout.component';
import {NavComponent} from './nav/nav.component';

import {HttpService} from './common/services/app.http.service';
import {LoginService} from './login/services/login.service';
import {FluxService} from './common/services/app.flux.service';
import {SonarModule} from './sonar/sonar.module';

@NgModule({
  declarations: [
    AppComponent,
    BreadcrumbComponent,
    HeaderComponent,
    LoginComponent,
    LogoutComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    DashboardModule,
    SonarModule,
    PipeModule,
    AppRoutingModule, // It has to be the last module imported
  ],
  exports: [
  ],
  providers: [FluxService, HttpService, LoginService],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule {
}
