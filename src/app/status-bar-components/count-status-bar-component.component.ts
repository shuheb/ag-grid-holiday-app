import { Component } from '@angular/core';

import { IStatusPanelParams } from 'ag-grid-community';

@Component({
  selector: 'status-component',
  template: `
    <div class="ag-status-name-value">
      <span>Holidays Completed:&nbsp;</span>
      <span class="ag-status-name-value-value">{{ count }}</span>
    </div>
  `,
})
export class CountStatusBarComponent {
  params: IStatusPanelParams;
  count = 0;

  agInit(params: IStatusPanelParams): void {
    this.params = params;

    this.params.api.addEventListener(
      'rowDataUpdated',
      this.onRowDataUpdated.bind(this)
    );

    this.params.api.addEventListener(
      'cellValueChanged',
      this.onCellValueChanged.bind(this)
    );

    this.params.api.addEventListener(
      'firstDataRendered',
      this.onGridReady.bind(this)
    );
  }

  onRowDataUpdated(params) {
    let sum = 0;

    this.params.api.forEachNode((node) => {
      let pending = this.params.api.getValue('totalCompleted', node);
      if (pending) {
        sum += pending;
      }
    });

    this.count = sum;
  }

  onCellValueChanged(params) {
    let sumOfCompleted = 0;
    let sumOfApproved = 0;

    this.params.api.forEachNode((node) => {
      let completed = this.params.api.getValue('totalCompleted', node);
      let approved = this.params.api.getValue('totalApproved', node);
      if (completed) {
        sumOfCompleted += completed;
      }

      if (approved) {
        sumOfApproved += approved;
      }
    });

    this.count = sumOfCompleted;
    this.params.context.componentParent.setHolidaysCompleted(
      sumOfApproved + sumOfCompleted
    );
  }

  onGridReady(params) {
    let sum = 0;

    this.params.api.forEachNode((node) => {
      let pending = this.params.api.getValue('totalCompleted', node);
      if (pending) {
        sum += pending;
      }
    });

    this.count = sum;
  }
}
