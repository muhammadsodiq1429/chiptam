import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateCustomerCardDto } from "./dto/create-customer_card.dto";
import { UpdateCustomerCardDto } from "./dto/update-customer_card.dto";
import { InjectModel } from "@nestjs/mongoose";
import { CustomerCard } from "./schemas/customer_card.schema";
import { Model } from "mongoose";
import { NotFoundException } from "@nestjs/common";
import { CustomerService } from "../customer/customer.service";

@Injectable()
export class CustomerCardService {
  constructor(
    @InjectModel(CustomerCard.name)
    private readonly customerCardSchema: Model<CustomerCard>,
    private readonly customerService: CustomerService
  ) {}

  async create(createCustomerCardDto: CreateCustomerCardDto) {
    const { customer_id } = createCustomerCardDto;

    if (!(await this.customerService.findOne(customer_id))) {
      throw new BadRequestException(
        `Customer don't eixsts with id: ${customer_id} `
      );
    }
    const newCustomerCard = await this.customerCardSchema.create(
      createCustomerCardDto
    );

    return {
      success: true,
      message: "CustomerCard successfully created",
      newCustomerCard,
    };
  }

  async findAll() {
    const allCustomerCards = await this.customerCardSchema
      .find()
      .populate("customer_id");
    if (allCustomerCards.length === 0)
      throw new NotFoundException("CustomerCards not found");

    return { success: true, allCustomerCards };
  }

  async findOne(id: string) {
    const customerCard = await this.customerCardSchema
      .findById(id)
      .populate("customer_id");
    if (!customerCard) throw new NotFoundException("CustomerCard not found");

    return { success: true, customerCard };
  }

  async update(id: string, updateCustomerCardDto: UpdateCustomerCardDto) {
    const updatedCustomerCard = await this.customerCardSchema.findByIdAndUpdate(
      id,
      updateCustomerCardDto
    );
    if (!updatedCustomerCard)
      throw new NotFoundException("CustomerCard not found");

    return {
      success: true,
      message: "CustomerCard successfully updated",
      updatedCustomerCard,
    };
  }

  async remove(id: string) {
    const deletedCustomerCard =
      await this.customerCardSchema.findByIdAndDelete(id);
    if (!deletedCustomerCard)
      throw new NotFoundException("CustomerCard not found");

    return {
      success: true,
      message: "CustomerCard successfully deleted",
      deletedCustomerCard,
    };
  }
}
