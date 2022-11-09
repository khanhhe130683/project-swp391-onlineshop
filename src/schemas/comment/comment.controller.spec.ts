import { Test, TestingModule } from '@nestjs/testing';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

describe('CommentController', () => {
  let commentController: CommentController;

  const dataComment = {
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
  };

  const mockCommentService = {
    getAll: jest.fn().mockImplementation(() => ({
      data: [dataComment],
      total: 1,
      totalPage: 1,
      pageSize: 10,
      page: null,
    })),
    create: jest.fn().mockImplementation(() => dataComment),
    update: jest.fn().mockImplementation(() => ({
      success: true,
    })),
    delete: jest.fn().mockImplementation(() => ({
      success: true,
    })),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CommentController],
      providers: [
        {
          provide: CommentService,
          useValue: mockCommentService,
        },
      ],
    }).compile();

    commentController = app.get<CommentController>(CommentController);
  });

  describe('GET comment', () => {
    it('should return list', async () => {
      const result = {
        data: [dataComment],
        total: 1,
        totalPage: 1,
        pageSize: 10,
        page: null,
      };
      expect(await commentController.getAll(query)).toStrictEqual(result);
    });
  });

  describe('POST create', () => {
    it('should create a comment', async () => {
      const body = {
        content: 'Mu len',
        product: '6336a105f4a518801048b606',
      };
      const user = {
        _id: '634cf5ac2f0e57f6dcda22a7',
      };
      expect(await commentController.create(body, user)).toStrictEqual(dataComment);
    });
  });

  describe('PATCH update', () => {
    it('should return update success', async () => {
      const id = '634cf5ac2f0e57f6dcda22a7';
      const body = {
        content: 'Mu len',
      };
      const result = {
        success: true,
      };
      expect(await commentController.update(id, body)).toStrictEqual(result);
    });
  });

  describe('DELETE delete', () => {
    it('should return delete success', async () => {
      const id = '634cf5ac2f0e57f6dcda22a7';
      const result = {
        success: true,
      };
      expect(await commentController.delete(id)).toStrictEqual(result);
    });
  });
});
