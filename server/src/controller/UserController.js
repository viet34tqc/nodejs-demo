import connection from '../configs/connectDB';

class UserController {
	async getUser(req, res) {
		const { id } = req.params;
		const [rows] = await connection
			.promise()
			.execute(`SELECT * FROM \`users\` where id=${id}`);
		// Or .execute(`SELECT * FROM \`users\` where id=?`, [id]);
		res.render('user.ejs', { userData: rows[0] });
	}
}

export default UserController;
