import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-loading-overlay',
  template: `
    <p-calendar
      [(ngModel)]="date"
      [panelStyleClass]="'ag-custom-component-popup'"
      [appendTo]="'body'"
      [placeholder]="'d/m/yyyy'"
      dateFormat="d/m/yy"
      [showIcon]="true"
      [monthNavigator]="true"
      [showButtonBar]="true"
      (onSelect)="onSelect($event)"
      (onClearClick)="onClearClick($event)"
      (onInput)="onInput($event)"
    ></p-calendar>
  `,
  styles: [``],
})
export class CustomDateComponent {
  date: Date;
  params: any;

  agInit(params: any): void {
    this.params = params;
  }

  onSelect(date) {
    this.date = date;
    this.params.onDateChanged();
  }

  onClearClick(event) {
    this.params.onDateChanged();
  }

  onInput(event) {
    this.params.onDateChanged();
  }

  getDate(): Date {
    return this.date;
  }

  setDate(date: Date): void {
    this.date = date || null;
  }
}
