import {getDBClient} from './getDBClient';

export const getProductsListDAL = async () => {
    const client = getDBClient();
    try {
        await client.connect();
        const { rows: products } = await client.query(`
            select p.id, p.price, p.description , p.image , p.title, s.count
            from products p
            left join stocks s on p.id = s.product_id 
        `);
        return products;
    } catch (error) {
        throw error;
    } finally {
        client.end();
    }
};