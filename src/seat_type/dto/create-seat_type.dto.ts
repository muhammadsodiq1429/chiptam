import { IsNotEmpty, IsString } from "class-validator";

export class CreateSeatTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
