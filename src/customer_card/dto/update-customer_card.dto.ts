import { PartialType } from '@nestjs/swagger';
import { CreateCustomerCardDto } from './create-customer_card.dto';

export class UpdateCustomerCardDto extends PartialType(CreateCustomerCardDto) {}
