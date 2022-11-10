import { swaggerSchemaExample } from '../../shared/utils/swagger_schema';

export const PRODUCT_SWAGGER_RESPONSE = {
  CREATE_SUCCESS: swaggerSchemaExample(
    {
      data: {
        id: '163282b13bec5fb726c7a8632',
        created_at: '2022-08-23T02:21:16.992Z',
        updated_at: '2022-08-23T02:21:16.992Z',
        category: '631b05a76591da678480d09f',
        name: 'Vòng cổ',
        description: 'Vòng cổ',
        image: ['553123ac22e610a4a710610a329bc105a3cf.png'],
        productCode: 'VCO',
        importPrice: 100,
        salePrice: 120,
        allowQuantity: 10,
        actualQuantity: 10,
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
  GET_PRODUCT_SUCCESS: swaggerSchemaExample(
    {
      data: {
        id: '163282b13bec5fb726c7a8632',
        created_at: '2022-08-23T02:21:16.992Z',
        updated_at: '2022-08-23T02:21:16.992Z',
        category: '631b05a76591da678480d09f',
        name: 'Vòng cổ',
        description: 'Vòng cổ',
        image: ['553123ac22e610a4a710610a329bc105a3cf.png'],
        productCode: 'VCO',
        importPrice: 100,
        salePrice: 120,
        allowQuantity: 10,
        actualQuantity: 10,
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
          category: '631b05a76591da678480d09f',
          name: 'Vòng cổ',
          description: 'Vòng cổ',
          image: ['553123ac22e610a4a710610a329bc105a3cf.png'],
          productCode: 'VCO',
          importPrice: 100,
          salePrice: 120,
          allowQuantity: 10,
          actualQuantity: 10,
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
