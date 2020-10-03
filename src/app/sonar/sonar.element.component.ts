import {Component, Input} from '@angular/core';
import {BaseComponent} from '../common/base-component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sonar-element',
  templateUrl: 'sonar.element.component.html',
  styleUrls: ['sonar.element.component.sass']
})
export class SonarElementComponent extends BaseComponent {
  @Input()
  component: object;

  constructor(protected router: Router) {
    super(router);
  }

  sortByMetric() {
    return (item1, item2) => {
      return item1.metric.localeCompare(item2.metric);
    };
  }

  getCategoryComplexity(): any {
    return this.getCategory(['complexity', 'cognitive_complexity'], this.sortByMetric());
  }

  getCategoryReliability(): any {
    return this.getCategory(['bugs', 'new_bugs', 'reliability_rating', 'reliability_rating',
      'reliability_remediation_effort', 'new_reliability_remediation_effort'], this.sortByMetric());
  }

  getCategorySecurity(): any {
    return this.getCategory(['vulnerabilities', 'new_vulnerabilities', 'security_rating',
      'security_remediation_effort', 'new_security_remediation_effort', 'security_hotspots', 'new_security_hotspots',
      'security_review_rating', 'new_security_review_rating', 'security_hotspots_reviewed'], this.sortByMetric());
  }

  getCategoryDuplication(): any {
    return this.getCategory(['duplicated_blocks', 'duplicated_files',
      'duplicated_lines', 'duplicated_lines_density'], this.sortByMetric());
  }

  getCategoryIssues(): any {
    return this.getCategory(['new_violations', 'new_blocker_violations', 'new_critical_violations',
      'new_major_violations', 'new_minor_violations', 'new_info_violations', 'violations', 'blocker_violations',
      'critical_violations', 'major_violations', 'minor_violations', 'info_violations', 'false_positive_issues',
      'open_issues', 'confirmed_issues', 'reopened_issues'], this.sortByMetric());
  }

  getCategoryMaintainability(): any {
    return this.getCategory(['code_smells', 'new_code_smells', 'sqale_rating', 'sqale_index',
      'new_technical_debt', 'sqale_debt_ratio', 'new_sqale_debt_ratio'], this.sortByMetric());
  }

  getCategoryQuality(): any {
    return this.getCategory(['alert_status', 'quality_gate_details'], this.sortByMetric());
  }

  getCategorySize(): any {
    return this.getCategory(['classes', 'comment_lines', 'comment_lines_density', 'directories', 'files',
      'lines', 'ncloc', 'ncloc_language_distribution', 'functions', 'projects', 'statements'], this.sortByMetric());
  }

  getCategoryTests(): any {
    return this.getCategory(['branch_coverage', 'new_branch_coverage', 'branch_coverage_hits_data',
      'conditions_by_line', 'covered_conditions_by_line', 'coverage', 'new_coverage', 'line_coverage',
      'new_line_coverage', 'coverage_line_hits_data', 'lines_to_cover', 'new_lines_to_cover', 'skipped_tests',
      'uncovered_conditions', 'new_uncovered_conditions', 'uncovered_lines', 'new_uncovered_lines', 'tests',
      'test_execution_time', 'test_errors', 'test_failures', 'test_success_density'], this.sortByMetric());
  }

  getCategory(metrics: Array<string>, compare?: any): any {
    // @ts-ignore
    return this.component.measures ? this.component.measures.filter(elt => metrics.includes(elt.metric)).sort(compare) : [];
  }
}
