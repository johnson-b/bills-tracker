import { BillType } from './bill-type.enum';

export class Bill {
  static readonly PAY_PERIOD_1 = 10;
  static readonly PAY_PERIOD_2 = 25;

  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  type: BillType;
  amountDue: number;
  budgetAmount: number;
  dueDay: number;
  isActive = true;
  isAutoPaid = false;
  isSubscription = false;
  isVariableDueDate = false;

  constructor(bill: Bill) {
    this.id = bill.id;
    this.createdAt = bill.createdAt;
    this.updatedAt = bill.updatedAt;
    this.name = bill.name;
    this.type = bill.type;
    this.amountDue = bill.amountDue;
    this.budgetAmount = bill.budgetAmount;
    this.dueDay = bill.dueDay;
    this.isActive = bill.isActive;
    this.isAutoPaid = bill.isAutoPaid;
    this.isSubscription = bill.isSubscription;
    this.isVariableDueDate = bill.isVariableDueDate;
  }

  get payPeriod(): number {
    const today = new Date().getDate();
    if (today > Bill.PAY_PERIOD_1 && today < Bill.PAY_PERIOD_2) {
      return Bill.PAY_PERIOD_1;
    } else if (today < Bill.PAY_PERIOD_1 || today > Bill.PAY_PERIOD_2) {
      return Bill.PAY_PERIOD_2;
    }
  }
}
