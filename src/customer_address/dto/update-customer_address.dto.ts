import { PartialType } from '@nestjs/swagger';
import { CreateCustomerAddressDto } from './create-customer_address.dto';

export class UpdateCustomerAddressDto extends PartialType(CreateCustomerAddressDto) {}
