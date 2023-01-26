import config from '..';
import pg from 'pg-promise';
import promise from 'bluebird';


const pgp = pg({promiseLib: promise, noWarnings: true});
const db = pgp(config.DB_URL);

export default db;