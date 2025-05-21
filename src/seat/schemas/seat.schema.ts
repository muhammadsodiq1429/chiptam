import mongoose, { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type SeatDocument = HydratedDocument<Seat>;

@Schema()
export class Seat {
  @Prop({ required: true })
  sector: number;

  @Prop({ required: true })
  row_number: number;

  @Prop({ required: true })
  number: number;

  @Prop({ required: true, ref: "Venue", type: mongoose.Schema.Types.ObjectId })
  venue_id: number;

  @Prop({
    required: true,
    ref: "SeatType",
    type: mongoose.Schema.Types.ObjectId,
  })
  seat_type_id: number;

  @Prop({ required: true })
  location_in_schema: string;
}

export const SeatSchema = SchemaFactory.createForClass(Seat);
