import express from 'express';
import { HomeController, UserController } from '../controller';

let router = express.Router();

const initRouter = app => {
	router.get('/', new HomeController().getHomePage);
	router.get('/detail/user/:id', new UserController().getUser);

	// The '/' path is like the prefix. If you change '/' to '/abc' then the root route will be localhost/abc
	// When we build api, we can use this prefix like '/api/v1/'
	return app.use('/', router);
};

export default initRouter;
