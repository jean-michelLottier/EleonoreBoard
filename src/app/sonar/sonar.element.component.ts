import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {BaseComponent} from '../common/base-component';
import {Router} from '@angular/router';
import {SonarService} from './services/app.sonar.service';
import {SonarqubeModel} from './models/sonarqube.model';
import {SonarqubeMetricsModel} from './models/sonarqubemetrics.model';

@Component({
  selector: 'app-sonar-element',
  templateUrl: 'sonar.element.component.html',
  styleUrls: ['sonar.element.component.sass']
})
export class SonarElementComponent extends BaseComponent implements OnInit {
  @Input()
  private elementId: number;
  @Input()
  private _onProcess!: EventEmitter<any>;
  component: SonarqubeModel;

  constructor(protected router: Router, private sonarService: SonarService) {
    super(router);
    this._onProcess = new EventEmitter<any>();
  }

  ngOnInit(): void {
    this.getElementInformation();
    this._onProcess.subscribe(data => {
      this.getElementInformation();
    });
  }

  getElementInformation(): void {
    this.sonarService.getMetrics(this.elementId)
      .subscribe(res => this.component = res.body
        , error => {
          if (error.status === 401) {
            this.disconnect();
          }
        });
  }

  sortByMetric() {
    return (item1, item2) => {
      return item1.metric.localeCompare(item2.metric);
    };
  }

  getCategoryComplexity(): SonarqubeMetricsModel[] {
    return this.getCategory(['complexity', 'cognitive_complexity'], this.sortByMetric());
  }

  getCategoryReliability(): SonarqubeMetricsModel[] {
    return this.getCategory(['bugs', 'new_bugs', 'reliability_rating', 'new_reliability_rating',
      'reliability_remediation_effort', 'new_reliability_remediation_effort'], this.sortByMetric());
  }

  getCategorySecurity(): SonarqubeMetricsModel[] {
    return this.getCategory(['vulnerabilities', 'new_vulnerabilities', 'security_rating', 'new_security_rating',
      'security_remediation_effort', 'new_security_remediation_effort', 'security_hotspots', 'new_security_hotspots',
      'security_review_rating', 'new_security_review_rating', 'security_hotspots_reviewed'], this.sortByMetric());
  }

  getCategoryDuplication(): SonarqubeMetricsModel[] {
    return this.getCategory(['duplicated_blocks', 'new_duplicated_blocks', 'duplicated_files',
      'duplicated_lines', 'duplicated_lines_density', 'new_duplicated_lines_density', 'new_duplicated_lines'], this.sortByMetric());
  }

  getCategoryIssues(): SonarqubeMetricsModel[] {
    return this.getCategory(['new_violations', 'new_blocker_violations', 'new_critical_violations',
      'new_major_violations', 'new_minor_violations', 'new_info_violations', 'violations', 'blocker_violations',
      'critical_violations', 'major_violations', 'minor_violations', 'info_violations', 'false_positive_issues',
      'open_issues', 'confirmed_issues', 'reopened_issues'], this.sortByMetric());
  }

  getCategoryMaintainability(): SonarqubeMetricsModel[] {
    return this.getCategory(['code_smells', 'new_code_smells', 'sqale_rating', 'sqale_index',
      'new_technical_debt', 'sqale_debt_ratio', 'new_sqale_debt_ratio', 'new_development_cost'], this.sortByMetric());
  }

  getCategoryQuality(): SonarqubeMetricsModel[] {
    return this.getCategory(['alert_status', 'quality_gate_details'], this.sortByMetric());
  }

  getCategorySize(): SonarqubeMetricsModel[] {
    return this.getCategory(['classes', 'comment_lines', 'comment_lines_density', 'directories', 'files',
      'lines', 'ncloc', 'ncloc_language_distribution', 'functions', 'projects', 'statements'], this.sortByMetric());
  }

  getCategoryTests(): SonarqubeMetricsModel[] {
    return this.getCategory(['branch_coverage', 'new_branch_coverage', 'branch_coverage_hits_data',
      'conditions_by_line', 'covered_conditions_by_line', 'coverage', 'new_coverage', 'line_coverage',
      'new_line_coverage', 'coverage_line_hits_data', 'lines_to_cover', 'new_lines_to_cover', 'skipped_tests',
      'uncovered_conditions', 'new_uncovered_conditions', 'uncovered_lines', 'new_uncovered_lines', 'tests',
      'test_execution_time', 'test_errors', 'test_failures', 'test_success_density', 'new_conditions_to_cover',
      'conditions_to_cover'], this.sortByMetric());
  }

  getCategory(metrics: Array<string>, compare?: any): SonarqubeMetricsModel[] {
    // @ts-ignore
    return this.component?.measures ? this.component.measures.filter(elt => metrics.includes(elt.metric)).sort(compare) : [];
  }
}
