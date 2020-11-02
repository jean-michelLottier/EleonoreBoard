import {SonarqubePeriodModel} from './sonarqubeperiod.model';

export class SonarqubeMetricsModel {
  metric: string;
  value: string;
  bestValue: boolean;
  period?: SonarqubePeriodModel;
  periods?: [SonarqubePeriodModel];
}
