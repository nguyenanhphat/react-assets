import user from './user';

export default {
  paths: {
    '/api/maintenanceHistories/list': {
      get: {
        description: 'Get maintenanceHistory list',
        tags: ['Asset management'],
        operationId: 'getMaintenanceHistoryList',
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
                    MaintenanceHistories: {
                      type: 'array',
                      items: {
                        type: 'object',
                        $ref: '#/definitions/MaintenanceHistory',
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
    '/api/maintenanceHistories/detail/:id': {
      get: {
        description: 'Get maintenanceHistory detail',
        tags: ['Asset management'],
        operationId: 'getMaintenanceHistoryDetail',
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
                    maintenanceHistory: {
                      type: 'object',
                      $ref: '#/definitions/MaintenanceHistory',
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
    '/api/maintenanceHistories/detail - post': {
      post: {
        description: 'Create maintenanceHistory',
        tags: ['Asset management'],
        operationId: 'createMaintenanceHistory',
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
                cost: {
                  type: 'integer',
                  example: 2000000,
                },
                costCurrencyUnitId: {
                  type: 'integer',
                  example: 2,
                },
                supplierContractId: {
                  type: 'integer',
                  example: 2,
                },
                supplierId: {
                  type: 'integer',
                  example: 2,
                },
                issueDate: {
                  type: 'integer',
                  example: '2020-11-26T14:24:58.080Z',
                },
                completedDate: {
                  type: 'integer',
                  example: '2020-11-26T14:24:58.080Z',
                },
                details: {
                  type: 'string',
                  example: 'Core I7 - Ram 16GB - 256GB',
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
                    maintenanceHistory: {
                      type: 'object',
                      $ref: '#/definitions/MaintenanceHistory',
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
    '/api/maintenanceHistories/detail/:id - put': {
      put: {
        description: 'Update maintenanceHistory',
        tags: ['Asset management'],
        operationId: 'updateMaintenanceHistory',
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
                cost: {
                  type: 'integer',
                  example: 2000000,
                },
                costCurrencyUnitId: {
                  type: 'integer',
                  example: 2,
                },
                supplierContractId: {
                  type: 'integer',
                  example: 2,
                },
                supplierId: {
                  type: 'integer',
                  example: 2,
                },
                issueDate: {
                  type: 'integer',
                  example: '2020-11-26T14:24:58.080Z',
                },
                completedDate: {
                  type: 'integer',
                  example: '2020-11-26T14:24:58.080Z',
                },
                details: {
                  type: 'string',
                  example: 'Core I7 - Ram 16GB - 256GB',
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
                    maintenanceHistory: {
                      type: 'object',
                      $ref: '#/definitions/MaintenanceHistory',
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
    MaintenanceHistory_Asset: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 1 },
        status: { type: 'string', example: 'inStorage' },
        name: { type: 'string', example: 'Mac2015 production' },
        typeId: { type: 'integer', example: 1 },
        subTypeId: { type: 'integer', example: 1 },
      },
    },
    MaintenanceHistory_CostCurrencyUnit: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 1 },
        name: { type: 'string', example: 'VND' },
        group: { type: 'string', example: 'currencyUnit' },
      },
    },
    MaintenanceHistory: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 1 },
        issueDate: { type: 'string', example: '2020-11-26T07:36:01.763Z' },
        completedDate: { type: 'string', example: '2020-11-26T07:36:01.763Z' },
        cost: { type: 'integer', example: 1000000 },
        supplierContractId: { type: 'integer', example: 1 },
        supplierId: { type: 'integer', example: 1 },
        details: { type: 'string', example: 'The app is about a mobile APP for a glasses store. the idea is to have all glasses listed' },
        asset: { type: 'object', $ref: '#/definitions/MaintenanceHistory_Asset' },
        costCurrencyUnit: { type: 'object', $ref: '#/definitions/MaintenanceHistory_CostCurrencyUnit' },
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
