import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class FluxService {
  private publisher = new BehaviorSubject(new Map<string, any>());
  subscriber = this.publisher.asObservable();

  constructor() {
  }

  publish(data: Map<string, any>) {
    this.publisher.next(data);
  }
}
