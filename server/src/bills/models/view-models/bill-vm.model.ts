import { BaseModelVm } from "src/shared/base.model";
import { ApiModelProperty } from "@nestjs/swagger";
import { EnumToArray } from "src/shared/utilities/enum-to-array";
import { BillCategory } from "../bill-category.enum";
import { BillType } from "../bill-type.enum";

export class BillVm extends BaseModelVm {
    @ApiModelProperty()
    name: string;

    @ApiModelProperty()
    dueDay: number;
    
    @ApiModelProperty()
    isVariableDueDate: boolean;

    @ApiModelProperty()
    amountDue: number;

    @ApiModelProperty()
    budgetAmount: number = this.amountDue / 2;

    @ApiModelProperty()
    isAutoPaid: boolean

    @ApiModelProperty()
    isSubscription: boolean;

    @ApiModelProperty({ enum: EnumToArray(BillType) })
    type: BillType;

    @ApiModelProperty({ default: true })
    isActive: boolean;
}