import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {FluxService} from '../services/app.flux.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass'],
})
export class NavComponent implements OnInit {
  constructor(private location: Location, private flux: FluxService) {
  }

  // tslint:disable-next-line:variable-name
  private _isReadOnly: boolean;

  get isReadOnly(): boolean {
    return this._isReadOnly;
  }

  ngOnInit(): void {
    if (this.location.path().endsWith('login')) {
      this._isReadOnly = true;
    } else {
      this._isReadOnly = false;
    }

    this.flux.subscriber.subscribe(dataset => {
      if (dataset.size === 0 && this._isReadOnly) {
        return;
      }

      if (dataset.get('nav') === 'login') {
        this._isReadOnly = true;
      } else {
        this._isReadOnly = false;
      }
    });
  }
}
