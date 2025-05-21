import { IsString, IsNotEmpty, IsOptional } from "class-validator";


export class CreateVenueDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsOptional()
  location: string;

  @IsString()
  @IsOptional()
  site: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  schema: string;

  @IsString()
  @IsNotEmpty()
  regionId: string;

  @IsString()
  @IsNotEmpty()
  districtId: string;
}
