import { InjectModel } from "@nestjs/mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateSeatDto } from "./dto/create-seat.dto";
import { UpdateSeatDto } from "./dto/update-seat.dto";
import { Seat } from "./schemas/seat.schema";
import { Model } from "mongoose";

@Injectable()
export class SeatService {
  constructor(@InjectModel(Seat.name) private seatSchema: Model<Seat>) {}

  async create(createSeatDto: CreateSeatDto) {
    const newSeat = await this.seatSchema.create(createSeatDto);

    return { success: true, message: "Seat successfully created" };
  }

  async findAll() {
    const allSeats = await this.seatSchema
      .find()
      .populate("venue_id")
      .populate("seat_type_id");
    if (allSeats.length === 0) throw new NotFoundException("Seats not found");

    return { success: true, allSeats };
  }

  async findOne(id: string) {
    const seat = await this.seatSchema.findById(id);
    if (!seat) throw new NotFoundException("Seat not found");

    return { success: true, seat };
  }

  async update(id: string, updateSeatDto: UpdateSeatDto) {
    const updatedSeat = await this.seatSchema.findByIdAndUpdate(
      id,
      updateSeatDto
    );
    if (!updatedSeat) throw new NotFoundException("Seat not found");

    return { success: true, message: "Seat successfully updated", updatedSeat };
  }

  async remove(id: string) {
    const deletedSeat = await this.seatSchema.findByIdAndDelete(id);

    if (!deletedSeat) throw new NotFoundException("Seat not found");

    return { success: true, message: "Seat successfully deleted", deletedSeat };
  }
}
