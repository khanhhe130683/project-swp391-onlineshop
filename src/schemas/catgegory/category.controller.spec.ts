import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

describe('CategoryController', () => {
  let categoryController: CategoryController;

  const dataCategory = {
    _id: '634cf5ac2f0e57f6dcda22a7',
    updatedBy: null,
    name: 'Dong ho',
    slug: 'dong-ho',
    isDeleted: false,
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
  };

  const mockCategoryService = {
    getAll: jest.fn().mockImplementation(() => ({
      data: [dataCategory],
      total: 1,
      totalPage: 1,
      pageSize: 10,
      page: null,
    })),
    findAll: jest.fn().mockImplementation(() => ({
      data: [dataCategory],
      total: 1,
      totalPage: 1,
      pageSize: 10,
      page: null,
    })),
    create: jest.fn().mockImplementation(() => dataCategory),
    getById: jest.fn().mockImplementation(() => dataCategory),
    update: jest.fn().mockImplementation(() => ({
      success: true,
    })),
    delete: jest.fn().mockImplementation(() => ({
      success: true,
    })),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: mockCategoryService,
        },
      ],
    }).compile();

    categoryController = app.get<CategoryController>(CategoryController);
  });

  describe('GET category', () => {
    it('should return list', async () => {
      const result = {
        data: [dataCategory],
        total: 1,
        totalPage: 1,
        pageSize: 10,
        page: null,
      };
      expect(await categoryController.getList(query)).toStrictEqual(result);
    });
  });

  describe('GET findAll', () => {
    it('should return an example list', async () => {
      const result = {
        data: [dataCategory],
        total: 1,
        totalPage: 1,
        pageSize: 10,
        page: null,
      };
      expect(await categoryController.findAll()).toStrictEqual(result);
    });
  });

  describe('POST create', () => {
    it('should create a category', async () => {
      const body = {
        name: 'Mu len',
        slug: 'mu-len',
      };
      expect(await categoryController.create(body)).toStrictEqual(dataCategory);
    });
  });

  describe('GET getById', () => {
    it('should return an category', async () => {
      const id = '634cf5ac2f0e57f6dcda22a7';
      expect(await categoryController.getById(id)).toStrictEqual(dataCategory);
    });
  });

  describe('PATCH update', () => {
    it('should return update success', async () => {
      const id = '634cf5ac2f0e57f6dcda22a7';
      const body = {
        name: 'Mu len',
        slug: 'mu-len',
      };
      const result = {
        success: true,
      };
      expect(await categoryController.update(id, body)).toStrictEqual(result);
    });
  });

  describe('DELETE delete', () => {
    it('should return delete success', async () => {
      const id = '634cf5ac2f0e57f6dcda22a7';
      const result = {
        success: true,
      };
      expect(await categoryController.delete(id)).toStrictEqual(result);
    });
  });
});
