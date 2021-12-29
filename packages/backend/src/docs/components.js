export default {
  components: {
    schemas: {
      Customers: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
          },
          company: {
            type: 'string',
          },
          last_name: {
            type: 'string',
          },
          first_name: {
            type: 'string',
          },
          email_address: {
            type: 'string',
            format: 'email',
          },
          job_title: {
            type: 'string',
          },
          business_phone: {
            type: 'string',
          },
          home_phone: {
            type: 'string',
          },
          mobile_phone: {
            type: 'string',
            maxLength: 11,
            minLength: 10,
          },
          fax_number: {
            type: 'string',
          },
          address: {
            type: 'string',
          },
          city: {
            type: 'string',
          },
          state_province: {
            type: 'string',
          },
          zip_postal_code: {
            type: 'string',
            maxLength: 5,
            minLength: 5,
          },
          country_region: {
            type: 'string',
          },
          web_page: {
            type: 'string',
          },
          notes: {
            type: 'string',
            description: 'notes',
          },
          attachments: {
            type: 'string',
            format: 'binary',
          },
        },
        example: {
          id: 12,
          company: 'Dependent Domains',
          first_name: 'Le',
          last_name: 'Ket',
          email_address: 'abc@gmail.com',
          job_title: 'student',
          business_phone: '+84328560055',
          home_phone: '+8490457324',
          mobile_phone: '+8447294829',
          fax_number: '212-693-2377',
          address: '75 Broad St Suite 1601, New York, NY 10004',
          city: 'New York',
          state_province: 'New York',
          zip_postal_code: '10025',
          country_region: 'East US',
          web_page: 'http://www.abc.com',
          notes: 'This is sample information default',
          attachments: 'This is attachments information such as image files, documentation',
        },
      },
      identificationNumber: {
          type: 'integer',
          description: 'User identification number',
          example: 1234,
      },
      username: {
          type: 'string',
          example: 'raparicio',
      },
      companyId: {
          type: 'integer',
          description: 'Company id where the user works',
          example: 15,
      },
      User: {
          type: 'object',
          properties: {
          identificationNumber: {
              $ref: '#/components/schemas/identificationNumber',
          },
          username: {
              $ref: '#/components/schemas/username',
          },
          userType: {
              $ref: '#/components/schemas/userType',
          },
          companyId: {
              $ref: '#/components/schemas/companyId',
          },
          },
      },
      Users: {
          type: 'object',
          properties: {
          users: {
              type: 'array',
              items: {
              $ref: '#/components/schemas/User',
              },
          },
          },
      },
      Error: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
          },
          code: {
            type: 'number',
          },
        },
      },
    },
    responses: {
      Unauthorized: {
        description: 'Unauthorized',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
            },
            example: {
              code: 401,
              message: 'Please authenticate',
            },
          },
        },
      },
      Fobbident: {
        description: 'Fobbident',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
            },
            example: {
              code: 403,
              message: 'Fobbident',
            },
          },
        },
      },
      NotFound: {
        description: 'Not found',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
            },
            example: {
              code: 404,
              message: 'Not found',
            },
          },
        },
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};
