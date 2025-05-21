import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateDistrictDto } from "./dto/create-district.dto";
import { UpdateDistrictDto } from "./dto/update-district.dto";
import { InjectModel } from "@nestjs/mongoose";
import { District } from "./schemas/district.schema";
import mongoose, { Model } from "mongoose";
import { Region } from "../region/schemas/region.schema";

@Injectable()
export class DistrictService {
  constructor(
    @InjectModel(District.name) private districtSchema: Model<District>,
    @InjectModel(Region.name) private regionSchema: Model<Region>
  ) {}

  async create(createDistrictDto: CreateDistrictDto) {
    const region = await this.regionSchema.findById(
      createDistrictDto.region_id
    );
    if (!region) {
      throw new BadRequestException("Region not found");
    }
    const newDistrict = await this.districtSchema.create(createDistrictDto);
    region.districts.push(newDistrict);
    await region.save();

    return {
      success: true,
      message: "District successfully created",
      newDistrict,
    };
  }

  async findAll() {
    const allDistricts = await this.districtSchema.find().populate("region_id");
    if (allDistricts.length === 0)
      throw new NotFoundException("Districts not found");

    return { success: true, allDistricts };
  }

  async findOne(id: string) {
    const district = await this.districtSchema
      .findById(id)
      .populate("region_id");
    // .populate("districts");
    if (!district) throw new NotFoundException("District not found");

    return { success: true, district };
  }

  async update(id: string, updateDistrictDto: UpdateDistrictDto) {
    const updatedDistrict = await this.districtSchema.findByIdAndUpdate(
      id,
      updateDistrictDto
    );

    return {
      success: true,
      message: "District successfully updated",
      updatedDistrict,
    };
  }

  async remove(id: string) {
    const deletedDistrict = await this.districtSchema.findByIdAndDelete(id);

    return {
      success: true,
      message: "District successfully deleted",
      deletedDistrict,
    };
  }
}
