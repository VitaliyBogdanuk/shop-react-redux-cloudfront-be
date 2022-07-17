import {getProductsList} from './getProductsList';

describe('getProductsList', () => {
    let output;

    beforeEach(async () => {
        output = await getProductsList(null, null, null);
    });

    test('status code is 200', () => {
        expect(output.statusCode).toEqual(200);
    });

    test('headers are not supported CORS', () => {
        expect(output.headers).toEqual({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        });
    });

    describe('output body', () => {
        test('should be array', () => {
            let body = JSON.parse(output.body);
            expect(Array.isArray(body)).toBeTruthy();
        });

        describe('should contain next properties', () => {
            test('count', () => {
                let body = JSON.parse(output.body);
                expect(body[0].hasOwnProperty('count')).toBeTruthy();
                expect(typeof body[0].count).toEqual('number');
            });
            test('description', () => {
                let body = JSON.parse(output.body);
                expect(body[0].hasOwnProperty('description')).toBeTruthy();
                expect(typeof body[0].description).toEqual('string');
            });
            test('id', () => {
                let body = JSON.parse(output.body);
                expect(body[0].hasOwnProperty('id')).toBeTruthy();
                expect(typeof body[0].id).toEqual('string');
            });
            test('price', () => {
                let body = JSON.parse(output.body);
                expect(body[0].hasOwnProperty('price')).toBeTruthy();
                expect(typeof body[0].price).toEqual('number');
            });
            test('title', () => {
                let body = JSON.parse(output.body);
                expect(body[0].hasOwnProperty('title')).toBeTruthy();
                expect(typeof body[0].title).toEqual('string');
            });
            test('image', () => {
                let body = JSON.parse(output.body);
                expect(body[0].hasOwnProperty('image')).toBeTruthy();
                expect(typeof body[0].image).toEqual('string');
            });
        });
    });
}); 