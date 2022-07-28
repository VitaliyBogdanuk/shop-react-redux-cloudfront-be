import {Client} from 'pg';
import {dbOptions} from './dbOptions';

export const getDBClient = () => {
    return new Client(dbOptions);
};