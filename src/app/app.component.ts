import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'eleonore-app';

  ngOnInit(): void {
    $(() => {
      $('[data-toggle="tooltip"]').tooltip({sanitize: false, sanitizeFn: content => content});
    });
  }
}
