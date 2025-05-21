import { PartialType } from '@nestjs/swagger';
import { CreateVenueTypeDto } from './create-venue_type.dto';

export class UpdateVenueTypeDto extends PartialType(CreateVenueTypeDto) {}
