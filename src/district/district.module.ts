import { Module } from "@nestjs/common";
import { DistrictService } from "./district.service";
import { DistrictController } from "./district.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { District, DistrictSchema } from "./schemas/district.schema";
import { Region, RegionSchema } from "../region/schemas/region.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: District.name, schema: DistrictSchema },
      { name: Region.name, schema: RegionSchema },
    ]),
  ],
  controllers: [DistrictController],
  providers: [DistrictService],
})
export class DistrictModule {}
