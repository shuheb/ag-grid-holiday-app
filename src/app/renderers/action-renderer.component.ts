import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'cube-cell',
  template: `
    <div id="actionContainer" *ngIf="!params.node.footer">
      <mat-slide-toggle
        class="action-margin"
        *ngIf="!params.node.footer"
        [(ngModel)]="isSliderChecked"
        color="primary"
        (change)="onSliderChange($event)"
      >
      </mat-slide-toggle>

      <mat-checkbox
        class="action-margin"
        *ngIf="isSliderChecked"
        [(ngModel)]="isCheckboxChecked"
        [checked]="isCheckboxChecked"
        [disabled]="isCheckboxChecked"
        (change)="onCheckboxChange($event)"
      ></mat-checkbox>
    </div>
  `,
})
export class ActionRenderer implements ICellRendererAngularComp, AfterViewInit {
  params: any;
  VALUE_APPROVED = 'APPROVED';
  VALUE_PENDING = 'PENDING';
  VALUE_COMPLETED = 'COMPLETED';
  isSliderChecked = false;
  isCheckboxChecked = false;

  // called on init
  agInit(params: any): void {
    this.params = params;

    if (
      !params.node.footer &&
      (params.data.status == this.VALUE_COMPLETED ||
        params.data.status == this.VALUE_APPROVED)
    ) {
      this.isSliderChecked = true;
    }

    if (!params.node.footer && params.data.status == this.VALUE_COMPLETED) {
      this.isCheckboxChecked = true;
    }
  }

  onSliderChange(event) {
    let rowIndex = this.params.node.rowIndex;
    let rowNode = this.params.api.getDisplayedRowAtIndex(rowIndex);

    if (event.checked) {
      rowNode.setDataValue('status', this.VALUE_APPROVED);
    } else {
      rowNode.setDataValue('status', this.VALUE_PENDING);
      this.isCheckboxChecked = false;
    }
  }

  onCheckboxChange(event) {
    let rowIndex = this.params.node.rowIndex;
    let rowNode = this.params.api.getDisplayedRowAtIndex(rowIndex);

    if (event.checked) {
      rowNode.setDataValue('status', this.VALUE_COMPLETED);
    } else {
      rowNode.setDataValue('status', this.VALUE_APPROVED);
    }
  }

  ngAfterViewInit() {}

  // called when the cell is refreshed
  refresh(params: any): boolean {
    this.params = params;
    return true;
  }
}
