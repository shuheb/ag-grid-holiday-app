import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-picker-cell-editor',
  template: `
    <p-calendar
      #container
      [(ngModel)]="value"
      [appendTo]="'body'"
      [style]="{ height: '100%', width: '100%' }"
      [inputStyle]="{ height: '100%', width: '100%' }"
      [monthNavigator]="true"
      yearRange="2015:2025"
      dateFormat="d/m/yy"
      (onSelect)="onSelect($event)"
    ></p-calendar>
  `,
  styles: [``],
})
export class PrimeCellEditorComponent
  implements ICellEditorAngularComp, AfterViewInit {
  params: any;
  value: Date;

  @ViewChild('container', { static: true }) public container;

  agInit(params: any): void {
    this.params = params;

    if (this.params.value) {
      let dateArray = this.params.value.split('/');

      let day = parseInt(dateArray[0]);
      let month = parseInt(dateArray[1]);
      let year = parseInt(dateArray[2]);

      this.value = new Date(year, month - 1, day);
    }
  }

  ngAfterViewInit() {
    this.container.toggle();
  }

  onSelect(event) {
    this.params.api.stopEditing(false);
  }

  getValue() {
    let d = this.value;
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  }

  refresh(params: any): boolean {
    this.params = params;
    return true;
  }
}
