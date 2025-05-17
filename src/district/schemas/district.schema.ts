import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type DistrictDocument = HydratedDocument<District>;

@Schema()
export class District {
  @Prop()
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Region" })
  region_id: string;
}

export const DistrictSchema = SchemaFactory.createForClass(District);
