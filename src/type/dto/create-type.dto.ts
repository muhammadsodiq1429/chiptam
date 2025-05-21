import { Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTypeDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  name: string;
}
