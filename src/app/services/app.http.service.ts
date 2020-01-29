import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable()
export class HttpService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  post<T>(partialUrl: string = '', urlVariables: Map<string, string> = new Map(), urlParams: Map<string, string> = new Map(),
          body: any, headers: Map<string, string> = new Map()) {
    const httpHeaders = {};

    if (headers.size === 0) {
      httpHeaders['Content-Type'] = 'application/json';
    } else {
      headers.forEach((val, key) => {
        httpHeaders[key] = val;
      });
    }

    return this.http.post<T>(this.getFullUrl(partialUrl, urlVariables, urlParams), body, {
      headers: httpHeaders,
      observe: 'response',
    });
  }

  get<T>(partialUrl: string = '', urlVariables: Map<string, string> = new Map(), urlParams: Map<string, string> = new Map(),
         headers: Map<string, string> = new Map()): Observable<HttpResponse<T>> {
    const httpHeaders = {};

    if (headers.size === 0) {
      httpHeaders['Content-Type'] = 'application/json';
    } else {
      headers.forEach((val, key) => {
        httpHeaders[key] = val;
      });
    }

    return this.http.get<T>(this.getFullUrl(partialUrl, urlVariables, urlParams), {
      headers: httpHeaders,
      observe: 'response',
    });
  }

  getFullUrl(partialUrl: string, urlVariables: Map<string, string>, urlParams: Map<string, string>): string {
    urlVariables.forEach((val, key) => partialUrl = partialUrl.replace(`{${key}}`, val));

    if (urlParams.size !== 0) {
      let params = '';
      urlParams.forEach((val, key) => params = params.concat(`${key}=${val}&`));
      partialUrl = partialUrl.concat('?', params.slice(0, -1));
    }

    return this.baseUrl.concat(partialUrl);
  }
}
