import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type CustomerDocument = HydratedDocument<Customer>;

@Schema()
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

  @Prop()
  lang_id: string;

  @Prop()
  hashed_refresh_token: string;

  @Prop({ required: true, default: false })
  is_active: boolean;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
