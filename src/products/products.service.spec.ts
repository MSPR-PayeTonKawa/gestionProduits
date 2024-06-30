import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: Repository<Product>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a product', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Product',
        price: 100,
      };
      const savedProduct = { id: '1', ...createProductDto };

      mockRepository.create.mockReturnValue(savedProduct);
      mockRepository.save.mockResolvedValue(savedProduct);

      expect(await service.create(createProductDto)).toEqual(savedProduct);
      expect(mockRepository.create).toHaveBeenCalledWith(createProductDto);
      expect(mockRepository.save).toHaveBeenCalledWith(savedProduct);
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const products = [{ id: '1', name: 'Product', price: 100 }];
      mockRepository.find.mockResolvedValue(products);

      expect(await service.findAll()).toEqual(products);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a product', async () => {
      const product = { id: '1', name: 'Product', price: 100 };
      mockRepository.findOne.mockResolvedValue(product);

      expect(await service.findOne('1')).toEqual(product);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should throw a NotFoundException if product is not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });

  describe('update', () => {
    it('should update and return a product', async () => {
      const updateProductDto: UpdateProductDto = {
        name: 'Updated Product',
        price: 200,
      };
      const updatedProduct = { id: '1', ...updateProductDto };

      mockRepository.update.mockResolvedValue({ affected: 1 });
      mockRepository.findOne.mockResolvedValue(updatedProduct);

      expect(await service.update('1', updateProductDto)).toEqual(
        updatedProduct,
      );
      expect(mockRepository.update).toHaveBeenCalledWith('1', updateProductDto);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should throw a NotFoundException if product to update is not found', async () => {
      mockRepository.update.mockResolvedValue({ affected: 0 });

      await expect(
        service.update('1', { name: 'Updated Product', price: 200 }),
      ).rejects.toThrow(NotFoundException);
      expect(mockRepository.update).toHaveBeenCalledWith('1', {
        name: 'Updated Product',
        price: 200,
      });
    });
  });

  describe('remove', () => {
    it('should delete a product', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      await expect(service.remove('1')).resolves.toBeUndefined();
      expect(mockRepository.delete).toHaveBeenCalledWith('1');
    });

    it('should throw a NotFoundException if product to delete is not found', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 0 });

      await expect(service.remove('1')).rejects.toThrow(NotFoundException);
      expect(mockRepository.delete).toHaveBeenCalledWith('1');
    });
  });
});
