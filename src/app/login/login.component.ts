import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LoginService} from './login.service';
import {Router} from '@angular/router';
import {FluxService} from '../services/app.flux.service';
import {PathModel} from '../models/path.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router, private flux: FluxService) {
    this.isSignedIn.emit(false);
  }

  private static X_AUTH_TOKEN = 'X-Auth-Token';
  login: string;
  password: string;
  @Output()
  isSignedIn: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit(): void {
    const xAuthToken = localStorage.getItem(LoginComponent.X_AUTH_TOKEN);
    if (xAuthToken) {
      this.isSignedIn.emit(true);
    }
  }

  signIn(): void {
    console.log(`Sign in event: login = ${this.login}, password = ${this.password}`);
    this.loginService.signIn({login: this.login, password: this.password}).subscribe(res => {
      const xAuthToken = res.headers.get('X-Auth-Token');
      if (xAuthToken) {
        localStorage.setItem('X-Auth-Token', res.headers.get('X-Auth-Token'));
      }

      this.isSignedIn.emit(true);
      console.log('User successfully signed in');
      // @ts-ignore
      $('#signInModal').modal('hide');
      this.flux.publish(new Map<string, any>()
        .set('nav', 'dashboard')
        .set('breadcrumb', new PathModel('dashboard', true))
      );
      // this.flux.publish(new Map<string, any>().set('breadcrumb', new PathModel('dashboard', false)))
      this.router.navigate(['/dashboard']);
    }, error => console.log(error));
  }

  signOut(): void {
    this.loginService.signOut().subscribe(res => {
      localStorage.clear();
      this.isSignedIn.emit(false);
      console.log('User successfully signed out');
      // @ts-ignore
      $('#signOutModal').modal('hide');
      this.flux.publish(new Map<string, string>().set('nav', 'login'));
      this.router.navigate(['/login']);
    }, error => console.log(error));
  }
}
