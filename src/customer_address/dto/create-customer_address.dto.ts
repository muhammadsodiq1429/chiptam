import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ObjectId } from "mongoose";

export class CreateCustomerAddressDto {
  @IsString()
  @IsNotEmpty()
  customer_id: ObjectId;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  region_id: ObjectId;

  @IsString()
  @IsNotEmpty()
  district_id: ObjectId;

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
