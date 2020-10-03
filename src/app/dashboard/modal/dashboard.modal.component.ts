import {Component, EventEmitter, Output} from '@angular/core';
import {DashboardModel} from '../models/dasboard.model';
import {HttpService} from '../../common/services/app.http.service';
import {BaseComponent} from '../../common/base-component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard-modal',
  templateUrl: 'dashboard.modal.component.html',
  styleUrls: ['dashboard.modal.component.sass']
})
export class DashboardModalComponent extends BaseComponent {
  newDashboard: DashboardModel;
  @Output()
  newDashboardEvent = new EventEmitter<DashboardModel>();

  constructor(private http: HttpService, protected router: Router) {
    super(router);
    this.newDashboard = new DashboardModel();
  }

  createDashboard(): void {
    const headers = this.getBaseHeader();

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
