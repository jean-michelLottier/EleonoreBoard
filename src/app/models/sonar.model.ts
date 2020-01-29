import {ElementModel} from './element.model';
import {SonarMetricsModel} from './sonarmetrics.model';

export class SonarModel extends ElementModel {
  url: string;
  projectName: string;
  projectKey: string;
  sonarMetrics: SonarMetricsModel[];

  constructor() {
    super();
  }
}
