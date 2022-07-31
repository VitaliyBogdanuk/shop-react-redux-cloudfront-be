import { APIGatewayProxyHandler } from "aws-lambda";
import sourceMapSupport from 'source-map-support'
sourceMapSupport.install();
import * as api from '../../api';
import {corsHeaders} from '../constants';


export const getProductsList: APIGatewayProxyHandler = async (event) => {
    console.log('GET_PRODUCTS_LIST');
    console.log(JSON.stringify(event));
    try {
        const products = await api.getProductList();
        return {
            statusCode: 200,
            headers: {...corsHeaders},
            body: JSON.stringify(products)
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: {...corsHeaders},
            body: JSON.stringify(error)
        };
    }
};