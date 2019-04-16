import { Controller, Post, HttpStatus, HttpException, Body, Put, Get, Query, Delete, Param } from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiOperation, ApiImplicitQuery } from '@nestjs/swagger';
import { Bill } from './models/bill.model';
import { BillsService } from './bills.service';
import { BillVm } from './models/view-models/bill-vm.model';
import { ApiException } from 'src/shared/api-exception.model';
import { GetOperationId } from 'src/shared/utilities/get-operation-id';
import { map } from 'lodash';
import { BillParamsVm } from './models/view-models/bill-params-vm.model';

@Controller('bills')
@ApiUseTags(Bill.modelName)
export class BillsController {
    constructor(private readonly _billService: BillsService) {}

    @Post()
    @ApiResponse({ status: HttpStatus.CREATED, type: BillVm })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
    @ApiOperation(GetOperationId(Bill.modelName, 'Create'))
    async create(@Body() params: BillParamsVm): Promise<BillVm> {
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

        if (!name) {
            throw new HttpException('Name is a required field', HttpStatus.BAD_REQUEST);
        } 
        if (dueDay == null) {
            throw new HttpException('Due Day is a required field', HttpStatus.BAD_REQUEST);
        }

        if (isVariableDueDate == null) {
            throw new HttpException('Is Variable Due Date is a required field', HttpStatus.BAD_REQUEST);
        }

        if (amountDue == null) {
            throw new HttpException('Amount Due is a required field', HttpStatus.BAD_REQUEST);
        }

        if (budgetAmount == null) {
            throw new HttpException('Budget Amount is a required field', HttpStatus.BAD_REQUEST);
        }

        if (isAutoPaid == null) {
            throw new HttpException('Is Auto Paid is a required field', HttpStatus.BAD_REQUEST);
        }

        if (isSubscription == null) {
            throw new HttpException('Is Subscription is a required field', HttpStatus.BAD_REQUEST);
        }

        if (!type) {
            throw new HttpException('Type is a required field', HttpStatus.BAD_REQUEST);
        }

        try {
            const newBill = await this._billService.createBill(params);
            return this._billService.map<BillVm>(newBill);
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put()
    @ApiResponse({ status: HttpStatus.OK, type: BillVm })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, type: ApiException })
    @ApiOperation(GetOperationId(Bill.modelName, 'Update'))
    async update(@Body() params: BillVm): Promise<BillVm> {
        const {
            id,
            name,
            dueDay,
            isVariableDueDate,
            amountDue,
            budgetAmount,
            isAutoPaid,
            isSubscription,
            type,
            isActive
        } = params;

        if (!params) {
            throw new HttpException('Bill body is missing', HttpStatus.BAD_REQUEST);
        }

        if (!id) {
            throw new HttpException('Bill id is missing', HttpStatus.BAD_REQUEST);
        }

        let exist;
        try {
            exist = await this._billService.findById(id);
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (!exist) {
            throw new HttpException(`${id} Not Found`, HttpStatus.NOT_FOUND);
        }

        exist.name = name;
        exist.dueDay = dueDay;
        exist.isVariableDueDate = isVariableDueDate;
        exist.amountDue = amountDue;
        exist.budgetAmount = budgetAmount;
        exist.isAutoPaid = isAutoPaid;
        exist.isSubscription = isSubscription;
        exist.type = type;
        exist.isActive = isActive;

        try {
            const updated = await this._billService.update(id, exist);
            return this._billService.map<BillVm>(updated.toJSON());
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get()
    @ApiResponse({ status: HttpStatus.OK, type: BillVm, isArray: true })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
    @ApiOperation(GetOperationId(Bill.modelName, 'GetAll'))
    @ApiImplicitQuery({ name: 'id', required: false })
    @ApiImplicitQuery({ name: 'isActive', required: false })
    async get(@Query('id') id?: string, @Query('isActive') isActive?: boolean): Promise<BillVm[]> {
        let bills;
        try {
            if (id) {
                bills = [await this._billService.findById(id)];
            } else {
                let filter = {};
                if (isActive) {
                    filter['isActive'] = isActive;
                }
                bills = await this._billService.findAll(filter);
            }
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return this._billService.map<BillVm[]>(map(bills, bill => bill.toJSON()), true);
    }
    
    @Delete(':id')
    @ApiResponse({ status: HttpStatus.OK, type: BillVm, isArray: true })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
    @ApiOperation(GetOperationId(Bill.modelName, 'Delete'))
    async delete(@Param('id') id: string): Promise<BillVm> {
        if (!id) {
            throw new HttpException('Missing bill id', HttpStatus.BAD_REQUEST);
        }

        try {
            const deleted = await this._billService.delete(id);
            return this._billService.map<BillVm>(deleted.toJSON());
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
