export default {
  paths: {
    '/api/genericOption/list': {
      get: {
        description: 'Get generic option list',
        tags: ['modules'],
        operationId: 'genericOption',
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            schema: {
              type: 'object',
              properties: {
                group: {
                  type: 'string',
                  example: 'location',
                },
                parentId: {
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
                    genericOptions: {
                      type: 'array',
                      items: {
                        type: 'object',
                        $ref: '#/definitions/GenericOption',
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
    '/api/uploadFiles': {
      post: {
        description: 'Upload files',
        tags: ['modules'],
        operationId: 'uploadFiles',
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            schema: {
              type: 'object',
              properties: {
                file: {
                  type: 'array',
                  items: {
                    type: 'integer',
                    example: 'file',
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
                    attachmentIds: {
                      type: 'array',
                      items: {
                        type: 'object',
                        $ref: '#/definitions/Attachment',
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
    GenericOption: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 1 },
        name: { type: 'string', example: 'DN' },
        group: { type: 'string', example: 'location' },
        parent: { type: 'integer', example: null },
      },
    },
    Attachment: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 1 },
        entityId: { type: 'integer', example: null },
        name: { type: 'string', example: 'profile.png' },
        attachmentLink: { type: 'string', example: '1LBQv4AdaMYeC_rZfTOM95KURWMReW1he' },
      },
    },
  },
  tags: [
    {
      name: 'Modules',
      description: 'module apis',
    },
  ],
};
