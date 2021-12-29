export default {
  get: {
    tags: ['Customers'],
    description: 'Only admins can retrieve all users.',
    summary: 'Get all customers',
    security: {
      bearerAuth: [],
    },
    parameters: [
      {
        in: 'query',
        name: 'sortBy',
        schema: {
          type: 'string',
          description: 'sort by query in the form of field:desc/asc (ex created_at:asc)',
        },
        default: 'created_at:asc',
      }, {
        in: 'query',
        name: 'limit',
        schema: {
          type: 'integer',
          minimum: 1,
        },
        default: 10,
        description: 'Maximum number of customers',
      }, {
        in: 'query',
        name: 'page',
        schema: {
          type: 'integer',
          minimum: 1,
          default: 1,
        },
        description: 'Page number',
      },
    ],
    responses: {
      200: {
        description: 'OK',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                customers: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Customers',
                  },
                },
                page: {
                  type: 'integer',
                  example: 1,
                },
                limit: {
                  type: 'integer',
                  example: 10,
                },
                totalPages: {
                  type: 'integer',
                  example: 1,
                },
                totalCustomers: {
                  type: 'integer',
                  example: 1,
                },
              },
            },
          },
        },
      },
      400: {
        description: 'Missing parameters',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
            },
            example: {
              message: 'company is missing',
              statusCode: 400,
            },
          },
        },
      },
      401: {
        description: 'Unauthorized',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/responses/Unauthorized',
            },
          },
        },
      },
      403: {
        description: 'Fobbident',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/responses/Fobbident',
            },
          },
        },
      },
    },
  },
};
