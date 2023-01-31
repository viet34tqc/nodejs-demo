import express from 'express';
import ApiUserController from '../controller/ApiUserController';
let router = express.Router();

const initApiRouter = app => {
	const userInstance = new ApiUserController();

	router.get('/users', userInstance.getAllUser);
	router.get('/users/:id', userInstance.getUser);
	router.put('/user/update', userInstance.updateUser);
	router.delete('/user/delete', userInstance.deleteUser);

	return app.use('/api/v1', router);
};

export default initApiRouter;
