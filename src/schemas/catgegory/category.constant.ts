import { swaggerSchemaExample } from '../../shared/utils/swagger_schema';

export const CATEGORY_CONST = {
  MODEL_NAME: 'category',
  MODEL_PROVIDER: 'CATEGORY_MODEL',
};

export enum CategoryStatus {
  ACTIVE = 1,
  INACTIVE = 0,
}
export const CATEGORY_SWAGGER_RESPONSE = {
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

  BAD_REQUEST_CATEGORY_EXISTED: swaggerSchemaExample(
    {
      message: 'Slug existed',
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
};

export const CATEGORY_REPONE = {
  SLUG_EXISTED: 'Slug or Name is existed',
  BAD_REQUEST: 'bad request',
  CATEGORY_HAVE_PRODUCTS: `Category Have Products Don't Delete`,
  PRODUCT_NOT_FOUND: 'Product not found',
};
