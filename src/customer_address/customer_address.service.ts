import { Injectable } from "@nestjs/common";
import { CreateCustomerAddressDto } from "./dto/create-customer_address.dto";
import { UpdateCustomerAddressDto } from "./dto/update-customer_address.dto";
import { InjectModel } from "@nestjs/mongoose";
import { CustomerAddress } from "./schemas/customer_address.schema";
import { Model } from "mongoose";
import { NotFoundException } from "@nestjs/common";

@Injectable()
export class CustomerAddressService {
  constructor(
    @InjectModel(CustomerAddress.name)
    private readonly customerAddressSchema: Model<CustomerAddress>
  ) {}

  async create(createCustomerAddressDto: CreateCustomerAddressDto) {
    const newCustomerAddress = await this.customerAddressSchema.create(
      createCustomerAddressDto
    );

    return {
      success: true,
      message: "CustomerAddress successfully created",
      newCustomerAddress,
    };
  }

  async findAll() {
    const allCustomerAddresses = await this.customerAddressSchema
      .find()
      .populate("region_id")
      .populate("district_id")
      .populate("customer_id");
    if (allCustomerAddresses.length === 0)
      throw new NotFoundException("CustomerAddresses not found");

    return { success: true, allCustomerAddresses };
  }

  async findOne(id: string) {
    const customerAddress = await this.customerAddressSchema
      .findById(id)
      .populate("region_id")
      .populate("district_id")
      .populate("customer_id");
    if (!customerAddress)
      throw new NotFoundException("CustomerAddress not found");

    return customerAddress;
  }

  async update(id: string, updateCustomerAddressDto: UpdateCustomerAddressDto) {
    const updatedCustomerAddress =
      await this.customerAddressSchema.findByIdAndUpdate(
        id,
        updateCustomerAddressDto
      );

    if (!updatedCustomerAddress)
      throw new NotFoundException("CustomerAddress not found");

    return {
      success: true,
      message: "CustomerAddress successfully updated",
      updatedCustomerAddress,
    };
  }

  async remove(id: string) {
    const deletedCustomerAddress =
      await this.customerAddressSchema.findByIdAndDelete(id);

    if (!deletedCustomerAddress)
      throw new NotFoundException("CustomerAddress not found");

    return {
      success: true,
      message: "CustomerAddress successfully deleted",
      deletedCustomerAddress,
    };
  }
}
