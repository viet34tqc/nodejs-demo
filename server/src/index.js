import * as dotenv from 'dotenv';
import express from 'express';
import configViewEngine from './configs/viewEngine';
import initRouter from './routes';
import initApiRouter from './routes/api';

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup view engine
configViewEngine(app);

// init router
initRouter(app);

// init API router
initApiRouter(app);

app.listen(port, () => {
	console.log('The server is running');
});
