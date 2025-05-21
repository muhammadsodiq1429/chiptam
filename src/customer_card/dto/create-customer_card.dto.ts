import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
} from "class-validator";


export class CreateCustomerCardDto {
  @IsString()
  @IsNotEmpty()
  customer_id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsPhoneNumber("UZ")
  @IsNotEmpty()
  phone: string;

  @Matches(/^\d{16}$/, { message: "Card number must be exactly 16 digits" })
  @IsNotEmpty()
  number: string;

  @Matches(/^\d{2}$/, { message: "Year must be exactly two digits" })
  @IsNotEmpty()
  year: string;

  @Matches(/^(0[1-9]|1[0-2])$/, { message: "Month must be between 01 and 12" })
  @IsNotEmpty()
  month: string;

  @IsBoolean()
  @IsOptional()
  is_active: boolean;

  @IsBoolean()
  @IsOptional()
  is_main: boolean;
}
