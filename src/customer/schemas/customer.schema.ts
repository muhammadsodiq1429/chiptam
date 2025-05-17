import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId, HydratedDocument, Types } from "mongoose";

export type CustomerDocument = HydratedDocument<Customer>;

export class Customer {
  @Prop({ required: true })
  first_name: string;

  @Prop()
  last_name: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop()
  hashed_password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  birth_date: Date;

  @Prop({ required: true })
  gender: "MALE" | "FEMALE";

  @Prop({ required: true, type: Types.ObjectId })
  lang_id: Types.ObjectId;

  @Prop()
  hashed_refresh_token: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
