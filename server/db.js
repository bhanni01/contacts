
import pg from 'pg';
const { Pool } = pg;
const contacts= new Pool({
    user: "postgres",
    password: "nischal",
    host:"localhost",
    port: 5432,
    database: "contactlist"
});
export default contacts