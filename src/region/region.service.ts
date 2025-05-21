import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateRegionDto } from "./dto/create-region.dto";
import { UpdateRegionDto } from "./dto/update-region.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Region } from "./schemas/region.schema";
import { Model } from "mongoose";

@Injectable()
export class RegionService {
  constructor(@InjectModel(Region.name) private regionSchema: Model<Region>) {}

  async create(createRegionDto: CreateRegionDto) {
    const newRegion = await this.regionSchema.create(createRegionDto);

    return { success: true, message: "Region successfully created", newRegion };
  }

  async findAll() {
    const allRegions =
      await this.regionSchema.find(); /* .populate("districts"); */
    if (allRegions.length === 0)
      throw new NotFoundException("Regions not found");

    return { success: true, allRegions };
  }

  async findOne(id: string) {
    const region =
      await this.regionSchema.findById(id); /* .populate("districts"); */
    if (!region) throw new NotFoundException("Region not found");

    return { success: true, region };
  }

  async update(id: string, updateRegionDto: UpdateRegionDto) {
    const updatedRegion = await this.regionSchema.findByIdAndUpdate(
      id,
      updateRegionDto
    );

    return {
      success: true,
      message: "Region successfully updated",
      updatedRegion,
    };
  }

  async remove(id: string) {
    const deletedRegion = await this.regionSchema.findByIdAndDelete(id);

    return {
      success: true,
      message: "Region successfully deleted",
      deletedRegion,
    };
  }
}
