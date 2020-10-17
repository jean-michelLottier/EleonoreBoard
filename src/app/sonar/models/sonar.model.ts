import {ElementModel} from '../../dashboard/models/element.model';
import {SonarMetricsModel} from './sonarmetrics.model';
import {ElementType} from '../../dashboard/models/element-type.enum';

export class SonarModel extends ElementModel {
  url: string;
  projectName: string;
  projectKey: string;
  sonarMetrics: SonarMetricsModel[] = [];

  constructor() {
    super();
    this.type = ElementType.SONAR;
  }
}
