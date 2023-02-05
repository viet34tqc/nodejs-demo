import mysql from 'mysql2';

// create the connection to database

function initDB() {
	try {
		return mysql.createConnection({
			host: 'localhost',
			user: 'root',
			database: 'demo_node',
		});
	} catch (error) {
		throw error;
	}
}

export default initDB;
