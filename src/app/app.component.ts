import {Component, OnInit} from '@angular/core';
import {BaseComponent} from './common/base-component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent extends BaseComponent implements OnInit {
  title = 'eleonore-app';

  constructor(protected router: Router) {
    super(router);
  }

  ngOnInit(): void {
    $(() => {
      $('[data-toggle="tooltip"]').tooltip({sanitize: false, sanitizeFn: content => content});
    });
  }
}
