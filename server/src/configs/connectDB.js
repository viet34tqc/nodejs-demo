import mysql from 'mysql2';

// create the connection to database
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	database: 'demo_node',
});

export default connection
