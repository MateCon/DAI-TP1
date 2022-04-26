import { Router } from "express";
import bodyParser from "body-parser";
import { Personaje } from "../models/personaje";
import { getAll } from "../services/personajeService";

const router = Router();
const jsonParser = bodyParser.json();

router.get("/", async (req, res) => {
	const data = await getAll();

	res.json(data);
});

export default router;
