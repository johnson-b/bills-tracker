import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsSummaryDialogComponent } from './bills-summary-dialog.component';

describe('BillsSummaryDialogComponent', () => {
  let component: BillsSummaryDialogComponent;
  let fixture: ComponentFixture<BillsSummaryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillsSummaryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsSummaryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
