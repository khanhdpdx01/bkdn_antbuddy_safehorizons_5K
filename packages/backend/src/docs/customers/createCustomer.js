export default {
  post: {
    tags: ['Customers'],
    description: 'Only admins can create other customers',
    summary: 'Create a Customer',
    security: {
      bearerAuth: [],
    },
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              company: {
                type: 'string',
                description: 'company name the users work',
                required: true,
              },
              last_name: {
                type: 'string',
                description: 'last name',
                required: true,
              },
              first_name: {
                type: 'string',
                description: 'first name',
                required: true,
              },
              email_address: {
                type: 'string',
                format: 'email',
                description: 'email address must be unique',
                required: true,
              },
              job_title: {
                type: 'string',
                description: 'job title',
                required: true,
              },
              business_phone: {
                type: 'string',
                description: 'business phone',
              },
              home_phone: {
                type: 'string',
                description: 'home phone',
              },
              mobile_phone: {
                type: 'string',
                description: 'mobile phone should be from 10 to 11 characters',
                required: true,
                maxLength: 11,
                minLength: 10,
              },
              fax_number: {
                type: 'string',
                description: 'fax number',
              },
              address: {
                type: 'string',
                description: 'home address',
              },
              city: {
                type: 'string',
                description: 'city name',
                required: true,
              },
              state_province: {
                type: 'string',
                description: 'state/province',
                required: true,
              },
              zip_postal_code: {
                type: 'string',
                description: 'zip postal code must be 5 digits',
                required: true,
                maxLength: 6,
                minLength: 6,
              },
              country_region: {
                type: 'string',
                description: 'country region',
                required: true,
              },
              web_page: {
                type: 'string',
                description: 'web page',
              },
              notes: {
                type: 'string',
                description: 'notes',
              },
              attachments: {
                type: 'string',
                format: 'binary',
                description: 'This is attachments information such as image files',
              },
            },
            example: {
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
        },
      },
    },
    responses: {
      201: {
        description: 'Created',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Customers',
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
