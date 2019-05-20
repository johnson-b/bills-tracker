import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule, MatCardModule, MatDialogModule, MatButtonModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatBadgeModule, MatMenuModule, MatAutocompleteModule, MatSelectModule, MatCheckboxModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BillsComponent } from './bills/bills.component';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { NewBillDialogComponent } from './new-bill-dialog/new-bill-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BillsSummaryDialogComponent } from './bills-summary-dialog/bills-summary-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    BillsComponent,
    DeleteDialogComponent,
    NewBillDialogComponent,
    BillsSummaryDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FlexLayoutModule,
    FontAwesomeModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatBadgeModule,
    MatMenuModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DeleteDialogComponent, NewBillDialogComponent, BillsSummaryDialogComponent]
})
export class AppModule { }
