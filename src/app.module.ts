
import { Module } from "@nestjs/common";
import { AdminModule } from "./admin/admin.module";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from './auth/auth.module';
import { RegionModule } from './region/region.module';
import { DistrictModule } from './district/district.module';
import { CustomerModule } from './customer/customer.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

