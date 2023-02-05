import express from 'express';
import { HomeController, UserController } from '../controller';
import UploadController from '../controller/UploadController';
import UploadMiddleware from '../middlewares/UploadMiddleware';

let router = express.Router();

const initRouter = app => {
	const userController = new UserController();
	router.get('/', new HomeController().getHomePage);
	router.get('/detail/user/:id', userController.getUser);
	router.get('/edit/user/:id', userController.getUser);
	router.post('/update/user', userController.updateUser);
	router.post('/create/user', userController.createUser);
	router.post('/delete/user', userController.deleteUser);

	const uploadController = new UploadController();
	const uploadMiddleware = new UploadMiddleware();
	router.get('/upload', uploadController.getUploadPage);
	// Handle upload
	router.post(
		'/upload/single',
		uploadMiddleware.singleUpload,
		uploadController.singleUpload
	);
	router.post(
		'/upload/multiple',
		uploadMiddleware.multipleUpload,
		uploadController.multipleUpload
	);

	// The '/' path is like the prefix. If you change '/' to '/abc' then the root route will be localhost/abc
	// When we build api, we can use this prefix like '/api/v1/'
	return app.use('/', router);
};

export default initRouter;
