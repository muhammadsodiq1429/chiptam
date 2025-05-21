import { Module } from "@nestjs/common";
import { VenueService } from "./venue.service";
import { VenueController } from "./venue.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Venue, VenueSchema } from "./schemas/venue.schema";
import { DistrictModule } from "../district/district.module";
import { RegionModule } from "../region/region.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Venue.name, schema: VenueSchema }]),
    DistrictModule,
    RegionModule,
  ],
  controllers: [VenueController],
  providers: [VenueService],
})
export class VenueModule {}
