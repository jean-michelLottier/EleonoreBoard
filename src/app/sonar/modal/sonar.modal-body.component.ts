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
  @Output()
  private processCompleted: EventEmitter<SonarModel>;
  types = ElementType;

  constructor(private sonarService: SonarService, protected router: Router) {
    super(router);
    this.onProcess = new EventEmitter<ModalRole>();
    this.processCompleted = new EventEmitter<SonarModel>();
  }

  ngOnInit(): void {
    this.sonarService.importSonarMetrics();

    this.onProcess.subscribe(role => {
      if (role === ModalRole.CREATION) {
        this.create();
      } else {
        this.edit();
      }
    });
  }

  create(): void {
    this.sonarService.create(this.getBaseHeader(), this._dashboardId, this._sonarElement).subscribe(res => {
      this.processCompleted.emit(res.body);
    }, error => console.log(error.message));
  }

  edit(): void {

  }

  onSelectMetric(val: string) {
    const selectedSonarMetric = this.fromSonarMetricToSonarMetricModel(this.getMetrics().find(metric => +metric.id === +val));
    if (selectedSonarMetric && !this._sonarElement.sonarMetrics.some(sonarMetric => sonarMetric.metric === selectedSonarMetric.metric)) {
      this._sonarElement.sonarMetrics.push(selectedSonarMetric);
    }
  }

  removeMetric(metric: any) {
    this._sonarElement.sonarMetrics.splice(this._sonarElement.sonarMetrics.findIndex(m => m === metric), 1);
  }

  fromSonarMetricToSonarMetricModel(metric: any): SonarMetricsModel {
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
}
