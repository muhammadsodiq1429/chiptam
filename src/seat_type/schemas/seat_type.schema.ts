import { Prop, Schema } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { SchemaFactory } from "@nestjs/mongoose";

export type SeatTypeDocument = HydratedDocument<SeatType>;

@Schema()
export class SeatType {
  @Prop({ required: true })
  name: string;
}

export const SeatTypeSchema = SchemaFactory.createForClass(SeatType);
