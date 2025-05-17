import mongoose from "mongoose";

export class CreateDistrictDto {
  name: string;
  region_id: mongoose.Schema.Types.ObjectId;
}
