import initDB from '../configs/connectDB';
import { CONNECT_DB_FAIL } from '../constants';

class ApiUserController {
	async getAllUser(req, res) {
		try {
			const connection = initDB();
			const [rows] = await connection
				.promise()
				.execute('SELECT * FROM `users`');
			res.status(200).json({
				message: 'Get users successfully',
				data: rows,
			});
		} catch (error) {
			res.status(500).json({
				message: CONNECT_DB_FAIL,
			});
		}
	}

	async getUser(req, res) {
		try {
			const connection = initDB();
			const { id } = req.params;
			const [rows] = await connection
				.promise()
				.execute(`SELECT * FROM \`users\` where id=?`, [id]);

			res.status(200).json({
				message: 'Get user successfully',
				data: rows[0],
			});
		} catch (error) {
			res.status(500).json({
				message: CONNECT_DB_FAIL,
			});
		}
	}

	async updateUser(req, res) {
		try {
			const connection = initDB();
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
		} catch (error) {
			res.status(500).json({
				message: CONNECT_DB_FAIL,
			});
		}
	}

	async deleteUser(req, res) {
		try {
			const connection = initDB();
			const { id } = req.body;
			await connection
				.promise()
				.execute('delete from users where id = ?', [id]);
			return res.status(200).json({
				message: 'Delete user successfully',
			});
		} catch (error) {
			res.status(500).json({
				message: CONNECT_DB_FAIL,
			});
		}
	}
}

export default ApiUserController;
