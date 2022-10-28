import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let userController: UserController;

  const dataUser = {
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

  const mockUserService = {
    changePassword: jest.fn().mockImplementation(() => ({
      success: true,
    })),
    getAll: jest.fn().mockImplementation(() => ({
      data: [dataUser],
      total: 1,
      totalPage: 1,
      pageSize: 10,
      page: null,
    })),
    create: jest.fn().mockImplementation(() => dataUser),
    getById: jest.fn().mockImplementation(() => dataUser),
    update: jest.fn().mockImplementation(() => ({
      success: true,
    })),
    delete: jest.fn().mockImplementation(() => ({
      success: true,
    })),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    userController = app.get<UserController>(UserController);
  });

  describe('GET user', () => {
    it('should return list', async () => {
      const result = {
        data: [dataUser],
        total: 1,
        totalPage: 1,
        pageSize: 10,
        page: null,
      };
      expect(await userController.getAll(query)).toStrictEqual(result);
    });
  });

  describe('POST create', () => {
    it('should register a user', async () => {
      const body = {
        email: 'abc@gmail.com',
        password: '123456',
        name: 'Quoc Khanh',
        age: 22,
        phoneNumber: '+84 379416224',
        address: 'Ha Noi',
      };
      expect(await userController.register(body)).toStrictEqual(dataUser);
    });
  });

  describe('GET getById', () => {
    it('should return an user', async () => {
      const id = '634cf5ac2f0e57f6dcda22a7';
      expect(await userController.getById(id)).toStrictEqual(dataUser);
    });
  });

  describe('PATCH update', () => {
    it('should return update success', async () => {
      const id = '634cf5ac2f0e57f6dcda22a7';
      const body = {
        email: 'abc@gmail.com',
        password: '123456',
        name: 'Quoc Khanh',
        age: 22,
        phoneNumber: '+84 379416224',
        address: 'Ha Noi',
      };
      const result = {
        success: true,
      };
      expect(await userController.updateInfo(id, body)).toStrictEqual(result);
    });
  });

  describe('DELETE delete', () => {
    it('should return delete success', async () => {
      const id = '634cf5ac2f0e57f6dcda22a7';
      const result = {
        success: true,
      };
      expect(await userController.inActive(id)).toStrictEqual(result);
    });
  });
});
