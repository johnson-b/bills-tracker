import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BillsApiService } from '../services/bills-api.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Bill } from '../models/bill.model';
import { BillType } from '../models/bill-type.enum';
import { BillsStateService } from '../services/bills-state.service';

@Component({
  selector: 'app-new-bill-dialog',
  templateUrl: './new-bill-dialog.component.html',
  styleUrls: ['./new-bill-dialog.component.scss']
})
export class NewBillDialogComponent implements OnInit {

  private billForm: FormGroup;

  isLoading = false;
  newBill: Bill = new Bill();
  billTypesEnum = BillType;
  billTypes: string[];

  constructor(private dialogRef: MatDialogRef<NewBillDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Bill,
              private formBuilder: FormBuilder,
              private billState: BillsStateService) {
    this.billTypes = Object.keys(this.billTypesEnum);

    if (data) {
      this.newBill = data;
    }
  }

  get nameControl(): FormControl {
    if (this.billForm) {
      return this.billForm.get('name') as FormControl;
    }
  }

  get typeControl(): FormControl {
    if (this.billForm) {
      return this.billForm.get('type') as FormControl;
    }
  }

  get amountDueControl(): FormControl {
    if (this.billForm) {
      return this.billForm.get('amountDue') as FormControl;
    }
  }

  get budgetAmountControl(): FormControl {
    if (this.billForm) {
      return this.billForm.get('budgetAmount') as FormControl;
    }
  }

  get dueDayControl(): FormControl {
    if (this.billForm) {
      return this.billForm.get('dueDay') as FormControl;
    }
  }

  ngOnInit() {
    this.initializeForm();
  }

  onCancel() {
    this.dialogRef.close();
  }

  onUpsertNewBill() {
    this.isLoading = true;
    this.newBill = this.billForm.value as Bill;
    this.billState.upsertNewBill(this.newBill).subscribe(() => {
      this.isLoading = false;
      this.dialogRef.close();
    }, err => console.error('Error saving bill', err));
  }

  getErrorMessage(formControl: FormControl, fieldName: string): string {
    if (formControl) {
      if (formControl.hasError('required')) {
        return `${fieldName} is a required field`;
      }
    }
  }

  private initializeForm() {
    this.billForm = this.formBuilder.group({
      id: [this.newBill.id],
      name: [this.newBill.name, Validators.required],
      type: [this.newBill.type, Validators.required],
      amountDue: [this.newBill.amountDue, Validators.required],
      budgetAmount: [this.newBill.budgetAmount, Validators.required],
      dueDay: [this.newBill.dueDay, Validators.required],
      isActive: [this.newBill.isActive],
      isAutoPaid: [this.newBill.isAutoPaid],
      isSubscription: [this.newBill.isSubscription],
      isVariableDueDate: [this.newBill.isVariableDueDate]
    });
  }
}
