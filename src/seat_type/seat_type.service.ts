import { Injectable } from "@nestjs/common";
import { CreateSeatTypeDto } from "./dto/create-seat_type.dto";
import { UpdateSeatTypeDto } from "./dto/update-seat_type.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model, set } from "mongoose";
import { SeatType } from "./schemas/seat_type.schema";
import { NotFoundException } from "@nestjs/common";

@Injectable()
export class SeatTypeService {
  constructor(
    @InjectModel(SeatType.name) private readonly seatTypeSchema: Model<SeatType>
  ) {}

  async create(createSeatTypeDto: CreateSeatTypeDto) {
    const newSeatType = await this.seatTypeSchema.create(createSeatTypeDto);

    return {
      success: true,
      message: "SeatType successfully created",
      newSeatType,
    };
  }

  async findAll() {
    const allSeatTypes = await this.seatTypeSchema.find();
    if (allSeatTypes.length === 0)
      throw new NotFoundException("SeatTypes not found");

    return { success: true, allSeatTypes };
  }

  async findOne(id: string) {
    const seatType = await this.seatTypeSchema.findById(id);
    if (!seatType) throw new NotFoundException("SeatType not found");

    return { success: true, seatType };
  }

  async update(id: string, updateSeatTypeDto: UpdateSeatTypeDto) {
    const updatedSeatType = await this.seatTypeSchema.findByIdAndUpdate(
      id,
      updateSeatTypeDto
    );
    if (!updatedSeatType) throw new NotFoundException("SeatType not found");

    return {
      success: true,
      message: "SeatType successfully updated",
      updatedSeatType,
    };
  }

  async remove(id: string) {
    const deletedSeatType = await this.seatTypeSchema.findByIdAndDelete(id);
    if (!deletedSeatType) throw new NotFoundException("SeatType not found");

    return {
      success: true,
      message: "SeatType successfully deleted",
      deletedSeatType,
    };
  }
}
