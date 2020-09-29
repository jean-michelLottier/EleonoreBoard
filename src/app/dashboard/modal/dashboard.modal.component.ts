import {Component, EventEmitter, Output} from '@angular/core';
import {DashboardModel} from '../models/dasboard.model';
import {HttpService} from '../../common/services/app.http.service';

@Component({
  selector: 'app-dashboard-modal',
  templateUrl: 'dashboard.modal.component.html',
  styleUrls: ['dashboard.modal.component.sass']
})
export class DashboardModalComponent {
  newDashboard: DashboardModel;
  @Output()
  newDashboardEvent = new EventEmitter<DashboardModel>();

  constructor(private http: HttpService) {
    this.newDashboard = new DashboardModel();
  }

  createDashboard(): void {
    const headers = new Map();
    const xAuthToken = localStorage.getItem('X-Auth-Token');
    if (xAuthToken) {
      headers.set('X-Auth-Token', xAuthToken);
      headers.set('Content-Type', 'application/json');
    }

    this.http.post<DashboardModel>('/dashboard/new', undefined, undefined, this.newDashboard, headers)
      .subscribe(res => {
        this.newDashboardEvent.emit(res.body);
        this.clearNewDashboard();
        // @ts-ignore
        $('#dashboardModal').modal('hide');
      }, error => console.log('Failed to create new dashboard'));
  }

  clearNewDashboard(): void {
    this.newDashboard = new DashboardModel();
  }
}
