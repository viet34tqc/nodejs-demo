import connection from '../configs/connectDB';

class HomeController {
	async getHomePage(req, res) {
		const [rows] = await connection
			.promise()
			.execute('SELECT * FROM `users`');
		res.render('index.ejs', { userData: rows });
	}
}

export default HomeController;
