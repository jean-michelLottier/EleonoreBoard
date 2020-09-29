import {Injectable} from '@angular/core';
import {HttpService} from '../../common/services/app.http.service';


@Injectable()
export class LoginService {
  constructor(private http: HttpService) {
  }

  signIn(authentication: Authentication) {
    const headers = new Map();
    const xAuthToken = localStorage.getItem('X-Auth-Token');
    if (xAuthToken) {
      headers.set('X-Auth-Token', xAuthToken);
      headers.set('Content-Type', 'application/json');
    }
    return this.http.post('/login', undefined, undefined, authentication, headers);
  }

  signOut() {
    const headers = new Map();
    const xAuthToken = localStorage.getItem('X-Auth-Token');
    if (xAuthToken) {
      headers.set('X-Auth-Token', xAuthToken);
      headers.set('Content-Type', 'application/json');
    }
    return this.http.get('/logout', undefined, undefined, headers);
  }
}

interface Authentication {
  id?: number;
  profileId?: number;
  login: string;
  password: string;
  profileType?: string;
}
