import { swaggerSchemaExample } from '../../shared/utils/swagger_schema';

export const DEFAULT_ADMIN_USER = {
  email: 'admin@gmail.com',
  password: '123456',
  name: 'Administrator',
};

export const USER_CONST = {
  MODEL_NAME: 'user',
  MODEL_PROVIDER: 'USER_MODEL',
};

export const USER_SWAGGER_RESPONSE = {
  CREATE_SUCCESS: swaggerSchemaExample(
    {
      data: {
        id: '6336a105f4a518801048b606',
        created_at: '2022-08-23T02:21:16.992Z',
        updated_at: '2022-08-23T02:21:16.992Z',
        name: 'Administrator',
        email: 'admin@gmail.com',
        age: 18,
        phoneNumber: '0379416224',
        address: 'Hai Duong',
        role: 'admin',
        isActive: true,
      },
    },
    'Create success',
  ),
  UPDATE_SUCCESS: swaggerSchemaExample(
    {
      data: {
        success: true,
      },
    },
    'Update success',
  ),
  CREATE_MULTIPLE_SUCCESS: swaggerSchemaExample(
    {
      data: {
        totalSuccess: 1,
        totalError: 0,
      },
    },
    'Create success',
  ),
  GET_USER_SUCCESS: swaggerSchemaExample(
    {
      data: {
        id: '6336a105f4a518801048b606',
        created_at: '2022-08-23T02:21:16.992Z',
        updated_at: '2022-08-23T02:21:16.992Z',
        name: 'Administrator',
        email: 'admin@gmail.com',
        age: 18,
        phoneNumber: '0379416224',
        address: 'Hai Duong',
        role: 'admin',
        isActive: true,
      },
    },
    'get user success',
  ),
  NOT_FOUND_EXCEPTION: swaggerSchemaExample(
    {
      message: 'not found exception',
      code: 'us00001',
      statusCode: 404,
    },
    'not found exception',
  ),
  BAD_REQUEST_CONFIRM_PASSWORD: swaggerSchemaExample(
    {
      message: 'Confirm password is not match new password ',
      code: 'us00006',
      statusCode: 400,
    },
    'bad request',
  ),
  BAD_REQUEST_WRONG_PASSWORD: swaggerSchemaExample(
    {
      message: 'Password does not match',
      code: 'us00005',
      statusCode: 400,
    },
    'bad request',
  ),
  BAD_REQUEST_USER_EXISTED: swaggerSchemaExample(
    {
      message: 'User existed',
      code: 'us00004',
      statusCode: 400,
    },
    'bad request',
  ),
  DELETE_SUCCESS: swaggerSchemaExample(
    {
      data: {
        success: true,
      },
    },
    'Delete success',
  ),
  GET_LIST_SUCCESS: swaggerSchemaExample(
    {
      data: [
        {
          id: '6336a105f4a518801048b606',
          created_at: '2022-08-23T02:21:16.992Z',
          updated_at: '2022-08-23T02:21:16.992Z',
          name: 'Administrator',
          email: 'admin@gmail.com',
          age: 18,
          phoneNumber: '0379416224',
          address: 'Hai Duong',
          role: 'admin',
          isActive: true,
        },
      ],
    },
    'get List User',
  ),
  BAD_REQUEST_EXCEPTION: swaggerSchemaExample(
    {
      message: 'bad exception',
      code: 'sys00001',
      statusCode: 400,
    },
    'bad request exception',
  ),
};
