import { Product } from '../models';
import {getDBClient} from './getDBClient';

export const getProductByIdDAL = async (id: string): Promise<Product> => {
    const client = getDBClient();
    try {
        await client.connect();
        const { rows: products } = await client.query(`
            select p.id, p.price, p.description , p.image , p.title, s.count
            from products p
            left join stocks s on p.id = s.product_id
            where p.id = '${id}'
        `);
        return products[0] as Product;
    } catch (error) {
        throw error;
    } finally {
        client.end();
    }
}; 