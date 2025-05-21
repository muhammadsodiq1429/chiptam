import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type VenueTypeDocument = HydratedDocument<VenueType>;

@Schema()
export class VenueType {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Type" })
  type_id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Venue" })
  venue_id: string;
}

export const VenueTypeSchema = SchemaFactory.createForClass(VenueType);
