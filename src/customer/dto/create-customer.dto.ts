import { IsObjectIdPipe } from "@nestjs/mongoose";
import { isValidObjectId, ObjectId } from "mongoose";

export class CreateCustomerDto {
  first_name: string;
  last_name: string;
  phone: string;
  password: string;
  confirm_password: string;
  email: string;
  birth_date: Date;
  gender: "MALE" | "FEMALE";
  lang_id: ObjectId;
}
