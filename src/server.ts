import express, { Application } from "express";
import { ConnectionPool } from "mssql";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./utils/router";
import config from "./utils/database";
import swaggerUi from "swagger-ui-express";
import CharacterController from "./controllers/characterController";
import FilmController from "./controllers/filmController";
import AuthController from "./controllers/authController";
const swaggerFile = require('../swagger_output.json');

(async () => {
	try {
		const app: Application = express();
		const port = 8080 || process.env.PORT;

		const appPool = new ConnectionPool(config);
		app.locals.db = await appPool.connect();

		app.use(cors());
		app.use(express.json());
		app.use(bodyParser.json());

		app.use("character", CharacterController);
		app.use("film", FilmController);
		app.use("auth", AuthController);
		
		app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

		app.get("*", (_, res) => {
			res.status(404).send("404 error - page not found");
		});

		app.listen(port, () => {
			console.log(`Server running on http://localhost:${port}`);
		});
	} catch (err) {
		console.log(err);
	}
})();
