import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LoginService} from './services/login.service';
import {Router} from '@angular/router';
import {FluxService} from '../common/services/app.flux.service';
import {PathModel} from '../common/models/path.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  private static X_AUTH_TOKEN = 'X-Auth-Token';
  login: string;
  password: string;
  @Output()
  isSignedIn: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private loginService: LoginService, private router: Router, private flux: FluxService) {
  }

  ngOnInit(): void {
    const xAuthToken = localStorage.getItem(LoginComponent.X_AUTH_TOKEN);
    if (xAuthToken) {
      this.isSignedIn.emit(true);
    } else {
      this.isSignedIn.emit(false);
      this.flux.publish(new Map<string, any>()
        .set('nav', 'logout')
        .set('breadcrumb', new PathModel('logout', false))
      );
    }
  }

  signIn(): void {
    this.loginService.signIn({login: this.login, password: this.password}).subscribe(res => {
      const xAuthToken = res.headers.get(LoginComponent.X_AUTH_TOKEN);
      if (xAuthToken) {
        localStorage.setItem(LoginComponent.X_AUTH_TOKEN, res.headers.get(LoginComponent.X_AUTH_TOKEN));
      }

      this.isSignedIn.emit(true);
      // @ts-ignore
      $('#signInModal').modal('hide');
      this.flux.publish(new Map<string, any>()
        .set('nav', 'dashboard')
        .set('breadcrumb', new PathModel('dashboard', true))
      );
      this.router.navigate(['/dashboard']);
    }, error => console.log(error));
  }

  signOut(): void {
    this.loginService.signOut().subscribe(res => {
      localStorage.clear();
      this.isSignedIn.emit(false);
      // @ts-ignore
      $('#signOutModal').modal('hide');
      this.flux.publish(new Map<string, any>()
        .set('nav', 'logout')
        .set('breadcrumb', new PathModel('logout', false))
      );
      this.router.navigate(['/logout']);
    }, error => console.log(error));
  }
}
