import { Router } from "express";
import bodyParser from "body-parser";
import { Character } from "../models/character";
import { create, deleteById, getAll, getById, update } from "../services/characterService";
import Filter from "../models/filter";
import { Authenticate } from "../utils/jwt.strategy";
 
const router = Router();
const jsonParser = bodyParser.json();
 
router.get("/", Authenticate, async (req, res) => {
    try {
        const query = {
            nombres: req.query.nombres as string,
            edades: req.query.edades as string,
            pesos: req.query.pesos as string
        };
 
        const filter: Filter = {
            nombres: query.nombres && query.nombres.split(",") || [],
            edades: query.edades && query.edades.split(",") || [],
            pesos: query.pesos && query.pesos.split(",") || [],
        };
        console.log(query, filter)
 
        const personajes: Character[] = await getAll(req.app?.locals.db, filter);
        res.status(200).json(personajes);
    } catch (err) {
        console.log(err);
        res.status(500).send("server error");
    }
});
 
router.get("/:id", Authenticate, async (req, res) => {
    try {
        const id = parseInt(req.params.id);
 
        if (isNaN(id)) {
            res.status(400).send("id is not a number");
            return;
        }
 
        const personaje: Character = await getById(req.app?.locals.db, id);
        res.status(200).json(personaje);
    } catch (err) {
        console.log(err);
        res.status(500).send("server error");
    }
});
 
router.post("/", Authenticate, jsonParser, async (req, res) => {
    try {
        const personaje: Character = req.body;
 
        await create(req.app?.locals.db, personaje);
 
        res.status(200).send("personaje creado");
    } catch (err) {
        console.log(err);
        res.status(500).send("server error");
    }
});
 
router.put("/", Authenticate, jsonParser, async (req, res) => {
    try {
        const personaje: Character = req.body;
 
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
 
 
router.delete("/:id", Authenticate, async (req, res) => {
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
