export default {
  paths: {
    '/api/generalSettings': {
      get: {
        description: 'Get generalSettings',
        tags: ['GeneralSettings'],
        operationId: 'getGeneralSettings',
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
      put: {
        description: 'Update generalSettings',
        tags: ['GeneralSettings'],
        operationId: 'updateGeneralSettings',
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            schema: {
              type: 'object',
              properties: {
                assignees: { type: 'array', example: [] },
                types: { type: 'array', example: [] },
                subTypes: { type: 'array', example: [] },
                routineDates: { type: 'array', example: [] },
                statuses: { type: 'array', example: [] },
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
                    count: {
                      type: 'integer',
                      example: 10,
                    },
                    generalSettings: {
                      type: 'object',
                      $ref: '#/definitions/GeneralSetting_GeneralSetting',
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
    GeneralSetting_GeneralSetting: {
      type: 'object',
      properties: {
        assignee: { type: 'array', example: [] },
        types: { type: 'array', example: [] },
        subTypes: { type: 'array', example: [] },
        routineDates: { type: 'array', example: [] },
      },
    },
  },
  tags: [
    {
      name: 'GeneralSettings',
      description: 'General Settings apis',
    },
  ],
};
