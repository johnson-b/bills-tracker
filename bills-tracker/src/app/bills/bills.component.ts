import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'type', 'isActive', 'dueDay', 'isVariableDueDate', 'amountDue', 'budgetAmount',
                                'isAutoPaid', 'isSubscription'];

  private _billSource$: BehaviorSubject<any> = new BehaviorSubject([]);
  billSource$: Observable<any>;

  constructor(private httpClient: HttpClient) {
    this.billSource$ = this._billSource$.asObservable();
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.httpClient.get('http://localhost:8080/api/bills').subscribe(bills => this._billSource$.next(bills));
  }

}
