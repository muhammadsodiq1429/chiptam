import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateVenueTypeDto } from "./dto/create-venue_type.dto";
import { UpdateVenueTypeDto } from "./dto/update-venue_type.dto";
import { InjectModel } from "@nestjs/mongoose";
import { VenueType } from "./schemas/venue_type.schema";
import { Model } from "mongoose";

@Injectable()
export class VenueTypesService {
  constructor(
    @InjectModel(VenueType.name)
    private readonly venueTypeSchema: Model<VenueType>
  ) {}

  async create(createVenueTypeDto: CreateVenueTypeDto) {
    const newVenueType = await this.venueTypeSchema.create(createVenueTypeDto);

    return { success: true, message: "VenueType successfully created" };
  }

  async findAll() {
    const allVenueType = await this.venueTypeSchema
      .find()
      .populate("type_id")
      .populate("venue_id");
    if (allVenueType.length === 0)
      throw new NotFoundException("VenueTypes not found");

    return { success: true, allVenueType };
  }

  async findOne(id: string) {
    const venueType = await this.venueTypeSchema.findById(id);
    if (!venueType) throw new NotFoundException("VenueType not found");

    return { success: true, venueType };
  }

  async update(id: string, updateVenueTypeDto: UpdateVenueTypeDto) {
    const updatedVenueType = await this.venueTypeSchema.findByIdAndUpdate(
      id,
      updateVenueTypeDto
    );
    if (!updatedVenueType) throw new NotFoundException("VenueType not found");

    return { success: true, message: "VenueType not found", updatedVenueType };
  }

  async remove(id: string) {
    const deletedVenueType = await this.venueTypeSchema.findByIdAndDelete(id);
    if (!deletedVenueType) throw new NotFoundException("VenueType not found");

    return { success: true, message: "VenueType not found", deletedVenueType };
  }
}
