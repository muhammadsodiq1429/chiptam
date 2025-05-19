import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";

export type CustomerAddressDocument = HydratedDocument<CustomerAddress>;

@Schema()
export class CustomerAddress {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  })
  customer_id: ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, ref: "Region", type: mongoose.Schema.Types.ObjectId })
  region_id: ObjectId;

  @Prop({
    required: true,
    ref: "District",
    type: mongoose.Schema.Types.ObjectId,
  })
  district_id: ObjectId;

  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  house: string;

  @Prop({ required: true })
  flat: number;

  @Prop()
  location: string;

  @Prop()
  post_index: string;

  @Prop()
  info: string;
}

export const CustomerAddressSchema =
  SchemaFactory.createForClass(CustomerAddress);
