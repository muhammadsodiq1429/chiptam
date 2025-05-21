import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Res,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/sign-in.dto";
import { Response } from "express";
import { CookieGetter } from "../common/decorators/cookie-getter.decorator";


@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post("admin/sign-in")
  async signInAdmin(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signInAdmin(signInDto, res);
  }

  @HttpCode(200)
  @Post("admin/sign-out")
  async signOutAdmin(
    @CookieGetter("refresh_token") refreshToken,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOutAdmin(refreshToken, res);
  }

  @HttpCode(200)
  @Post("admin/:id/refresh-tokens")
  async refreshAdminTokens(
    @CookieGetter("refresh_token") refreshToken,
    @Param("id") id: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshAdminTokens(id, refreshToken, res);
  }

  @HttpCode(200)
  @Post("customer/sign-in")
  async signInCustomer(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signInCustomer(signInDto, res);
  }

  @HttpCode(200)
  @Post("customer/sign-out")
  async signOutCustomer(
    @CookieGetter("refresh_token") refreshToken,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOutCustomer(refreshToken, res);
  }

  @HttpCode(200)
  @Post("customer/:id/refresh-tokens")
  async refreshTokensCustomer(
    @CookieGetter("refresh_token") refreshToken,
    @Param("id") id: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshTokensCustomer(id, refreshToken, res);
  }
}
