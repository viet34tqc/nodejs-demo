import * as dotenv from 'dotenv';
import express from 'express';
import configViewEngine from './configs/viewEngine';
import initRouter from './routes';

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

configViewEngine(app);

initRouter(app);

app.listen(port, () => {
	console.log('The server is running');
});
