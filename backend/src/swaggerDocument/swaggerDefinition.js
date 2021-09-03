import user from './user';
import asset from './asset';
import usageHistory from './usageHistory';
import maintenanceHistory from './maintenanceHistory';
import generalSetting from './generalSetting';
import module from './module';
export default {
  info: {
    description: 'STS asset',
    version: '1.0.0',
    title: 'STS Asset',
  },
  host: process.env.SERVER_DOMAIN,
  basePath: '',
  swagger: '2.0',
  produces: ['application/json'],
  schemes: ['http', 'https'],
  paths: {
    '/api/myAssets': {
      get: {
        description: 'Get My assets',
        tags: ['MyAssets'],
        operationId: 'getMyAssets',
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
                    assets: {
                      type: 'array',
                      items: {
                        type: 'object',
                        $ref: '#/definitions/Asset',
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
      post: {
        description: 'Assign asset to current user',
        tags: ['MyAssets'],
        operationId: 'addAssetToMyAssets',
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
                    asset: {
                      type: 'object',
                      $ref: '#/definitions/Asset',
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
    '/api/myAssets:id': {
      get: {
        description: 'Get detail my assets',
        tags: ['MyAssets'],
        operationId: 'getMyAssetsDetail',
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
                    asset: {
                      type: 'object',
                      $ref: '#/definitions/Asset',
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
    ...user.paths,
    ...asset.paths,
    ...module.paths,
    ...usageHistory.paths,
    ...maintenanceHistory.paths,
    ...generalSetting.paths,
  },
  tags: [
    {
      name: 'MyAssets',
      description: 'Current User Assets',
    },
    ...user.tags,
    ...generalSetting.tags,
  ],
  definitions: {
    MyAssets_Specification: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 1 },
        model: { type: 'string', example: 'B101AW0643' },
        serialNumber: { type: 'string', example: 'RHRMH0829838484YY4' },
        manufacturerId: { type: 'integer', example: 1 },
        uuid: { type: 'integer', example: 33843802 },
        warrantyPeriod: { type: 'string', example: '2020-11-26T14:24:57.410Z' },
        technicalSpecification: {
          type: 'string',
          example: 'Core I7 - Ram 16GB - 256GB',
        },
      },
    },
    MyAssets_Purchase: {
      type: 'object',
      properties: {
        state: { type: 'string', example: 'new' },
        time: { type: 'string', example: '2020-11-26T14:24:57.410Z' },
        cost: { type: 'integer', example: 1000000 },
        costCurrencyUnitId: { type: 'integer', example: 1 },
        supplierId: { type: 'integer', example: 1 },
        supplierContractId: { type: 'integer', example: 1 },
      },
    },
    MyAssets_UsageHistory: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 1 },
        assetId: { type: 'integer', example: 1 },
        assigneeId: { type: 'integer', example: 1 },
        assignerId: { type: 'integer', example: 1 },
        locationId: { type: 'integer', example: 1 },
        usageFrom: { type: 'string', example: 1 },
        usageTo: { type: 'string', example: 1 },
        handoverContent: { type: 'string', example: 1 },
        asset: { type: 'object', example: null },
        assignee: { type: 'object', example: null },
        assigner: { type: 'object', example: null },
        location: { type: 'object', example: null },
      },
    },
    Asset: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 1 },
        status: { type: 'string', example: 'inStorage' },
        name: { type: 'string', example: 'Mac2015 production' },
        typeId: { type: 'integer', example: 1 },
        subTypeId: { type: 'integer', example: 1 },
        specification: {
          type: 'object',
          $ref: '#/definitions/MyAssets_Specification',
        },
        purchase: { type: 'object', $ref: '#/definitions/MyAssets_Purchase' },
        usageHistory: {
          type: 'object',
          $ref: '#/definitions/MyAssets_UsageHistory',
        },
      },
    },
    ...user.definitions,
    ...asset.definitions,
    ...usageHistory.definitions,
    ...maintenanceHistory.definitions,
    ...module.definitions,
    ...generalSetting.definitions,
  },
};
