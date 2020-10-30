import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ElementModel} from '../models/element.model';
import {HttpService} from '../../common/services/app.http.service';
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

  constructor(private http: HttpService, protected router: Router) {
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

  delete(): void {
    const headers = this.getBaseHeader();
    const urlParams = new Map<string, string>();
    urlParams.set('dashboardId', String(this.dashboardId));
    urlParams.set('elementId', String(this.element.id));
    urlParams.set('type', this.element.type);

    this.http.delete('/dashboard/element', undefined, urlParams, headers)
      .subscribe(res => {
        // @ts-ignore
        $(`#delElementModal${this.element.id}`).modal('hide');
        this.eventDeleteElt.emit(this.element.id);
      }, error => {
        if (error.status === 401) {
          // @ts-ignore
          $(`#delElementModal${this.element.id}`).modal('hide');
          this.disconnect();
        }
      });
  }

  onElementEdited(editedElement: ElementModel): void {
    this.element = editedElement;
    this._onProcess.emit();
  }

  get onProcess(): EventEmitter<any> {
    return this._onProcess;
  }

  set onProcess(value: EventEmitter<any>) {
    this._onProcess = value;
  }
}
