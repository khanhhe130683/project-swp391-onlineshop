import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

describe('ProductController', () => {
  let productController: ProductController;

  const dataProduct = {
    _id: '634cf5ac2f0e57f6dcda22a7',
    updatedBy: null,
    content: 'Dong ho',
    isDeleted: false,
    user: '634cf5ac2f0e57f6dcda22a7',
    createdAt: '2022-10-17T06:26:52.691Z',
    updatedAt: '2022-10-17T06:26:52.691Z',
    __v: 0,
  };
  const query = {
    page: null,
    pageSize: null,
    sortBy: null,
    sortOrder: null,
    search: null,
    category: null,
  };

  const mockProductService = {
    getAll: jest.fn().mockImplementation(() => ({
      data: [dataProduct],
      total: 1,
      totalPage: 1,
      pageSize: 10,
      page: null,
    })),
    getById: jest.fn().mockImplementation(() => dataProduct),
    update: jest.fn().mockImplementation(() => ({
      success: true,
    })),
    delete: jest.fn().mockImplementation(() => ({
      success: true,
    })),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: mockProductService,
        },
      ],
    }).compile();

    productController = app.get<ProductController>(ProductController);
  });

  describe('GET product', () => {
    it('should return list', async () => {
      const result = {
        data: [dataProduct],
        total: 1,
        totalPage: 1,
        pageSize: 10,
        page: null,
      };
      expect(await productController.getAll(query)).toStrictEqual(result);
    });
  });

  describe('GET a product', () => {
    it('should return a product', async () => {
      const id = '634cf5ac2f0e57f6dcda22a7';
      expect(await productController.getById(id)).toStrictEqual(dataProduct);
    });
  });

  describe('DELETE delete', () => {
    it('should return delete success', async () => {
      const id = '634cf5ac2f0e57f6dcda22a7';
      const result = {
        success: true,
      };
      expect(await productController.delete(id)).toStrictEqual(result);
    });
  });
});
