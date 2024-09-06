import mysql from 'mysql'
import 'dotenv/config'

const {
    DB_HOSTNAME,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
    DB_PORT
} = process.env;

let connection = mysql.createConnection({
    host: DB_HOSTNAME,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT || 3306
});

connection.connect((err) => {
    if (err) {
        console.error(`DB Connection error: ${err}`);
        return;
    }
    console.log(`Connection successfully with DB --> ${DB_NAME}`);
});

export default connection;
