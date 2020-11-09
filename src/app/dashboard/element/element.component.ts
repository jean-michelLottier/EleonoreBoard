import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ElementModel} from '../models/element.model';
import {Router} from '@angular/router';
import {BaseComponent} from '../../common/base-component';
import {ElementType} from '../models/element-type.enum';
import {ModalRole} from '../models/modal-role.enum';

@Component({
  selector: 'app-element',
  templateUrl: 'element.component.html',
  styleUrls: ['element.component.sass'],
})
export class ElementComponent extends BaseComponent implements OnInit {
  @Input()
  dashboardId: number;
  @Input()
  element: ElementModel;
  elementTypes = ElementType;
  @Output()
  eventDeleteElt: EventEmitter<number>;
  modalRoles = ModalRole;
  private _onProcess: EventEmitter<any>;
  private _modalRoleSelected: ModalRole;

  constructor(protected router: Router) {
    super(router);
    this.element = new ElementModel();
    this.eventDeleteElt = new EventEmitter<number>();
    this._onProcess = new EventEmitter<any>();
  }

  ngOnInit(): void {
    $(() => {
      $('[data-toggle="tooltip"]').tooltip({sanitize: false, sanitizeFn: content => content});
    });
  }

  onComplete(element: ElementModel): void {
    if (this._modalRoleSelected === this.modalRoles.DELETION) {
      this.eventDeleteElt.emit(element.id);
    } else {
      this.element = element;
      this._onProcess.emit();
    }
  }

  get onProcess(): EventEmitter<any> {
    return this._onProcess;
  }

  set onProcess(value: EventEmitter<any>) {
    this._onProcess = value;
  }

  get modalRoleSelected(): ModalRole {
    return this._modalRoleSelected;
  }

  set modalRoleSelected(value: ModalRole) {
    this._modalRoleSelected = value;
  }
}
