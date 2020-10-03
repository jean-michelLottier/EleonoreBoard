import {Router} from '@angular/router';


export abstract class BaseComponent {
  protected constructor(protected router: Router) {
  }

  disconnect(): void {
    localStorage.clear();
    this.router.navigate(['/logout']);
  }

  getBaseHeader(): Map<string, string> {
    const headers = new Map<string, string>();
    const xAuthToken = localStorage.getItem('X-Auth-Token');
    if (xAuthToken) {
      headers.set('X-Auth-Token', xAuthToken);
      headers.set('Content-Type', 'application/json');
    }

    return headers;
  }
}
