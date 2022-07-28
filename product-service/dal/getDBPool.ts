import {Pool} from 'pg';
import {dbOptions} from './dbOptions';

export const getDBPool = () => {
    return new Pool(dbOptions);
};