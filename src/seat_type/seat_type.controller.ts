import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { SeatTypeService } from "./seat_type.service";
import { CreateSeatTypeDto } from "./dto/create-seat_type.dto";
import { UpdateSeatTypeDto } from "./dto/update-seat_type.dto";

@Controller("seat-type")
export class SeatTypeController {
  constructor(private readonly seatTypeService: SeatTypeService) {}

  @Post()
  create(@Body() createSeatTypeDto: CreateSeatTypeDto) {
    return this.seatTypeService.create(createSeatTypeDto);
  }

  @Get()
  findAll() {
    return this.seatTypeService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.seatTypeService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateSeatTypeDto: UpdateSeatTypeDto
  ) {
    return this.seatTypeService.update(id, updateSeatTypeDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.seatTypeService.remove(id);
  }
}
