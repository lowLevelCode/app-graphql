import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './inputs/create-product.input';
import { UpdateProductInput } from './inputs/update-product.input';
import { Product } from './types/product.type';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsService {

  products: Product[] = [
    { _id: '5ad3dc57-9b41-452d-9612-ab2632108892', name: 'Ms. Harriet Kuhn', description: 'Rolando Bailey I' },
    { _id: '2e6f033c-63fd-4105-8734-d64af5121e6e', name: 'Emma Jacobs', description: 'Kara Bahringer' },
    { _id: '60c5a2e6-aa5c-4d69-ab2f-998702acd6c7', name: 'Suzanne Muller', description: 'Mrs. Devin Sawayn' },
    { _id: '17728297-4251-42a8-9c45-af45f5b05431', name: 'Dr. Pearl Raynor', description: 'Stewart Ziemann PhD' },
  ];

  create(createProductInput: CreateProductInput): any {
    let newCreateProduct = {
      _id: uuidv4(),
      ...createProductInput
    }

    this.products.push(newCreateProduct);

    return createProductInput;
  }

  findAll(): Product[] {
    return this.products;
  }

  findOne(_id: string): Product {
    return this.products.find(product=> product._id == _id);
  }

  update(_id: string, updateProductInput: UpdateProductInput) {    
    return `This action updates a #${_id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
