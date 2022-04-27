import { Router } from "express";
import bodyParser from "body-parser";
import { Personaje } from "../models/personaje";
import { create, deleteById, getAll, getById, update } from "../services/personajeService";
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

router.post("/", async (req, res) => {
	try {
		const personaje: Personaje = req.body;

		// Hay que checkear rowsAffeced?
		await create(personaje);

		res.status(200).send("personaje creado");
	} catch (err) {
		console.log(err);
		res.status(500).send("server error");
	}
});

router.put("/", async (req, res) => {
	try {
		const personaje: Personaje = req.body;

		// Hay que checkear rowsAffeced? x2
		await update(personaje);

		res.status(200).send("personaje actualizado");
	} catch (err) {
		console.log(err);
		res.status(500).send("server error");
	}
});


router.delete("/:id", async (req, res) => {
	try {
		const id = parseInt(req.params.id);

		if (isNaN(id)) {
			res.status(400).send("id is not a number");
			return;
		}

		// Hay que checkear rowsAffeced? x3 :o
		await deleteById(id);

		res.status(200).send("personaje eliminado");
	} catch (err) {
		console.log(err);
		res.status(500).send("server error");
	}
});

export default router;
