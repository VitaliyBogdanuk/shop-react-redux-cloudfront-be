import { Product } from '../models';
import { getDBClient } from './getDBClient';

export const addNewProductDAL = async (body: Product) => {
    try {
        const client = getDBClient();
        client.connect();

        try {
            await client.query('BEGIN')
            const queryText = 'INSERT INTO products (title, description, price) VALUES($1, $2, $3) RETURNING id';
            const res = await client.query(queryText, [body.title, body.description, body.price]);
            const insertStockQuery = 'INSERT INTO stocks (count, product_id) VALUES ($1, $2)';
            const insertStockValues = [body.count, res.rows[0].id];
            await client.query(insertStockQuery, insertStockValues);
            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.end();
        }
    } catch (exception) {
        throw exception;
    }
}; 