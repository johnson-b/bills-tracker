import { Injectable } from '@angular/core';
import { BillsApiService } from './bills-api.service';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Bill } from '../models/bill.model';

@Injectable({
  providedIn: 'root'
})
export class BillsStateService {

  private _bills$: BehaviorSubject<Bill[]> = new BehaviorSubject([]);
  bills$: Observable<Bill[]>;

  constructor(private billsApi: BillsApiService) {
    this.bills$ = this._bills$.asObservable();
  }

  refreshBills(): Observable<any> {
    const isComplete: Subject<any> = new Subject();
    this.billsApi.getAllBills().pipe(
      catchError((err, caught) => of([])),
    ).subscribe((bills: Bill[]) => {
      this.sortByDueDate(bills);
      isComplete.next();
    });
    return isComplete;
  }

  upsertNewBill(bill: Bill): Observable<any> {
    const isComplete: Subject<any> = new Subject();
    this.billsApi.upsertBill(bill).subscribe(() => {
      this.refreshBills();
      isComplete.next();
    });
    return isComplete;
  }

  deleteBill(id: string): Observable<any> {
    const isComplete: Subject<any> = new Subject();
    this.billsApi.deleteBill(id).subscribe(() => {
      this.refreshBills();
      isComplete.next();
    });
    return isComplete;
  }

  sortByDueDate(bills: Bill[]) {
    if (bills) {
      bills.sort((aBill: Bill, bBill: Bill) => {
        if (aBill.dueDay > bBill.dueDay) { return 1; }
        if (aBill.dueDay < bBill.dueDay) { return -1; } else { return 0; }
      });

      const newBills: Bill[] = [];
      bills.forEach((bill: Bill) => newBills.push(new Bill(bill)));
      this._bills$.next(newBills);
    }
  }
}
