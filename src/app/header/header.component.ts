import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../common/base-component';
import {Router} from '@angular/router';
import {FluxService} from '../common/services/app.flux.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent extends BaseComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  private _isSignedIn = false;

  constructor(protected router: Router, private flux: FluxService) {
    super(router);
  }

  ngOnInit(): void {
    this.flux.subscriber.subscribe(dataset => {
      if (dataset.size === 0) {
        return;
      }

      if (dataset.get('header') === 'logout') {
        this._isSignedIn = false;
      }
    });
  }

  get isSignedIn(): boolean {
    return this._isSignedIn;
  }

  onLoginStatusChange(isSignedIn: boolean): void {
    this._isSignedIn = isSignedIn;
  }
}
