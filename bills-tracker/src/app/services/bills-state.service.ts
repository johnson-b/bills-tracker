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
      this._bills$.next(bills);
      isComplete.next();
    });
    return isComplete;
  }

  saveNewBill(bill: Bill): Observable<any> {
    const isComplete: Subject<any> = new Subject();
    this.billsApi.saveBill(bill).subscribe(() => {
      this.refreshBills();
      isComplete.next();
    });
    return isComplete;
  }
}
