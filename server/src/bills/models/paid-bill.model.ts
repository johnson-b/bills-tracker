import { BaseModel } from "src/shared/base.model";
import { prop, Ref } from "typegoose";
import { Bill } from "./bill.model";

export class PaidBill extends BaseModel<PaidBill> {
    @prop({ required: [true, 'Bill is a required field'], ref: Bill })
    bill: Ref<Bill>;

    @prop({ required: [true, 'Paid Date is a required field'] })
    payDate: Date;
}