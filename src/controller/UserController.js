import initDB from '../configs/connectDB';

class UserController {
	async getUser(req, res) {
		try {
			const connection = initDB();
			const { id } = req.params;
			const [rows] = await connection
				.promise()
				.execute(`SELECT * FROM \`users\` where id=?`, [id]);
			res.render(
				req.path.includes('edit/user') ? 'edit-user.ejs' : 'detail-user.ejs',
				{
					userData: rows[0],
				}
			);
		} catch (error) {
			res.render('index.ejs', { userData: {} });
		}
	}

	async updateUser(req, res) {
		try {
			const connection = initDB();
			const { firstName, lastName, email, address, id } = req.body;
			await connection
				.promise()
				.execute(
					'update users set firstName= ?, lastName= ?, email= ?, address= ? where id = ?',
					[firstName, lastName, email, address, id]
				);

			return res.redirect('/');
		} catch (error) {
			return res.redirect('/');
		}
	}

	async createUser(req, res) {
		try {
			const connection = initDB();
			const { firstName, lastName, email, address, id } = req.body;
			await connection
				.promise()
				.execute(
					'insert into users (firstName, lastName, email, address) values (?, ?, ?, ?)',
					[firstName, lastName, email, address]
				);

			return res.redirect('/');
		} catch (error) {
			return res.redirect('/');
		}
	}

	async deleteUser(req, res) {
		try {
			const connection = initDB();
			const { userId } = req.body;
			await connection
				.promise()
				.execute('delete from users where id = ?', [userId]);

			return res.redirect('/');
		} catch (error) {
			return res.redirect('/');
		}
	}
}

export default UserController;
