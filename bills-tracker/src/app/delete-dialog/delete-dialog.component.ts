import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BillsApiService } from '../services/bills-api.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private billsApi: BillsApiService
  ) { }

  ngOnInit() {
  }

  onConfirm() {
    this.billsApi.deleteBill(this.data).subscribe(() => { this.dialogRef.close(); });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
