import initDB from '../configs/connectDB';

class HomeController {
	async getHomePage(req, res) {
		try {
			const connection = initDB();
			const [rows] = await connection
				.promise()
				.execute('SELECT * FROM `users`');
			res.render('index.ejs', { userData: rows });
		} catch (error) {
			res.render('index.ejs', { userData: [] });
		}
	}
}

export default HomeController;
