import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class CreateCustomerAddressDto {
  @IsString()
  @IsNotEmpty()
  customer_id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  region_id: string;

  @IsString()
  @IsNotEmpty()
  district_id: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  house: string;
 
  @IsNumber()
  @IsNotEmpty()
  flat: number;

  @IsString()
  @IsOptional()
  location: string;

  @IsString()
  @IsOptional()
  post_index: string;

  @IsString()
  @IsOptional()
  info: string;
}
