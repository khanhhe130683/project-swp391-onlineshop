import { swaggerSchemaExample } from '../../shared/utils/swagger_schema';

export const COMMENT_SWAGGER_RESPONSE = {
  CREATE_SUCCESS: swaggerSchemaExample(
    {
      data: {
        name: 'giáo dục',
        slug: 'giao-duc',
        description: 'giáo dục',
        deleted_at: null,
        id: '1',
        created_at: '2022-09-29T07:21:18.974Z',
        updated_at: '2022-09-29T07:21:18.974Z',
        status: 1,
      },
    },
    'Create success',
  ),

  GET_LIST_SUCCESS: swaggerSchemaExample(
    {
      data: [
        {
          name: 'giáo dục',
          slug: 'giao-duc',
          description: 'giáo dục',
          deleted_at: null,
          id: '1',
          created_at: '2022-09-29T07:21:18.974Z',
          updated_at: '2022-09-29T07:21:18.974Z',
          status: 1,
        },
        {
          name: 'giáo dục1',
          slug: 'giao-duc1',
          description: 'giáo dục',
          deleted_at: null,
          id: '2',
          created_at: '2022-09-29T07:21:18.974Z',
          updated_at: '2022-09-29T07:21:18.974Z',
          status: 1,
        },
      ],
    },
    'Create success',
  ),

  BAD_REQUEST_EXCEPTION: swaggerSchemaExample(
    {
      message: 'bad exception',
      code: 'sys00001',
      statusCode: 400,
    },
    'bad request exception',
  ),

  NOT_FOUND_EXCEPTION: swaggerSchemaExample(
    {
      message: 'not found exception',
      code: 'us00001',
      statusCode: 404,
    },
    'not found exception',
  ),

  UPDATE_SUCCESS: swaggerSchemaExample(
    {
      data: {
        success: true,
      },
    },
    'Update success',
  ),

  DELETE_SUCCESS: swaggerSchemaExample(
    {
      data: {
        success: true,
      },
    },
    'Delete success',
  ),
};