import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type VenueDocument = HydratedDocument<Venue>;

@Schema()
export class Venue {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop()
  location: string;

  @Prop()
  site: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  schema: string;

  @Prop({ required: true, ref: "Region", type: mongoose.Schema.Types.ObjectId })
  regionId: string;

  @Prop({
    required: true,
    ref: "District",
    type: mongoose.Schema.Types.ObjectId,
  })
  districtId: string;
}

export const VenueSchema = SchemaFactory.createForClass(Venue);
