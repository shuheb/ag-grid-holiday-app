import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { AppComponent } from './app.component';

import { PrimeCellEditorComponent } from './editors/prime-cell-editor.component';

import { RequestHolidaysStatusBarComponent } from './status-bar-components/request-holidays-status-bar-component.component';

import { CountStatusBarComponent } from './status-bar-components/count-status-bar-component.component';

import { CustomDateComponent } from './date-components/custom-date-component.component';

import { ActionRenderer } from './renderers/action-renderer.component';

import { AgGridModule } from 'ag-grid-angular';
import { from } from 'rxjs';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AgGridModule.withComponents([
      RequestHolidaysStatusBarComponent,
      PrimeCellEditorComponent,
      CustomDateComponent,
      CountStatusBarComponent,
      ActionRenderer,
    ]),
    CalendarModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatCheckboxModule,
    MatButtonModule,
    MatButtonToggleModule,
  ],
  declarations: [
    AppComponent,
    PrimeCellEditorComponent,
    CustomDateComponent,
    RequestHolidaysStatusBarComponent,
    CountStatusBarComponent,
    ActionRenderer,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
