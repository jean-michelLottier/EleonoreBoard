import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ElementModel} from '../../models/element.model';
import {BaseComponent} from '../../../common/base-component';
import {Router} from '@angular/router';
import {ElementType} from '../../models/element-type.enum';
import {ModalRole} from '../../models/modal-role.enum';

@Component({
  selector: 'app-element-modal',
  templateUrl: 'element.modal.component.html',
  styleUrls: ['element.modal.component.sass']
})
export class ElementModalComponent extends BaseComponent implements OnInit {
  modalRoles = ModalRole;
  types = ElementType;
  @Input()
  modalRole: ModalRole;
  @Input()
  element: ElementModel;
  @Input()
  dashboardId: number;
  @Output()
  eventElement: EventEmitter<ElementModel>;
  onProcess: EventEmitter<ModalRole>;

  constructor(protected router: Router) {
    super(router);
    this.element = new ElementModel();
    this.eventElement = new EventEmitter<ElementModel>();
    this.onProcess = new EventEmitter<ModalRole>();
  }

  ngOnInit(): void {
  }

  process(): void {
    this.onProcess.emit(this.modalRole);
  }

  clearElement(): void {
    if (this.modalRole === this.modalRoles.EDITION) {
      return;
    }
    this.element = new ElementModel();
  }

  onComplete(element: ElementModel) {
    // @ts-ignore
    $(`#elementModal`).modal('hide');
    this.eventElement.emit(element);
  }
}
