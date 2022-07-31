import { APIGatewayProxyHandler } from "aws-lambda";
import {S3} from 'aws-sdk';

export const importProductsFile: APIGatewayProxyHandler = async event => {
    const s3 = new S3({region: 'eu-west-1', signatureVersion: 'v4'});
    const fileName = event.queryStringParameters.name;

    const signedUrl = await s3.getSignedUrlPromise('putObject', {
        Bucket: 'the-art-vault-uploaded',
        Key: `uploaded/${fileName}`,
        // todo: add contentType from queryStringParameter
        ContentType: 'application/vnd.ms-excel'
    });

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Headers" : "*",
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Methods': 'GET, PUT'
        },
        body: signedUrl
    }
}