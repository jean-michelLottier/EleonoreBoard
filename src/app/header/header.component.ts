import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  private _isSignedIn = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  get isSignedIn(): boolean {
    return this._isSignedIn;
  }

  onLoginStatusChange(isSignedIn: boolean): void {
    this._isSignedIn = isSignedIn;
  }
}
