import {Component} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {
  get isSignedIn(): boolean {
    return this._isSignedIn;
  }
  // tslint:disable-next-line:variable-name
  private _isSignedIn = false;

  constructor() {
  }

  onLoginStatusChange(isSignedIn: boolean): void {
    this._isSignedIn = isSignedIn;
  }
}
