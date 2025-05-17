import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AdminModule } from "../admin/admin.module";

@Module({
  imports: [JwtModule.register({ global: true }), AdminModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
