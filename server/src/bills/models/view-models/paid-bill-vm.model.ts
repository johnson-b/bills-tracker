import { BaseModelVm } from "src/shared/base.model";
import { ApiModelProperty } from "@nestjs/swagger";
import { Bill } from "../bill.model";

export class PaidBillVm extends BaseModelVm {
    @ApiModelProperty()
    bill: Bill;

    @ApiModelProperty()
    payDate: Date;
}