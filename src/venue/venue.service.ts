import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateVenueDto } from "./dto/create-venue.dto";
import { UpdateVenueDto } from "./dto/update-venue.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Venue } from "./schemas/venue.schema";
import { Model } from "mongoose";
import { RegionService } from "../region/region.service";
import { DistrictService } from "../district/district.service";

@Injectable()
export class VenueService {
  constructor(
    @InjectModel(Venue.name) private readonly venueSchema: Model<Venue>,
    private readonly regionService: RegionService,
    private readonly districtService: DistrictService
  ) {}

  async create(createVenueDto: CreateVenueDto) {
    if (!(await this.regionService.findOne(createVenueDto.regionId)))
      throw new NotFoundException("Region not found");
    if (!(await this.districtService.findOne(createVenueDto.districtId)))
      throw new NotFoundException("District not found");

    const newVenue = await this.venueSchema.create(createVenueDto);

    console.log(newVenue);

    return { success: true, message: "Venue successfully created", newVenue };
  }

  async findAll() {
    const allVenues = await this.venueSchema
      .find()
      .populate("regionId")
      .populate("districtId");
    if (allVenues.length === 0) throw new NotFoundException("Venues not found");

    return { success: true, allVenues };
  }

  async findOne(id: string) {
    const venue = await this.venueSchema.findById(id);
    if (!venue) throw new NotFoundException("Venue  not found");

    return venue;
  }

  async update(id: string, updateVenueDto: UpdateVenueDto) {
    const updatedVenue = await this.venueSchema.findByIdAndUpdate(
      id,
      updateVenueDto
    );
    if (!updatedVenue) throw new NotFoundException("Venue not found");

    return {
      success: true,
      message: "Venue successfully updated",
      updatedVenue,
    };
  }

  async remove(id: string) {
    const deletedVenue = await this.venueSchema.findByIdAndDelete(id);
    if (!deletedVenue) throw new NotFoundException("Venue not found");

    return {
      success: true,
      message: "Venue successfully deleted",
      deletedVenue,
    };
  }
}
