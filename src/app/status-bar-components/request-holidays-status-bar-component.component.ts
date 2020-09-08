import { Component } from '@angular/core';

@Component({
  selector: 'request-holidays',
  template: `
    <div class="ag-status-name-value">
      <button mat-stroked-button color="primary" (click)="onBtnAddRow()">
        Request Holidays
      </button>
    </div>
  `,
})
export class RequestHolidaysStatusBarComponent {
  params: any;
  value;

  agInit(params: any): void {
    this.params = params;
  }

  onBtnAddRow() {
    var blankRow = [
      {
        status: 'PENDING',
        from: new Date().toLocaleDateString(),
        to: new Date().toLocaleDateString(),
      },
    ];

    this.params.api.applyTransaction({ add: blankRow });
  }

  refresh(params: any): boolean {
    this.params = params;
    return true;
  }
}
