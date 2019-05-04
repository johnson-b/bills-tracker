import { BillType } from './bill-type.enum';

export class Bill {
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
}
