import { APIGatewayProxyHandler } from "aws-lambda";

import { productValidator } from "../../validators";
import { corsHeaders } from "../constants";
import * as api from '../../api';

export const addNewProduct: APIGatewayProxyHandler = async (event) => {
    console.log('ADD_NEW_PRODUCT');
    console.log(JSON.stringify(event));
    const body = JSON.parse(event.body);

    try {
        const value = await productValidator.validateAsync(body);

        try { 
            await api.addNewProduct(value);
            return {
                statusCode: 200,
                headers: {...corsHeaders},
                body: `New product ${value.title} is added!`
            }
        } catch (exception) {
            return {
                statusCode: 500, 
                headers: {...corsHeaders},
                body: JSON.stringify(exception)
            };
        }
    } catch (error) {
        return {
            statusCode: 400,
            headers: {...corsHeaders},
            body: JSON.stringify({
                message: 'Product body is invalid',
                error
            })
        };
    }
};