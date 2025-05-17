import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Admin } from "./schemas/admin.schema";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin.name) private adminSchema: Model<Admin>) {}

  async create(createAdminDto: CreateAdminDto) {
    const { password, confirm_password } = createAdminDto;

    if (password != confirm_password)
      throw new ConflictException("Passwords didn't match");

    const hashed_password = await bcrypt.hash(createAdminDto.password, 7);
    return this.adminSchema.create({ ...createAdminDto, hashed_password });
  }

  findByEmail(email: string) {
    return this.adminSchema.findOne({ email });
  }

  async findAll() {
    const allAdmins = await this.adminSchema.find();

    if (allAdmins.length === 0) throw new NotFoundException("Admins not found");

    return allAdmins;
  }

  async findOne(id: string) {
    const admin = await this.adminSchema.findById(id);
    if (!admin) throw new NotFoundException("Admin not found");

    return admin;
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminSchema.findByIdAndUpdate(id, updateAdminDto);

    return {
      success: true,
      message: "Admin successfully updated",
      adminId: id,
    };
  }

  async remove(id: string) {
    await this.adminSchema.findByIdAndDelete(id);
    return {
      success: true,
      message: "Admin successfully deleted",
      adminId: id,
    };
  }
}
