import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateSeatDto {
  @IsNumber()
  @IsNotEmpty()
  sector: number;

  @IsNumber()
  @IsNotEmpty()
  row_number: number;

  @IsNumber()
  @IsNotEmpty()
  number: number;

  @IsNumber()
  @IsNotEmpty()
  venue_id: number;

  @IsNumber()
  @IsNotEmpty()
  seat_type_id: number;

  @IsString()
  @IsNotEmpty()
  location_in_schema: string;
}
