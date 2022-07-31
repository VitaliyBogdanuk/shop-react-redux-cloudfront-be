const serverlessConfiguration = {
    service: 'import-service',
    frameworkVersion: '3',
    custom: {
      webpack: {
        webpackConfig: './webpack.config.js',
        includeModules: true
      },
      documentation: {
        api: {
          info: {
            title: "The Art Vault API",
            description: "API for best shop of art"
          }
        },
        models: [
          {
            name: 'Product',
            description: 'Product model in search page',
            contentType: 'application/json',
            schema: {
              type: 'object',
              properties: {
                id: {
                  type: 'string'
                },
                title: {
                  type: 'string'
                },
                description: {
                  type: 'string'
                },
                price: {
                  type: 'number'
                },
                image: {
                  type: 'string'
                }
              }
            }
          },
          {
            name: 'SearchResponse',
            description: 'Search result model in search page',
            contentType: 'application/json',
            schema: {
              type: 'array',
              items: {
                $ref: '{{model: Product}}'
              }
            }
          },
          {
            name: 'ProductNotFoundResponse',
            description: 'Product is not found',
            contentType: 'application/json',
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string'
                }
              }
            }
          }
        ]
      }
    },
    // Add the serverless-webpack plugin
    plugins: [
      'serverless-webpack',
      'serverless-aws-documentation'
    ],
    provider: {
      name: 'aws',
      runtime: 'nodejs14.x',
      profile: 'EPAMCourseUser',
      region: 'eu-west-1',
      stage: 'dev',
      apiGateway: {
        minimumCompressionSize: 1024,
      },
      environment: {
        AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
        PG_HOST: '',
        PG_PORT: -1,
        PG_DATABASE: '',
        PG_USERNAME: '',
        PG_PASSWORD: ''
      },
      iamRoleStatements: [
        {
            Effect: 'Allow',
            Action: 's3:*',
            Resource: 'arn:aws:s3:::import-service-dev-the-art-vault-uploaded'
        }
      ]
    },
    functions: {
        importProductsFile: {
            handler: 'handler.importProductsFile',
            events: [
                {
                    http: {
                        method: 'get',
                        path: 'import',
                        cors: true,
                        request: {
                            parameters: {
                                querystrings: {
                                name: true
                                }
                            }
                        }
                    }
                }
            ]
        },
        importFileParser: {
            handler: 'handler.importFileParser',
            events: [
                {
                    s3: {
                        bucket: 'import-service-dev-the-art-vault-uploaded',
                        event: 's3:ObjectCreated:*',
                        rules: [
                            {
                                prefix: 'uploaded/',
                                suffix: '.csv'
                            }
                        ],
                        existing: true
                    }
                }
            ]
        }
    }
}
module.exports = serverlessConfiguration;