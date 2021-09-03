import user from './user';

export default {
  paths: {
    '/api/asset/list': {
      get: {
        description: 'Get asset list',
        tags: ['Asset management'],
        operationId: 'getAssetList',
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
                sortParam: {
                  type: 'string',
                  example: 'name',
                },
                sortOrder: {
                  type: 'string',
                  example: 'ASC',
                },
                name: {
                  type: 'string',
                  example: 'Mac2015',
                },
                typeIds: {
                  type: 'array',
                  items: {
                    type: 'integer',
                    example: 1,
                  },
                },
                subTypeIds: {
                  type: 'array',
                  items: {
                    type: 'integer',
                    example: 2,
                  },
                },
                locationIds: {
                  type: 'array',
                  items: {
                    type: 'integer',
                    example: 1,
                  },
                },
                supplierIds: {
                  type: 'array',
                  items: {
                    type: 'integer',
                    example: 1,
                  },
                },
                manufacturerIds: {
                  type: 'array',
                  items: {
                    type: 'integer',
                    example: 1,
                  },
                },
                assigneeIds: {
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
                    assets: {
                      type: 'array',
                      items: {
                        type: 'object',
                        $ref: '#/definitions/AssetWithoutAttachments',
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
    '/api/asset/detail/:id': {
      get: {
        description: 'Get asset detail',
        tags: ['Asset management'],
        operationId: 'getAssetDetail',
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
    '/api/asset/detail - post': {
      post: {
        description: 'Create asset',
        tags: ['Asset management'],
        operationId: 'createAsset',
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  example: 'Mac2015 production',
                },
                typeId: {
                  type: 'integer',
                  example: 1,
                },
                subTypeId: {
                  type: 'integer',
                  example: 2,
                },
                model: {
                  type: 'string',
                  example: 'B101AW0643',
                },
                serialNumber: {
                  type: 'string',
                  example: 'RHRMH0829838484YY4',
                },
                manufacturerId: {
                  type: 'integer',
                  example: 3,
                },
                uuid: {
                  type: 'integer',
                  example: 33843802,
                },
                warrantyPeriod: {
                  type: 'integer',
                  example: '2020-11-26T14:24:58.080Z',
                },
                technicalSpecification: {
                  type: 'string',
                  example: 'Core I7 - Ram 16GB - 256GB',
                },
                state: {
                  type: 'string',
                  example: 'new',
                },
                purchaseDate: {
                  type: 'integer',
                  example: '2020-11-26T14:24:58.080Z',
                },
                purchaseValue: {
                  type: 'integer',
                  example: '2020-11-26T14:24:58.080Z',
                },
                costCurrencyUnitId: {
                  type: 'integer',
                  example: 4,
                },
                supplierId: {
                  type: 'integer',
                  example: 1,
                },
                supplierContractId: {
                  type: 'integer',
                  example: 1,
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
    '/api/asset/detail/:id - put': {
      put: {
        description: 'Update asset',
        tags: ['Asset management'],
        operationId: 'updateAsset',
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  example: 'Mac2015 production',
                },
                typeId: {
                  type: 'integer',
                  example: 1,
                },
                subTypeId: {
                  type: 'integer',
                  example: 2,
                },
                model: {
                  type: 'string',
                  example: 'B101AW0643',
                },
                serialNumber: {
                  type: 'string',
                  example: 'RHRMH0829838484YY4',
                },
                manufacturerId: {
                  type: 'integer',
                  example: 3,
                },
                warrantyPeriod: {
                  type: 'integer',
                  example: '2020-11-26T14:24:58.080Z',
                },
                technicalSpecification: {
                  type: 'string',
                  example: 'Core I7 - Ram 16GB - 256GB',
                },
                state: {
                  type: 'string',
                  example: 'new',
                },
                purchaseDate: {
                  type: 'integer',
                  example: '2020-11-26T14:24:58.080Z',
                },
                purchaseValue: {
                  type: 'integer',
                  example: '2020-11-26T14:24:58.080Z',
                },
                costCurrencyUnitId: {
                  type: 'integer',
                  example: 4,
                },
                supplierId: {
                  type: 'integer',
                  example: 1,
                },
                supplierContractId: {
                  type: 'integer',
                  example: 1,
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
  },
  definitions: {
    Assets_UsageHistory: {
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
    Assets_Attachment: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 1 },
        name: { type: 'string', example: 'photo.png' },
        attachmentLink: { type: 'string', example: '1-aKjbXq68GnHhO6vdp_rh7JGaFV2FVW0' },
      },
    },
    Asset: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 1 },
        name: { type: 'string', example: 'Mac2015 production' },
        sku: { type: 'string', example: 'sample_SKU' },
        assignee: { type: 'object', $ref: '#/definitions/Assets_Assignee' },
        status: { type: 'string', example: 'inStorage' },
        type: { type: 'object', $ref: '#/definitions/Assets_Type' },
        subType: { type: 'object', $ref: '#/definitions/Assets_SubType' },
        specification: { type: 'object', $ref: '#/definitions/Assets_Specification' },
        purchase: { type: 'object', $ref: '#/definitions/Assets_Purchase' },
        attachments: {
          type: 'array',
          items: {
            type: 'object',
            $ref: '#/definitions/Assets_Attachment',
          },
        },
      },
    },
    Assets_Type: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 1 },
        name: { type: 'string', example: 'Hardware' },
        group: { type: 'string', example: 'type' },
        parent: { type: 'integer', example: 1 },
      },
    },
    Assets_SubType: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 2 },
        name: { type: 'string', example: 'Laptop' },
        group: { type: 'string', example: 'type' },
        parent: { type: 'integer', example: 1 },
      },
    },
    Assets_Location: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 2 },
        name: { type: 'string', example: 'Laptop' },
        group: { type: 'string', example: 'type' },
        parent: { type: 'integer', example: 1 },
      },
    },
    Assets_CostCurrencyUnit: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 2 },
        name: { type: 'string', example: 'VND' },
        group: { type: 'string', example: 'costCurrencyUnit' },
      },
    },
    Assets_Manufacturer: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 2 },
        name: { type: 'string', example: 'manufacturer company' },
        group: { type: 'string', example: 'manufacturer' },
      },
    },
    Assets_Specification: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 1 },
        model: { type: 'string', example: 'B101AW0643' },
        serialNumber: { type: 'string', example: 'RHRMH0829838484YY4' },
        manufacturer: { type: 'object', $ref: '#/definitions/Assets_Manufacturer' },
        uuid: { type: 'integer', example: 33843802 },
        warrantyPeriod: { type: 'string', example: '2020-11-26T14:24:57.410Z' },
        technicalSpecification: {
          type: 'string',
          example: 'Core I7 - Ram 16GB - 256GB',
        },
      },
    },
    Assets_Purchase: {
      type: 'object',
      properties: {
        state: { type: 'string', example: 'new' },
        time: { type: 'string', example: '2020-11-26T14:24:57.410Z' },
        cost: { type: 'integer', example: 1000000 },
        costCurrencyUnit: { type: 'object', $ref: '#/definitions/Assets_CostCurrencyUnit' },
        supplierId: { type: 'integer', example: 1 },
        supplierContractId: { type: 'integer', example: 1 },
      },
    },
    Assets_Assignee: {
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
    AssetWithoutAttachments: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 1 },
        name: { type: 'string', example: 'Mac2015 production' },
        sku: { type: 'string', example: 'sample_SKU' },
        assignee: { type: 'object', $ref: '#/definitions/Assets_Assignee' },
        status: { type: 'string', example: 'inStorage' },
        type: { type: 'object', $ref: '#/definitions/Assets_Type' },
        subType: { type: 'object', $ref: '#/definitions/Assets_SubType' },
        specification: { type: 'object', $ref: '#/definitions/Assets_Specification' },
        purchase: { type: 'object', $ref: '#/definitions/Assets_Purchase' },
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
