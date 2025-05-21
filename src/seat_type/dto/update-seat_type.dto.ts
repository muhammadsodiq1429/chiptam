import { PartialType } from '@nestjs/swagger';
import { CreateSeatTypeDto } from './create-seat_type.dto';

export class UpdateSeatTypeDto extends PartialType(CreateSeatTypeDto) {}
