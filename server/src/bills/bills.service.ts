import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Bill } from './models/bill.model';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from 'typegoose';
import { MapperService } from 'src/shared/mapper/mapper.service';
import { BaseService } from 'src/shared/base.service';
import { BillParamsVm } from './models/view-models/bill-params-vm.model';

@Injectable()
export class BillsService extends BaseService<Bill> {
    
    constructor(@InjectModel(Bill.modelName) private readonly _billModel: ModelType<Bill>,
                private readonly _mapperService: MapperService) {
        super();
        this._model = _billModel;
        this._mapper = _mapperService.mapper;
    }

    async createBill(params: BillParamsVm): Promise<Bill> {
        const {
            name,
            dueDay,
            isVariableDueDate,
            amountDue,
            budgetAmount,
            isAutoPaid,
            isSubscription,
            type
        } = params;

        const newBill = new this._model();
        newBill.name = name;
        newBill.dueDay = dueDay;
        newBill.isVariableDueDate = isVariableDueDate;
        newBill.amountDue = amountDue;
        newBill.budgetAmount = budgetAmount;
        newBill.isAutoPaid = isAutoPaid;
        newBill.isSubscription = isSubscription;
        newBill.type = type;

        try {
            const result = await this.create(newBill);
            return result.toJSON() as Bill;
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
