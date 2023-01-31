import connection from '../configs/connectDB';

class UserController {
	async getUser(req, res) {
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
	}

	async updateUser(req, res) {
		console.log('req.body', req.body);
		const { firstName, lastName, email, address, id } = req.body;
		await connection
			.promise()
			.execute(
				'update users set firstName= ?, lastName= ?, email= ?, address= ? where id = ?',
				[firstName, lastName, email, address, id]
			);

		return res.redirect('/');
	}
}

export default UserController;
