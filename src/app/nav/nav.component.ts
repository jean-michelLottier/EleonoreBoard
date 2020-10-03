import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {FluxService} from '../common/services/app.flux.service';
import {BaseComponent} from '../common/base-component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass'],
})
export class NavComponent extends BaseComponent implements OnInit {
  constructor(private location: Location, private flux: FluxService, protected router: Router) {
    super(router);
  }

  // tslint:disable-next-line:variable-name
  private _isReadOnly: boolean;

  get isReadOnly(): boolean {
    return this._isReadOnly;
  }

  ngOnInit(): void {
    if (this.location.path().endsWith('logout')) {
      this._isReadOnly = true;
    } else {
      this._isReadOnly = false;
    }

    this.flux.subscriber.subscribe(dataset => {
      if (dataset.size === 0 && this._isReadOnly) {
        return;
      }

      if (dataset.get('nav') === 'logout') {
        this._isReadOnly = true;
      } else {
        this._isReadOnly = false;
      }
    });
  }
}
