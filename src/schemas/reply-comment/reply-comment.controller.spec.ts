import { Test, TestingModule } from '@nestjs/testing';
import { ReplyCommentController } from './reply-comment.controller';
import { ReplyCommentService } from './reply-comment.service';

describe('ReplyCommentController', () => {
  let replycommentController: ReplyCommentController;

  const dataReplyComment = {
    _id: '634cf5ac2f0e57f6dcda22a7',
    updatedBy: null,
    content: 'Dong ho',
    isDeleted: false,
    user: '634cf5ac2f0e57f6dcda22a7',
    createdAt: '2022-10-17T06:26:52.691Z',
    updatedAt: '2022-10-17T06:26:52.691Z',
    __v: 0,
  };

  const mockReplyCommentService = {
    create: jest.fn().mockImplementation(() => dataReplyComment),
    update: jest.fn().mockImplementation(() => ({
      success: true,
    })),
    delete: jest.fn().mockImplementation(() => ({
      success: true,
    })),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ReplyCommentController],
      providers: [
        {
          provide: ReplyCommentService,
          useValue: mockReplyCommentService,
        },
      ],
    }).compile();

    replycommentController = app.get<ReplyCommentController>(ReplyCommentController);
  });

  describe('POST create', () => {
    it('should create a reply-comment', async () => {
      const body = {
        content: 'Mu len',
        comment: '6336a105f4a518801048b606',
      };
      const user = {
        _id: '634cf5ac2f0e57f6dcda22a7',
      };
      expect(await replycommentController.create(body, user)).toStrictEqual(dataReplyComment);
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
      expect(await replycommentController.update(id, body)).toStrictEqual(result);
    });
  });

  describe('DELETE delete', () => {
    it('should return delete success', async () => {
      const id = '634cf5ac2f0e57f6dcda22a7';
      const result = {
        success: true,
      };
      expect(await replycommentController.delete(id)).toStrictEqual(result);
    });
  });
});
