import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ProductsService } from '../../src/products/products.service';
import { Product, ProductDocument } from '../schemas/product.schema';
import { Model } from 'mongoose';
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

const mockProductModel = {
  create: jest.fn().mockResolvedValue(mockProduct),
  find: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockProductArray),
  }),
  findById: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockProduct),
  }),
  findByIdAndUpdate: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockProduct),
  }),
  findByIdAndDelete: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockProduct),
  }),
};

describe('ProductsService', () => {
  let service: ProductsService;
  let model: Model<ProductDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getModelToken(Product.name),
          useValue: mockProductModel,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    model = module.get<Model<ProductDocument>>(getModelToken(Product.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new product', async () => {
    const newProduct = await service.create(mockProduct as any);
    expect(newProduct).toEqual(mockProduct);
    expect(model.create).toHaveBeenCalledWith(mockProduct);
  });

  it('should return an array of products', async () => {
    const products = await service.findAll();
    expect(products).toEqual(mockProductArray);
    expect(model.find).toHaveBeenCalled();
  });

  it('should return a single product', async () => {
    const product = await service.findOne(mockProduct._id.toString());
    expect(product).toEqual(mockProduct);
    expect(model.findById).toHaveBeenCalledWith(mockProduct._id.toString());
  });

  it('should update a product', async () => {
    const updateDto = { name: 'Updated Product' };
    const updatedProduct = await service.update(mockProduct._id.toString(), updateDto as any);
    expect(updatedProduct).toEqual(mockProduct);
    expect(model.findByIdAndUpdate).toHaveBeenCalledWith(mockProduct._id.toString(), updateDto, { new: true });
  });

  it('should delete a product', async () => {
    const result = await service.remove(mockProduct._id.toString());
    expect(result).toEqual(mockProduct);
    expect(model.findByIdAndDelete).toHaveBeenCalledWith(mockProduct._id.toString());
  });
});