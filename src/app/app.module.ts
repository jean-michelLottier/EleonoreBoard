import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeaderComponent} from './header/header.component';
import {LoginComponent} from './login/login.component';
import {NavComponent} from './nav/nav.component';

import {HttpService} from './services/app.http.service';
import {LoginService} from './login/login.service';
import {FluxService} from './services/app.flux.service';

@NgModule({
  declarations: [
    AppComponent,
    BreadcrumbComponent,
    DashboardComponent,
    HeaderComponent,
    LoginComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [FluxService, HttpService, LoginService],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule {
}
