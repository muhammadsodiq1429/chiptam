import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { VenueTypesService } from "./venue_types.service";
import { CreateVenueTypeDto } from "./dto/create-venue_type.dto";
import { UpdateVenueTypeDto } from "./dto/update-venue_type.dto";

@Controller("venue-types")
export class VenueTypesController {
  constructor(private readonly venueTypesService: VenueTypesService) {}

  @Post()
  create(@Body() createVenueTypeDto: CreateVenueTypeDto) {
    return this.venueTypesService.create(createVenueTypeDto);
  }

  @Get()
  findAll() {
    return this.venueTypesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.venueTypesService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateVenueTypeDto: UpdateVenueTypeDto
  ) {
    return this.venueTypesService.update(id, updateVenueTypeDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.venueTypesService.remove(id);
  }
}
