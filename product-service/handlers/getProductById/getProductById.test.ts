import { APIGatewayEvent } from 'aws-lambda';
import {getProductById} from './getProductById';

describe('getProductById', () => {
    describe('product not found', () => {
        let output;

        beforeEach(async () => {
            output = await getProductById(({pathParameters: {productId: '123'}} as unknown) as APIGatewayEvent, null, null);
        });

        test('status code should be 404', () => {
            expect(output.statusCode).toEqual(404);
        });

        test('body should be object with message', () => {
            expect(JSON.parse(output.body)).toEqual({message: 'Product is not found!'});
        });
    });

    describe('product is found', () => {
        let output;

        beforeEach(async () => {
            output = await getProductById(({pathParameters: {productId: '7567ec4b-b10c-48c5-9345-fc73c48a80aa'}} as unknown) as APIGatewayEvent, null, null);
        });

        test('status code should be 200', () => {
            expect(output.statusCode).toEqual(200);
        });

        test('body should be object with message', () => {
            expect(JSON.parse(output.body)).toEqual(
                {
                    "count": 4,
                    "description": "Leonardo da Vinci, circa 1500",
                    "id": "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
                    "price": 469.7,
                    "title": "Salvator Mundi",
                    "image": "https://upload.wikimedia.org/wikipedia/commons/5/5c/Leonardo_da_Vinci%2C_Salvator_Mundi%2C_c.1500%2C_oil_on_walnut%2C_45.4_%C3%97_65.6_cm.jpg"
                }
            );
        });
    });
}); 