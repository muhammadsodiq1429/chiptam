import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from "class-validator";

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsOptional()
  last_name: string;

  @IsPhoneNumber("UZ")
  @IsNotEmpty()
  phone: string;

  @IsStrongPassword()
  password: string;

  @IsString()
  @IsNotEmpty()
  confirm_password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsDateString()
  @IsNotEmpty()
  birth_date: Date;

  @IsEnum({ MALE: "MALE", FEMALE: "FEMALE" })
  @IsNotEmpty()
  gender: "MALE" | "FEMALE";

  @IsString()
  @IsOptional()
  lang_id: string;
}
