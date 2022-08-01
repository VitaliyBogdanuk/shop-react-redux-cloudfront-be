import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
    service: 'import-service',
    frameworkVersion: '3',
    custom: {
        webpack: {
            webpackConfig: './webpack.config.js',
            includeModules: true
        }
    },
    // Add the serverless-webpack plugin
    plugins: ['serverless-webpack'],
    provider: {
        name: 'aws',
        runtime: 'nodejs14.x',
        region: 'eu-west-1',
        profile: 'EPAMCourseUser',
        stage: 'dev',
        apiGateway: {
            minimumCompressionSize: 1024,
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
        },
        iamRoleStatements: [
            {
                Effect: 'Allow',
                Action: 's3:ListBucket',
                Resource: 'arn:aws:s3:::import-service-dev-the-art-vault-uploaded'
            },
            {
                Effect: 'Allow',
                Action: 's3:*',
                Resource: 'arn:aws:s3:::import-service-dev-the-art-vault-uploaded/*'
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
                                prefix: 'uploaded/'
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
