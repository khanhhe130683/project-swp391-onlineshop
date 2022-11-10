<<<<<<< HEAD
import { swaggerSchemaExample } from 'src/shared/utils/swagger_schema';
=======
import { swaggerSchemaExample } from '../../shared/utils/swagger_schema';
>>>>>>> khanhtq

export enum OrderStatus {
  CREATE = 'create',
  CONFIRM = 'confirm',
  SHIPPING = 'shipping',
  COMPLETE = 'complete',
  CANCEL = 'cancel',
}

export const ORDER_SWAGGER_RESPONSE = {
  CREATE_SUCCESS: swaggerSchemaExample(
    {
      data: {
        id: '163282b13bec5fb726c7a8632',
        created_at: '2022-08-23T02:21:16.992Z',
        updated_at: '2022-08-23T02:21:16.992Z',
        user: '631b05a76591da678480d09f',
        orderCode: '54567125',
        isDeleted: false,
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
  GET_ORDER_SUCCESS: swaggerSchemaExample(
    {
      data: {
        id: '163282b13bec5fb726c7a8632',
        created_at: '2022-08-23T02:21:16.992Z',
        updated_at: '2022-08-23T02:21:16.992Z',
        user: '631b05a76591da678480d09f',
        orderCode: '54567125',
        isDeleted: false,
      },
    },
    'get user success',
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
          id: '163282b13bec5fb726c7a8632',
          created_at: '2022-08-23T02:21:16.992Z',
          updated_at: '2022-08-23T02:21:16.992Z',
          user: '631b05a76591da678480d09f',
          orderCode: '54567125',
          isDeleted: false,
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
