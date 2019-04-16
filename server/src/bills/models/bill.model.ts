import { BaseModel, schemaOptions } from "src/shared/base.model";
import { prop, ModelType } from "typegoose";
import { BillCategory } from "./bill-category.enum";
import { BillType } from "./bill-type.enum";

export class Bill extends BaseModel<Bill> {
    @prop({ required: [true, 'Name is a required field'] })
    name: string;

    @prop({ required: [true, 'Due Day is a required field'] })
    dueDay: number;

    @prop({ required: [true, 'Is Variable Due Date is a required field'] })
    isVariableDueDate: boolean;

    @prop({ required: [true, 'Amount Due is a required field'] })
    amountDue: number;

    @prop()
    budgetAmount: number = this.amountDue / 2;

    @prop({ required: [true, 'Is Auto Paid is a required field'] })
    isAutoPaid: boolean;

    @prop({ required: [true, 'Is Subscription is a required field'] })
    isSubscription: boolean;

    @prop({ enum: BillType, default: BillType.Bill })
    type: BillType;

    @prop({ default: true }) 
    isActive: boolean;

    static get model(): ModelType<Bill> {
        return new Bill().getModelForClass(Bill, { schemaOptions });
    }

    static get modelName(): string {
         return this.model.modelName;
    }
}