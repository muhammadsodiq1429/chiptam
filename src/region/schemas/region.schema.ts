import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { District } from "../../district/schemas/district.schema";

export type RegionDocument = HydratedDocument<Region>;

@Schema()
export class Region {
  @Prop()
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.ObjectId, ref: "District" }] })
  districts: District[];
}

export const RegionSchema = SchemaFactory.createForClass(Region);
