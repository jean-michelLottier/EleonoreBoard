import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ElementModel} from '../models/element.model';
import {ElementType} from './modal/element.modal.component';
import {SonarService} from '../../sonar/services/app.sonar.service';
import {HttpService} from '../../common/services/app.http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-element',
  templateUrl: 'element.component.html',
  styleUrls: ['element.component.sass'],
})
export class ElementComponent implements OnInit {
  @Input()
  dashboardId: number;
  @Input()
  element: ElementModel;
  elementTypes = ElementType;
  component: object;
  @Output()
  eventDeleteElt: EventEmitter<number>;

  constructor(private sonarService: SonarService, private http: HttpService, private router: Router) {
    this.element = new ElementModel();
    this.component = {};
    this.eventDeleteElt = new EventEmitter<number>();
  }

  ngOnInit(): void {
    $(() => {
      $('[data-toggle="tooltip"]').tooltip({sanitize: false, sanitizeFn: content => content});
    });

    this.getElementInformation();
  }

  getElementInformation() {
    if (this.element.type === ElementType.SONAR.toString()) {
      this.sonarService.getMetrics(this.element.id)
        .subscribe(res => this.component = res.body
          , error => {
            if (error.status === 401) {
              this.disconnect();
            }
          });
    }
  }

  delete(): void {
    const headers = new Map();
    const xAuthToken = localStorage.getItem('X-Auth-Token');
    if (xAuthToken) {
      headers.set('X-Auth-Token', xAuthToken);
      headers.set('Content-Type', 'application/json');
    }

    const urlParams = new Map<string, string>();
    urlParams.set('dashboardId', String(this.dashboardId));
    urlParams.set('elementId', String(this.element.id));
    urlParams.set('type', this.element.type);

    this.http.delete('/dashboard/element', undefined, urlParams, headers)
      .subscribe(res => {
        this.eventDeleteElt.emit(this.element.id);
      }, error => {
        if (error.status === 401) {
          // @ts-ignore
          $('#delElementModal').modal('hide');
          this.disconnect();
        }
      });
  }

  disconnect(): void {
    localStorage.clear();
    this.router.navigate(['/logout']);
  }
}
