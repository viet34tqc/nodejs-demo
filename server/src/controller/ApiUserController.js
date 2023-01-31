import connection from '../configs/connectDB';

class ApiUserController {
	async getAllUser(req, res) {
		const [rows] = await connection.promise().execute('SELECT * FROM `users`');
		res.status(200).json({
			message: 'Get users successfully',
			data: rows,
		});
	}

	async getUser(req, res) {
		const { id } = req.params;
		const [rows] = await connection
			.promise()
			.execute(`SELECT * FROM \`users\` where id=?`, [id]);

		res.status(200).json({
			message: 'Get user successfully',
			data: rows[0],
		});
	}

	async updateUser(req, res) {
		let { firstName, lastName, email, address, id } = req.body;
		if (!firstName || !lastName || !email || !address || !id) {
			return res.status(200).json({
				message: 'missing required params',
			});
		}

		await connection
			.promise()
			.execute(
				'update users set firstName= ?, lastName= ?, email= ?, address= ? where id = ?',
				[firstName, lastName, email, address, id]
			);

		return res.status(200).json({
			message: 'ok',
		});
	}

	async deleteUser(req, res) {
		const { id } = req.body;
		await connection.promise().execute('delete from users where id = ?', [id]);
		return res.status(200).json({
			message: 'Delete user successfully',
		});
	}
}

export default ApiUserController;
