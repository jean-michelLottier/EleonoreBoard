import {Component, OnInit} from '@angular/core';
import {PathModel} from '../models/path.model';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.sass']
})
export class BreadcrumbComponent implements OnInit {
  paths: PathModel[];

  constructor() {
  }

  ngOnInit(): void {
    this.paths = [{path: 'path1', isActive: false}, {path: 'path2', isActive: true}];
  }
}
