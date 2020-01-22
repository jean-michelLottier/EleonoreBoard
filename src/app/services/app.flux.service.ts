import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class FluxService {
  private publisher = new BehaviorSubject(new Map<string, string>());
  subscriber = this.publisher.asObservable();

  constructor() {
  }

  publish(data: Map<string, string>) {
    this.publisher.next(data);
  }
}
