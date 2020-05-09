import {Component, OnInit} from '@angular/core';
import {DashboardModel} from '../models/dasboard.model';
import {HttpService} from '../services/app.http.service';
import {SonarModel} from '../models/sonar.model';
import {ElementType, ModalRole} from '../element/modal/element.modal.component';
import {ElementModel} from '../models/element.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  dashboards: DashboardModel[];
  selectedDashboard: DashboardModel;

  modalRoles = ModalRole;

  elementTypes = ElementType;
  element: ElementModel;

  constructor(private http: HttpService, private router: Router) {
    this.selectedDashboard = new DashboardModel();
  }

  ngOnInit(): void {
    this.listDashboards();
  }

  // @ts-ignore
  listDashboards(): DashboardModel[] {
    const headers = new Map();
    const xAuthToken = localStorage.getItem('X-Auth-Token');
    if (xAuthToken) {
      headers.set('X-Auth-Token', xAuthToken);
      headers.set('Content-Type', 'application/json');
    }

    this.http.get<DashboardModel[]>('/dashboard/list', undefined, undefined, headers)
      .subscribe(res => {
          if (res.body) {
            this.dashboards = res.body;
          }

          if (this.dashboards) {
            this.selectDashboard(this.dashboards[0]);
          }
        },
        error => {
          if (error.status === 401) {
            this.disconnect();
          }
        });
  }

  onNewDashboardCreated(newDashboard: DashboardModel): void {
    this.dashboards.push(newDashboard);
  }

  onNewElementCreated(element: ElementModel): void {
    if (!this.selectedDashboard.elements) {
      this.selectedDashboard.elements = [];
    }

    this.selectedDashboard.elements.push(element);
  }

  onElementDeleted(elementId: number): void {
    // Reload the selected dashboard to take in count modification caused by the element removal
    this.selectDashboard(this.selectedDashboard);
  }

  selectDashboard(dashboard: DashboardModel): void {
    const headers = new Map();
    const xAuthToken = localStorage.getItem('X-Auth-Token');
    if (xAuthToken) {
      headers.set('X-Auth-Token', xAuthToken);
      headers.set('Content-Type', 'application/json');
    }

    const urlParams = new Map<string, string>();
    urlParams.set('id', dashboard.id.toString());

    this.http.get<DashboardModel>('/dashboard', undefined, urlParams, headers)
      .subscribe(res => this.selectedDashboard = res.body
        , error => {
          if (error.status === 401) {
            this.disconnect();
          }
        });
  }

  openNewElementModal(type: ElementType): void {
    switch (type) {
      case ElementType.SONAR:
        this.element = new SonarModel();
        break;
      case ElementType.JENKINS:
      default:
    }
  }

  disconnect(): void {
    localStorage.clear();
    this.router.navigate(['/logout']);
  }
}
