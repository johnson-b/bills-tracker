import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Bill } from '../models/bill.model';

@Injectable({
  providedIn: 'root'
})
export class BillsApiService {
  private serverBaseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getAllBills(): Observable<Bill[]> {
    return this.http.get<Bill[]>(`${this.serverBaseUrl}/bills`);
  }

  deleteBill(billId: string): Observable<Bill> {
    return this.http.delete<Bill>(`${this.serverBaseUrl}/bills/${billId}`);
  }

  saveBill(bill: Bill): Observable<Bill> {
    return this.http.post<Bill>(`${this.serverBaseUrl}/bills`, bill);
  }
}
