import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTypeDto } from "./dto/create-type.dto";
import { UpdateTypeDto } from "./dto/update-type.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Type } from "./schemas/type.schema";
@Injectable()
export class TypeService {
  constructor(
    @InjectModel(Type.name) private readonly typeSchema: Model<Type>
  ) {}

  async create(createTypeDto: CreateTypeDto) {
    const newType = await this.typeSchema.create(createTypeDto);

    return { success: true, message: "Type successfully created", newType };
  }

  async findAll() {
    const allTypes = await this.typeSchema.find();
    if (allTypes.length === 0) throw new NotFoundException("Types not found");

    return { success: true, allTypes };
  }

  async findOne(id: string) {
    const type = await this.typeSchema.findById(id);
    if (!type) throw new NotFoundException("Type not found");

    return { success: true, type };
  }

  async update(id: string, updateTypeDto: UpdateTypeDto) {
    const updatedType = await this.typeSchema.findByIdAndUpdate(
      id,
      updateTypeDto
    );
    if (!updatedType) throw new NotFoundException("Type not found");

    return { success: true, message: "Type successfully updated", updatedType };
  }

  async remove(id: string) {
    const deletedType = await this.typeSchema.findByIdAndDelete(id);
    if (!deletedType) throw new NotFoundException("Type not found");

    return { success: true, message: "Type successfully deleted", deletedType };
  }
}
