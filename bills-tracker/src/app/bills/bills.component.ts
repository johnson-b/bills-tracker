import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { faMinusCircle, faPlus, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { NewBillDialogComponent } from '../new-bill-dialog/new-bill-dialog.component';
import { BillsStateService } from '../services/bills-state.service';
import { Bill } from '../models/bill.model';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit {

  deleteIcon = faMinusCircle;
  plusIcon = faPlus;
  caretDownIcon = faCaretDown;

  displayedColumns: string[] = ['deleteAction', 'name', 'type', 'isActive', 'dueDay', 'isVariableDueDate', 'amountDue', 'budgetAmount',
                                'isAutoPaid', 'isSubscription', 'menuAction'];
  billSource$: Observable<any>;

  constructor(public dialog: MatDialog,
              private billState: BillsStateService) {
      this.billSource$ = billState.bills$;
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.billState.refreshBills();
  }

  onDelete(element) {
    this.dialog.open(DeleteDialogComponent, {
      width: '33%',
      data: element.id
    });
  }

  onNewBill() {
    this.dialog.open(NewBillDialogComponent, {
      width: '50%'
    });
  }

  onEditBill(bill: Bill) {
    this.dialog.open(NewBillDialogComponent, {
      width: '50%',
      data: bill
    });
  }
}
