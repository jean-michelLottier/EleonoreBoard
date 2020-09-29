import {Injectable} from '@angular/core';
import {HttpService} from '../../common/services/app.http.service';
import {SonarqubeModel} from '../models/sonarqube.model';
import {Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

@Injectable()
export class SonarService {
  constructor(private http: HttpService) {
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
}
