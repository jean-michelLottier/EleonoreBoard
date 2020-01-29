import {Component, Input, OnInit} from '@angular/core';
import {ElementModel} from '../models/element.model';
import {ElementType} from './modal/element.modal.component';
import {SonarService} from '../services/app.sonar.service';

@Component({
  selector: 'app-element',
  templateUrl: 'element.component.html',
  styleUrls: ['element.component.sass'],
})
export class ElementComponent implements OnInit {
  @Input()
  element: ElementModel;
  elementTypes = ElementType;
  metrics: object;

  constructor(private sonarService: SonarService) {
    this.element = new ElementModel();
    this.metrics = {};
  }

  ngOnInit(): void {
    this.getElementInformation();
  }

  getElementInformation() {
    if (this.element.type === ElementType.SONAR.toString()) {
      this.sonarService.getMetrics(this.element.id).subscribe(res => {
        this.metrics = res.body;
      }, error => console.log(error.message));
    }
  }
}
