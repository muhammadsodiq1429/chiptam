import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Customer } from "./schemas/customer.schema";
import { Model, ObjectId } from "mongoose";
import { ConflictException } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private readonly customerSchema: Model<Customer>
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const { email, phone, confirm_password, password } = createCustomerDto;

    if (await this.findAny({ email: email }))
      throw new ConflictException("Email already exists");
    if (await this.findAny({ phone: phone }))
      throw new ConflictException("Phone already exists");
    if (confirm_password !== password)
      throw new ConflictException("Passwords didn't match");

    const newCustomer = await this.customerSchema.create({
      ...createCustomerDto,
      hashed_password: await bcrypt.hash(password, 7),
    });

    return {
      success: true,
      message: "Customer successfully created",
      newCustomer: newCustomer.id,
    };
  }

  findAny(any: {}) {
    return this.customerSchema.findOne(any);
  }

  async findAll() {
    const allCustomers = await this.customerSchema.find();
    if (allCustomers.length === 0)
      throw new NotFoundException("Customers not found");

    return { success: true, allCustomers };
  }

  async findOne(id: ObjectId) {
    const customer = await this.customerSchema.findById(id);
    if (!customer) throw new NotFoundException("Customer not found");

    return { success: true, customer };
  }

  async update(id: ObjectId, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.customerSchema.findByIdAndUpdate(
      id,
      updateCustomerDto
    );
    if (!customer) throw new NotFoundException("Customer not found");

    return {
      success: true,
      message: "Customer successfully updated",
      customerId: id,
    };
  }

  async remove(id: ObjectId) {
    const customer = await this.customerSchema.findByIdAndDelete(id);
    if (!customer) throw new NotFoundException("Customer not found");

    return {
      success: true,
      message: "Customer successfully deleted",
      customerId: id,
    };
  }
}
