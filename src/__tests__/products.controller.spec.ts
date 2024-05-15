import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from '../../src/products/products.controller';
import { ProductsService } from '../../src/products/products.service';
import { CreateProductDto } from '../../src/products/dto/create-product.dto';
import { UpdateProductDto } from 'src/products/dto/update-product.dto';
import { ObjectId } from 'mongodb';

const mockProduct = {
  _id: new ObjectId(),
  name: 'Test Product',
  price: 100,
  description: 'Test Description',
  category: 'Test Category',
  stock: 10,
};

const mockProductArray = [mockProduct];

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockProduct),
            findAll: jest.fn().mockResolvedValue(mockProductArray),
            findOne: jest.fn().mockResolvedValue(mockProduct),
            update: jest.fn().mockResolvedValue(mockProduct),
            remove: jest.fn().mockResolvedValue(mockProduct),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a product', async () => {
    const createProductDto: CreateProductDto = {
      name: 'Test Product',
      price: 100,
    };
    const newProduct = await controller.create(createProductDto);
    expect(newProduct).toEqual(mockProduct);
    expect(service.create).toHaveBeenCalledWith(createProductDto);
  });

  it('should return an array of products', async () => {
    const products = await controller.findAll();
    expect(products).toEqual(mockProductArray);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a single product', async () => {
    const product = await controller.findOne(mockProduct._id.toString());
    expect(product).toEqual(mockProduct);
    expect(service.findOne).toHaveBeenCalledWith(mockProduct._id.toString());
  });

  it('should update a product', async () => {
    const updateProductDto: UpdateProductDto = { name: 'Updated Product' };
    const updatedProduct = await controller.update(mockProduct._id.toString(), updateProductDto);
    expect(updatedProduct).toEqual(mockProduct);
    expect(service.update).toHaveBeenCalledWith(mockProduct._id.toString(), updateProductDto);
  });

  it('should delete a product', async () => {
    const result = await controller.remove(mockProduct._id.toString());
    expect(result).toEqual(mockProduct);
    expect(service.remove).toHaveBeenCalledWith(mockProduct._id.toString());
  });
});