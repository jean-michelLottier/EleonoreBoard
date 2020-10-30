import {Injectable} from '@angular/core';
import {HttpService} from '../../common/services/app.http.service';
import {SonarqubeModel} from '../models/sonarqube.model';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {SonarModel} from '../models/sonar.model';

@Injectable()
export class SonarService {

  constructor(private http: HttpService, private httpClient: HttpClient) {
  }

  getMetrics(elementId: number): Observable<HttpResponse<SonarqubeModel>> {
    const headers = new Map();
    const xAuthToken = localStorage.getItem('X-Auth-Token');
    if (xAuthToken) {
      headers.set('X-Auth-Token', xAuthToken);
      headers.set('Content-Type', 'application/json');
    }

    const urlParams = new Map<string, string>();
    urlParams.set('id', elementId.toString());

    return this.http.get<SonarqubeModel>('/sonar/metrics/async', undefined, urlParams, headers);
  }

  importSonarMetrics(): void {
    if (localStorage.getItem('sonar-metrics') !== null) {
      return;
    }

    this.httpClient.get('../../../assets/sonar-metrics.json')
      .subscribe(data => {
          localStorage.setItem('sonar-metrics', JSON.stringify(data as []));
        },
        error => {
          console.log(error.message);
          return throwError(error);
        });
  }

  create(headers: Map<string, string>, dashboardId: number, element: SonarModel): Observable<HttpResponse<SonarModel>> {
    const urlParams = new Map<string, string>();
    urlParams.set('dashboardId', dashboardId.toString());

    return this.http.post<SonarModel>('/dashboard/element/sonar', undefined, urlParams, element, headers);
  }

  edit(headers: Map<string, string>, element: SonarModel): Observable<HttpResponse<SonarModel>> {
    return this.http.post<SonarModel>('/dashboard/element/sonar/modify', undefined, undefined, element, headers);
  }
}
