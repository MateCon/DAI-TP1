import { Router } from "express";
import bodyParser from "body-parser";
import { Personaje } from "../models/personaje";
import { getAll, getById } from "../services/personajeService";
import { IRecordSet } from "mssql";

const router = Router();
const jsonParser = bodyParser.json();

router.get("/", async (req, res) => {
	try {
		const personajes: IRecordSet<Personaje> = await getAll();
		res.status(200).json(personajes);
	} catch (err) {
		console.log(err);
		res.status(500).send("server error");
	}
});

router.get("/:id", async (req, res) => {
	try {
		const id = parseInt(req.params.id);

		if (isNaN(id)) {
			res.status(400).send("id is not a number");
			return;
		}

		const personaje: IRecordSet<Personaje> = await getById(id);
		res.status(200).json(personaje);
	} catch (err) {
		console.log(err);
		res.status(500).send("server error");
	}
});

export default router;
