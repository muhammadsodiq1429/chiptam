import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { AdminService } from "../admin/admin.service";
import { SignInDto } from "./dto/sign-in.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { CustomerService } from "../customer/customer.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
    private readonly customerService: CustomerService
  ) {}

  async generateTokens(payload: {}) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.sign(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.sign(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async signInAdmin(signInDto: SignInDto, res: Response) {
    const admin = await this.adminService.findByEmail(signInDto.email);
    if (!admin) throw new BadRequestException("Email or password incorrect");

    const isValidPassword = await bcrypt.compare(
      signInDto.password,
      admin.hashed_password
    );
    if (!isValidPassword)
      throw new BadRequestException("Email or password incorrect");

    const { accessToken, refreshToken } = await this.generateTokens(admin);

    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_REFRESH_TOKEN_TIME),
      httpOnly: true,
    });

    admin.hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await admin.save();

    return {
      success: true,
      message: "Admin successfully signed in",
      accessToken,
    };
  }

  async signOutAdmin(refreshToken: string, res: Response) {
    const adminData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!adminData) throw new NotFoundException("Admin not found");

    const admin = await this.adminService.findOne(adminData.id);
    await admin.updateOne({ hashed_refresh_token: "" });

    res.clearCookie("refresh_token");

    return {
      success: true,
      message: "Admin successfully signed out",
      adminId: admin.id,
    };
  }

  async refreshTokensAdmin(id: string, refresh_token: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refresh_token);
    if (decodedToken["id"] !== id)
      throw new UnauthorizedException("Unauthorized user");

    const admin = await this.adminService.findOne(id);
    if (!admin.hashed_refresh_token)
      throw new ForbiddenException("User not found");

    const tokenMatch = await bcrypt.compare(
      refresh_token,
      admin.hashed_refresh_token
    );
    if (!tokenMatch) throw new ForbiddenException("Forbidden user");

    const { accessToken, refreshToken } = await this.generateTokens(admin);

    await admin.updateOne({
      hashed_refresh_token: await bcrypt.hash(refreshToken, 7),
    });
    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_REFRESH_TOKEN_TIME),
      httpOnly: true,
    });

    return {
      success: true,
      message: "Admin tokens refreshed",
      adminId: admin.id,
      accessToken,
    };
  }

  // async signInCustomer(signInDto: SignInDto, res: Response) {
  //   const customer = await this.customerService.findAny({
  //     email: signInDto.email,
  //   });
  //   if (!customer) throw new BadRequestException("Email or password incorrect");

  //   const isValidPassword = await bcrypt.compare(
  //     signInDto.password,
  //     customer.
  //   );
  //   if (!isValidPassword)
  //     throw new BadRequestException("Email or password incorrect");

  //   const { accessToken, refreshToken } = await this.generateTokens(customer);

  //   res.cookie("refresh_token", refreshToken, {
  //     maxAge: Number(process.env.COOKIE_REFRESH_TOKEN_TIME),
  //     httpOnly: true,
  //   });

  //   customer.hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
  //   await customer.save();

  //   return {
  //     success: true,
  //     message: "Customer successfully signed in",
  //     accessToken,
  //   };
  // }

  // async signOutCustomer(refreshToken: string, res: Response) {
  //   const customerData = await this.jwtService.verify(refreshToken, {
  //     secret: process.env.REFRESH_TOKEN_KEY,
  //   });
  //   if (!customerData) throw new NotFoundException("Customer not found");

  //   const customer = await this.customerService.findOne(customerData.id);
  //   await customer.updateOne({ hashed_refresh_token: "" });

  //   res.clearCookie("refresh_token");

  //   return {
  //     success: true,
  //     message: "Customer successfully signed out",
  //     customerId: customer.id,
  //   };
  // }

  // async refreshTokensCustomer(
  //   id: string,
  //   refresh_token: string,
  //   res: Response
  // ) {
  //   const decodedToken = await this.jwtService.decode(refresh_token);
  //   if (decodedToken["id"] !== id)
  //     throw new UnauthorizedException("Unauthorized user");

  //   const customer = await this.customerService.findOne(id);
  //   if (!customer.hashed_refresh_token)
  //     throw new ForbiddenException("User not found");

  //   const tokenMatch = await bcrypt.compare(
  //     refresh_token,
  //     customer.hashed_refresh_token
  //   );
  //   if (!tokenMatch) throw new ForbiddenException("Forbidden user");

  //   const { accessToken, refreshToken } = await this.generateTokens(customer);

  //   await customer.updateOne({
  //     hashed_refresh_token: await bcrypt.hash(refreshToken, 7),
  //   });
  //   res.cookie("refresh_token", refreshToken, {
  //     maxAge: Number(process.env.COOKIE_REFRESH_TOKEN_TIME),
  //     httpOnly: true,
  //   });

  //   return {
  //     success: true,
  //     message: "Customer tokens refreshed",
  //     customerId: customer.id,
  //     accessToken,
  //   };
  // }
}
