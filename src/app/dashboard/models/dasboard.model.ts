import {ElementModel} from './element.model';

export class DashboardModel {
  id: number;
  name: string;
  createdDate: Date;
  modifiedDate: Date;
  elements: ElementModel[];
}
