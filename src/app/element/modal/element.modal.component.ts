import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ElementModel} from '../../models/element.model';
import {SonarModel} from '../../models/sonar.model';
import {HttpClient} from '@angular/common/http';
import {HttpService} from '../../services/app.http.service';
import {SonarMetricsModel} from '../../models/sonarmetrics.model';

@Component({
  selector: 'app-element-modal',
  templateUrl: 'element.modal.component.html',
  styleUrls: ['element.modal.component.sass']
})
export class ElementModalComponent implements OnInit {
  modalRoles = ModalRole;
  types = ElementType;
  sonarMetrics: any[];
  selectedSonarMetrics: any[];
  @Input()
  modalRole: ModalRole;
  @Input()
  element: ElementModel;
  @Input()
  dashboardId: number;
  @Output()
  eventElement: EventEmitter<ElementModel>;

  constructor(private httpService: HttpClient, private http: HttpService) {
    this.element = new ElementModel();
    this.selectedSonarMetrics = [];
    this.eventElement = new EventEmitter<ElementModel>();
  }

  ngOnInit(): void {
    this.getSonarMetrics();
  }

  process(): void {
    if (this.modalRole === ModalRole.CREATION) {
      this.createElement();
    } else if (this.modalRole === ModalRole.EDITION) {
      this.editElement();
    } else {
      throw Error('Modal role unknown');
    }
  }

  createElement(): void {
    if (this.element instanceof SonarModel) {
      const sonarMetricsModel = [];
      this.selectedSonarMetrics.forEach(metric => sonarMetricsModel.push(this.fromSonarMetricToSonarMetricModel(metric)));
      this.element.sonarMetrics = sonarMetricsModel;
    }

    const headers = new Map();
    const xAuthToken = localStorage.getItem('X-Auth-Token');
    if (xAuthToken) {
      headers.set('X-Auth-Token', xAuthToken);
      headers.set('Content-Type', 'application/json');
    }

    const urlParams = new Map<string, string>();
    urlParams.set('dashboardId', this.dashboardId.toString());
    console.log(this.element);

    this.http.post<SonarModel>('/dashboard/element/sonar', undefined, urlParams, this.element, headers)
      .subscribe(res => {
        // TODO: emit event for dashboard component (parent)
        this.eventElement.emit(res.body);
        this.clearElement();
        // @ts-ignore
        $('#elementModal').modal('hide');
      }, error => console.log(error.message));
  }

  editElement(): void {
    console.log('Edit selected element');
  }

  clearElement(): void {
    this.element = new ElementModel();
    this.selectedSonarMetrics = [];
  }

  getElementType(): ElementType {
    if (this.element instanceof SonarModel) {
      return ElementType.SONAR;
    } else {
      return ElementType.SONAR;
    }
  }

  getSonarMetrics() {
    this.httpService.get('../../../assets/sonar-metrics.json')
      .subscribe(data => this.sonarMetrics = data as [],
        error => console.log(error.message));
  }

  onSelectMetric(val: string) {
    const selectedSonarMetric = this.sonarMetrics.find(metric => +metric.id === +val);
    if (selectedSonarMetric && !this.selectedSonarMetrics.includes(selectedSonarMetric)) {
      this.selectedSonarMetrics.push(selectedSonarMetric);
    }
  }

  removeMetric(metric: any) {
    this.selectedSonarMetrics.splice(this.selectedSonarMetrics.findIndex(m => m === metric), 1);
  }

  fromSonarMetricToSonarMetricModel(metric: any): SonarMetricsModel {
    const sonarMetricsModel = new SonarMetricsModel();
    sonarMetricsModel.metric = metric.key;

    return sonarMetricsModel;
  }
}

export enum ModalRole {
  CREATION, EDITION
}

export enum ElementType {
  SONAR= 'SONAR', JENKINS= 'JENKINS'
}
