import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SonarModel} from '../models/sonar.model';
import {ElementType} from '../../dashboard/models/element-type.enum';
import {SonarService} from '../services/app.sonar.service';
import {SonarMetricsModel} from '../models/sonarmetrics.model';
import {ModalRole} from '../../dashboard/models/modal-role.enum';
import {BaseComponent} from '../../common/base-component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sonar-modal-body',
  templateUrl: 'sonar.modal-body.component.html',
  styleUrls: ['sonar.modal-body.component.sass']
})
export class SonarModalBodyComponent extends BaseComponent implements OnInit {
  @Input()
  private _dashboardId: number;
  @Input()
  private _sonarElement: SonarModel;
  @Input()
  private onProcess!: EventEmitter<ModalRole>;
  @Input()
  private _modalRole: ModalRole;
  @Output()
  private processCompleted: EventEmitter<SonarModel>;
  types = ElementType;
  modalRoles = ModalRole;
  private _selectedMetrics: SonarMetricsModel[];

  constructor(private sonarService: SonarService, protected router: Router) {
    super(router);
    this.onProcess = new EventEmitter<ModalRole>();
    this.processCompleted = new EventEmitter<SonarModel>();
    this._selectedMetrics = new Array<SonarMetricsModel>();
  }

  ngOnInit(): void {
    this.sonarService.importSonarMetrics();

    Object.assign(this._selectedMetrics, this._sonarElement.sonarMetrics);

    this.onProcess.subscribe(role => {
      switch (role) {
        case ModalRole.CREATION:
          this.create();
          break;
        case ModalRole.EDITION:
          this.edit();
          break;
        case ModalRole.DELETION:
          this.delete();
          break;
        case ModalRole.CANCELLATION:
        default:
          this.cancel();
      }
    });
  }

  create(): void {
    Object.assign(this._sonarElement.sonarMetrics, this._selectedMetrics);
    this.sonarService.create(this.getBaseHeader(), this._dashboardId, this._sonarElement).subscribe(res => {
      this.processCompleted.emit(res.body);
    }, error => console.log(error.message));
  }

  edit(): void {
    Object.assign(this._sonarElement.sonarMetrics, this._selectedMetrics);
    this.sonarService.edit(this.getBaseHeader(), this._sonarElement).subscribe(res => {
      this.processCompleted.emit(res.body);
    }, error => console.log(error.message));
  }

  cancel(): void {
    this._selectedMetrics = new Array<SonarMetricsModel>();
    Object.assign(this._selectedMetrics, this._sonarElement.sonarMetrics);
  }

  delete(): void {
    this.sonarService.delete(this.getBaseHeader(), this._dashboardId, this._sonarElement)
      .subscribe(res => {
        this.processCompleted.emit(this._sonarElement);
      }, error => {
        if (error.status === 401) {
          // @ts-ignore
          $(`#delElementModal${this._sonarElement.id}`).modal('hide');
          this.disconnect();
        }
      });
  }

  onSelectMetric(val: string) {
    const selectedSonarMetric = this.fromSonarMetricToSonarMetricModel(this.getMetrics().find(metric => +metric.id === +val));
    if (selectedSonarMetric && !this._selectedMetrics.some(sonarMetric => sonarMetric.metric === selectedSonarMetric.metric)) {
      this._selectedMetrics.push(selectedSonarMetric);
    }
  }

  removeMetric(metric: any) {
    this._selectedMetrics.splice(this._selectedMetrics.findIndex(m => m === metric), 1);
  }

  private fromSonarMetricToSonarMetricModel(metric: any): SonarMetricsModel {
    if (metric === undefined) {
      return undefined;
    }

    const sonarMetricsModel = new SonarMetricsModel();
    sonarMetricsModel.metric = metric.key;

    return sonarMetricsModel;
  }

  getMetrics(): any[] {
    return JSON.parse(localStorage.getItem('sonar-metrics'));
  }

  get sonarElement(): SonarModel {
    return this._sonarElement;
  }

  set sonarElement(value: SonarModel) {
    this._sonarElement = value;
  }

  get dashboardId(): number {
    return this._dashboardId;
  }

  set dashboardId(value: number) {
    this._dashboardId = value;
  }

  get selectedMetrics(): SonarMetricsModel[] {
    return this._selectedMetrics;
  }

  set selectedMetrics(value: SonarMetricsModel[]) {
    this._selectedMetrics = value;
  }

  get modalRole(): ModalRole {
    return this._modalRole;
  }

  set modalRole(value: ModalRole) {
    this._modalRole = value;
  }
}
