import { APIGatewayProxyHandler } from "aws-lambda";
import sourceMapSupport from 'source-map-support'
sourceMapSupport.install();
import * as api from '../../api';

export const getProductsList: APIGatewayProxyHandler = async () => {
    const products = await api.getProductList();
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(products)
    };
};