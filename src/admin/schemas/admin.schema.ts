import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type AdminDocument = HydratedDocument<Admin>;

@Schema()
export class Admin {
  @Prop({ required: true })
  full_name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  phone_number: string;

  @Prop()
  hashed_password: string;

  @Prop()
  hashed_refresh_token: string;

  @Prop({ default: true })
  is_active: boolean;

  @Prop({ default: false })
  is_creator: boolean;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
