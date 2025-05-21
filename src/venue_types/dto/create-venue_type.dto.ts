import { IsNotEmpty, IsString } from "class-validator";

export class CreateVenueTypeDto {
  @IsString()
  @IsNotEmpty()
  type_id: string;

  @IsString()
  @IsNotEmpty()
  venue_id: string;
}
