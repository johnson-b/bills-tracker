import { Module } from '@nestjs/common';
import { BillsController } from './bills.controller';
import { BillsService } from './bills.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Bill } from './models/bill.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Bill.modelName, schema: Bill.model.schema }])
  ],
  controllers: [BillsController],
  providers: [BillsService]
})
export class BillsModule {}
