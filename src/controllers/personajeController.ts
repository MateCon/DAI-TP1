import { Router } from "express";
import bodyParser from "body-parser";
import { Personaje } from "../models/personaje";
import { create, deleteById, getAll, getById, update } from "../services/personajeService";

const router = Router();
const jsonParser = bodyParser.json();

router.get("/", async (req, res) => {
	try {
		console.log(req);
		const personajes: Personaje[] = await getAll(req.app?.locals.db);
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

		const personaje: Personaje = await getById(req.app?.locals.db, id);
		res.status(200).json(personaje);
	} catch (err) {
		console.log(err);
		res.status(500).send("server error");
	}
});

router.post("/", jsonParser, async (req, res) => {
	try {
		const personaje: Personaje = req.body;

		await create(req.app?.locals.db, personaje);

		res.status(200).send("personaje creado");
	} catch (err) {
		console.log(err);
		res.status(500).send("server error");
	}
});

router.put("/", jsonParser, async (req, res) => {
	try {
		const personaje: Personaje = req.body;

		console.log(personaje);

		const rowsAffected = await update(req.app?.locals.db, personaje);

		if (!rowsAffected) {
			res.status(404).send("personaje no encontrado");
			return;
		}

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

		const rowsAffected = await deleteById(req.app?.locals.db, id);

		if (!rowsAffected) {
			res.status(404).send("personaje no encontrado");
			return;
		}

		res.status(200).send("personaje eliminado");
	} catch (err) {
		console.log(err);
		res.status(500).send("server error");
	}
});

export default router;
