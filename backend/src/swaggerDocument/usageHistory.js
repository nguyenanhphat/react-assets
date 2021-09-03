import user from './user';

export default {
  paths: {
    '/api/usageHistories/list': {
      get: {
        description: 'Get usageHistory list',
        tags: ['Asset management'],
        operationId: 'getUsageHistoryList',
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            schema: {
              type: 'object',
              properties: {
                limit: {
                  type: 'integer',
                  example: 10,
                },
                page: {
                  type: 'integer',
                  example: 0,
                },
                assetId: {
                  type: 'integer',
                  example: 1,
                },
                name: {
                  type: 'string',
                  example: 'justin',
                },
              },
            },
          },
        ],
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
                    usageHistories: {
                      type: 'array',
                      items: {
                        type: 'object',
                        $ref: '#/definitions/UsageHistory',
                      },
                    },
                    count: {
                      type: 'integer',
                      example: 21,
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
    '/api/usageHistories/detail/:id': {
      get: {
        description: 'Get usageHistory detail',
        tags: ['Asset management'],
        operationId: 'getUsageHistoryDetail',
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
                    usageHistory: {
                      type: 'object',
                      $ref: '#/definitions/UsageHistory',
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
    '/api/usageHistories/detail - post': {
      post: {
        description: 'Create usageHistory',
        tags: ['Asset management'],
        operationId: 'createUsageHistory',
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            schema: {
              type: 'object',
              properties: {
                assetId: {
                  type: 'integer',
                  example: 1,
                },
                assigneeId: {
                  type: 'integer',
                  example: 2,
                },
                assignerId: {
                  type: 'integer',
                  example: 2,
                },
                locationId: {
                  type: 'integer',
                  example: 2,
                },
                usageFrom: {
                  type: 'integer',
                  example: '2020-11-26T14:24:58.080Z',
                },
                usageTo: {
                  type: 'integer',
                  example: '2020-11-26T14:24:58.080Z',
                },
                handoverContent: {
                  type: 'string',
                  example: 'Core I7 - Ram 16GB - 256GB',
                },
                attachmentIds: {
                  type: 'array',
                  items: {
                    type: 'integer',
                    example: 1,
                  },
                },
              },
            },
          },
        ],
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
                    usageHistory: {
                      type: 'object',
                      $ref: '#/definitions/UsageHistory',
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
    '/api/usageHistories/detail/:id - put': {
      put: {
        description: 'Update usageHistory',
        tags: ['Asset management'],
        operationId: 'updateUsageHistory',
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            schema: {
              type: 'object',
              properties: {
                assetId: {
                  type: 'integer',
                  example: 1,
                },
                assigneeId: {
                  type: 'integer',
                  example: 2,
                },
                assignerId: {
                  type: 'integer',
                  example: 2,
                },
                locationId: {
                  type: 'integer',
                  example: 2,
                },
                usageFrom: {
                  type: 'integer',
                  example: '2020-11-26T14:24:58.080Z',
                },
                usageTo: {
                  type: 'integer',
                  example: '2020-11-26T14:24:58.080Z',
                },
                handoverContent: {
                  type: 'string',
                  example: 'Core I7 - Ram 16GB - 256GB',
                },
                attachmentIds: {
                  type: 'array',
                  items: {
                    type: 'integer',
                    example: 1,
                  },
                },
              },
            },
          },
        ],
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
                    usageHistory: {
                      type: 'object',
                      $ref: '#/definitions/UsageHistory',
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
    UsageHistory_Asset: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 1 },
        status: { type: 'string', example: 'inStorage' },
        name: { type: 'string', example: 'Mac2015 production' },
        typeId: { type: 'integer', example: 1 },
        subTypeId: { type: 'integer', example: 1 },
      },
    },
    UsageHistory_Location: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 1 },
        name: { type: 'string', example: 'HCM' },
        group: { type: 'string', example: 'location' },
      },
    },
    UsageHistory_Assignee: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 1 },
        empCode: { type: 'string', example: 'khoa.nguyen' },
        firstName: { type: 'string', example: 'Khoa' },
        lastName: { type: 'string', example: 'Nguyen' },
        email: { type: 'string', example: 'khoa.nguyen@saigontechnology.com' },
        isActive: { type: 'boolean', example: true },
        lastSyncDate: { type: 'string', example: '2020-12-04T06:19:38.726Z' },
      },
    },
    UsageHistory: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 1 },
        usageFrom: { type: 'string', example: '2020-11-26T07:36:01.763Z' },
        usageTo: { type: 'string', example: '2020-11-26T07:36:01.763Z' },
        status: { type: 'string', example: 'handedOver' },
        handoverContent: { type: 'string', example: 'The app is about a mobile APP for a glasses store. the idea is to have all glasses listed' },
        asset: { type: 'object', $ref: '#/definitions/UsageHistory_Asset' },
        location: { type: 'object', $ref: '#/definitions/UsageHistory_Location' },
        assignee: { type: 'object', $ref: '#/definitions/UsageHistory_Assignee' },
        handoverDocuments: {
          type: 'array',
          items: {
            type: 'object',
            $ref: '#/definitions/Assets_Attachment',
          },
        },
      },
    },
    ...user.definitions,
  },
  tags: [
    {
      name: 'Assets',
      description: 'Asset management apis',
    },
  ],
};
