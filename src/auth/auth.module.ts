import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AdminModule } from "../admin/admin.module";
import { CustomerModule } from "../customer/customer.module";

@Module({
  imports: [JwtModule.register({ global: true }), AdminModule, CustomerModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
