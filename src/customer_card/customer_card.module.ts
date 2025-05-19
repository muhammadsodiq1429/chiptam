import { Module } from "@nestjs/common";
import { CustomerCardService } from "./customer_card.service";
import { CustomerCardController } from "./customer_card.controller";
import { MongooseModule } from "@nestjs/mongoose";
import {
  CustomerCard,
  CustomerCardSchema,
} from "./schemas/customer_card.schema";
import { CustomerModule } from "../customer/customer.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CustomerCard.name, schema: CustomerCardSchema },
    ]),
    CustomerModule,
  ],
  controllers: [CustomerCardController],
  providers: [CustomerCardService],
})
export class CustomerCardModule {}
