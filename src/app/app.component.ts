import { Component } from '@angular/core';
import 'ag-grid-enterprise';

import { columnDefinition } from './columns';

import { PrimeCellEditorComponent } from './editors/prime-cell-editor.component';
import { RequestHolidaysStatusBarComponent } from './status-bar-components/request-holidays-status-bar-component.component';
import { CountStatusBarComponent } from './status-bar-components/count-status-bar-component.component';

import { CustomDateComponent } from './date-components/custom-date-component.component';

import { ActionRenderer } from './renderers/action-renderer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  gridApi;
  gridColumnApi;
  immutableStore;
  holidaysTotal = 22;
  holidaysCompleted;

  rowData = [
    { status: 'PENDING', from: '27/12/2020', to: '2/1/2021' },
    { status: 'COMPLETED', from: '1/1/2020', to: '2/1/2020' },
    { status: 'APPROVED', from: '12/6/2020', to: '18/6/2020' },
  ];

  columnDefs = columnDefinition;

  gridOptions = {
    defaultColDef: {
      sortable: true,
    },
    popupParent: document.querySelector('body'),
    domLayout: 'autoHeight',
    getRowStyle: (params) => {
      if (params.node.footer) {
        return { fontWeight: 'bold' };
      }
    },
    statusBar: {
      statusPanels: [
        { statusPanel: 'requestHolidaysStatusBarComponent', align: 'left' },
        {
          statusPanel: 'countStatusBarComponent',
          align: 'right',
        },
      ],
    },
    context: {
      componentParent: this,
    },
    frameworkComponents: {
      agDateInput: CustomDateComponent,
      primeCellEditor: PrimeCellEditorComponent,
      requestHolidaysStatusBarComponent: RequestHolidaysStatusBarComponent,
      countStatusBarComponent: CountStatusBarComponent,
      actionRenderer: ActionRenderer,
    },
  };

  setHolidaysCompleted(value) {
    this.holidaysCompleted = value;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onFirstDataRendered(params) {
    let footer = params.api.getDisplayedRowAtIndex(
      params.api.getLastDisplayedRow()
    );
    this.setHolidaysCompleted(
      footer.aggData['totalCompleted'] + footer.aggData['totalApproved']
    );

    let allColumnIds = [];
    params.columnApi
      .getAllColumns()
      .forEach((column) => allColumnIds.push(column.colId));

    params.columnApi.autoSizeColumns(allColumnIds, false);
  }
}
