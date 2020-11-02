import {SonarqubeMetricsModel} from './sonarqubemetrics.model';

export class SonarqubeModel {
  id: string;
  key: string;
  name: string;
  description: string;
  qualifier: string;
  measures: SonarqubeMetricsModel[];
}
