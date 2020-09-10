import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AgEditorComponent } from 'ag-grid-angular';

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
  implements AgEditorComponent, AfterViewInit {
  params: any;
  value: Date;

  @ViewChild('container', { static: true }) public container;

  agInit(params: any): void {
    this.params = params;

    if (this.params.value) {
      const dateArray = this.params.value.split('/');

      const day = parseInt(dateArray[0]);
      const month = parseInt(dateArray[1]);
      const year = parseInt(dateArray[2]);

      this.value = new Date(year, month - 1, day);
    }
  }

  // open the calendar when grid enters edit mode, i.e. the datepicker is rendered
  ngAfterViewInit() {
    this.container.toggle();
  }

  // ensures that once a date is selected, the grid will exit edit mode and take the new date
  // otherwise, to exit edit mode after a selecting a date, click on another cell or press enter
  onSelect(event) {
    this.params.api.stopEditing(false);
  }

  getValue() {
    const d = this.value;
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  }
}
