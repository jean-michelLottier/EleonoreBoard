import {Component, OnInit} from '@angular/core';
import {PathModel} from '../common/models/path.model';
import {FluxService} from '../common/services/app.flux.service';
import {Location} from '@angular/common';
import {BaseComponent} from '../common/base-component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.sass']
})
export class BreadcrumbComponent extends BaseComponent implements OnInit {
  private static BREADCRUMB_KEY = 'breadcrumb';

  breadcrumb: PathModel[] = [];

  constructor(private flux: FluxService, private location: Location, protected router: Router) {
    super(router);
    this.breadcrumb = [];
    const breadcrumbStr = localStorage.getItem(BreadcrumbComponent.BREADCRUMB_KEY);
    if (breadcrumbStr) {
      const pathList = breadcrumbStr.split('/');
      if (this.location.path().replace('/', '') === pathList[pathList.length - 1]) { // If the current page is loaded/reloaded
        pathList.forEach(el => this.breadcrumb.push(new PathModel(el, false)));
        this.breadcrumb[this.breadcrumb.length - 1].isActive = true;
      }
    }
  }

  ngOnInit(): void {
    this.flux.subscriber.subscribe(dataset => {
      const pathModel = dataset.get(BreadcrumbComponent.BREADCRUMB_KEY);
      if (pathModel) {
        this.updateBreadcrumb(pathModel);
      }
    });
  }

  updateBreadcrumb(pathModel: PathModel): void {
    let breadcrumbStr = localStorage.getItem(BreadcrumbComponent.BREADCRUMB_KEY);
    const index = this.breadcrumb.findIndex(el => el === pathModel);
    if (index === -1) {
      if (pathModel.path === 'logout') {
        localStorage.removeItem(BreadcrumbComponent.BREADCRUMB_KEY);
        this.breadcrumb = [];
        return;
      } else if (breadcrumbStr) {
        breadcrumbStr += '/' + pathModel.path;
      } else {
        breadcrumbStr = pathModel.path;
      }
      this.breadcrumb.push(pathModel);
    } else {
      this.breadcrumb.splice(index);
      breadcrumbStr = this.breadcrumb.map(el => el.path).reduce((previous, current) => previous + '/' + current);
    }

    localStorage.setItem(BreadcrumbComponent.BREADCRUMB_KEY, breadcrumbStr);
  }
}
