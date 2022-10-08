import { swaggerSchemaExample } from 'src/shared/utils/swagger_schema';

export const AUTH_SWAGGER_RESPONSE = {
  LOGIN_SUCCESS: swaggerSchemaExample(
    {
      data: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        accessTokenExpire: 86400,
        isFirstTimeLogin: true,
      },
      statusCode: 200,
    },
    'login success',
  ),
  LOGIN_FAIL: swaggerSchemaExample(
    {
      message: 'User not found, disabled or locked',
      code: 'sys00001',
      statusCode: 404,
    },
    'User not found',
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
