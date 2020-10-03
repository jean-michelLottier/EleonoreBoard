import {Component, OnInit} from '@angular/core';
import {FluxService} from '../common/services/app.flux.service';
import {PathModel} from '../common/models/path.model';

@Component({
  selector: 'app-logout',
  templateUrl: 'logout.component.html',
  styles: ['.eleonore-logout {text-align: center}']
})
export class LogoutComponent implements OnInit {
  constructor(private flux: FluxService) {
  }

  ngOnInit(): void {
    this.flux.publish(new Map<string, any>()
      .set('nav', 'logout')
      .set('breadcrumb', new PathModel('logout', false))
      .set('header', 'logout')
    );
  }
}
