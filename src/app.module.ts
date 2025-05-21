import { Module } from "@nestjs/common";
import { AdminModule } from "./admin/admin.module";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { RegionModule } from "./region/region.module";
import { DistrictModule } from "./district/district.module";
import { CustomerModule } from "./customer/customer.module";
import { CustomerCardModule } from "./customer_card/customer_card.module";
import { CustomerAddressModule } from "./customer_address/customer_address.module";
import { VenueModule } from "./venue/venue.module";
import { TypeModule } from "./type/type.module";
import { VenueTypesModule } from "./venue_types/venue_types.module";
import { SeatTypeModule } from './seat_type/seat_type.module';
import { SeatModule } from './seat/seat.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    MongooseModule.forRoot(
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/chiptam"
    ),
    AdminModule,
    AuthModule,
    RegionModule,
    DistrictModule,
    CustomerModule,
    CustomerCardModule,
    CustomerAddressModule,
    VenueModule,
    TypeModule,
    VenueTypesModule,
    SeatTypeModule,
    SeatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
