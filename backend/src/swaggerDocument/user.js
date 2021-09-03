export default {
  paths: {
    '/api/user': {
      get: {
        description: 'Get users',
        tags: ['Users'],
        operationId: 'getUsers',
        produces: ['application/json'],
        responses: {
          200: {
            description: 'Success',
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean',
                  example: true,
                },
                message: {
                  type: 'string',
                  example: 'Success.',
                },
                errorCode: {
                  type: 'integer',
                  example: 200,
                },
                data: {
                  type: 'object',
                  properties: {
                    count: {
                      type: 'integer',
                      example: 10,
                    },
                    users: {
                      type: 'array',
                      items: {
                        type: 'object',
                        $ref: '#/definitions/User_User',
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Fail',
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean',
                  example: false,
                },
                message: {
                  type: 'string',
                  example: 'Fail.',
                },
                errorCode: {
                  type: 'integer',
                  example: 500,
                },
                data: {
                  type: 'object',
                  example: null,
                },
              },
            },
          },
        },
      },
    },
    '/api/user/sync': {
      get: {
        description: 'Sync user',
        tags: ['Users'],
        operationId: 'syncUser',
        produces: ['application/json'],
        responses: {
          200: {
            description: 'Success',
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean',
                  example: true,
                },
                message: {
                  type: 'string',
                  example: 'Success.',
                },
                errorCode: {
                  type: 'integer',
                  example: 200,
                },
                data: {
                  type: 'object',
                  properties: {
                    count: {
                      type: 'integer',
                      example: 10,
                    },
                    users: {
                      type: 'array',
                      items: {
                        type: 'object',
                        $ref: '#/definitions/User_User',
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Fail',
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean',
                  example: false,
                },
                message: {
                  type: 'string',
                  example: 'Fail.',
                },
                errorCode: {
                  type: 'integer',
                  example: 500,
                },
                data: {
                  type: 'object',
                  example: null,
                },
              },
            },
          },
        },
      },
    },
  },
  definitions: {
    User_User: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 1 },
        empCode: { type: 'string', example: 'khoa.nguyen' },
        firstName: { type: 'string', example: 'khoa' },
        lastName: { type: 'string', example: 'nguyen' },
        email: { type: 'string', example: 'khoa.nguyen@saigontechnology.com' },
        isActive: { type: 'boolean', example: true },
        lastSyncDate: {
          type: 'string',
          example: '2020-11-26T14:24:57.410Z',
        },
      },
    },
  },
  tags: [
    {
      name: 'Users',
      description: 'User management apis',
    },
  ],
};
