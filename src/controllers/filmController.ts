import { Router } from "express";
import bodyParser from "body-parser";
import Film from "../models/Film";
import { create, deleteById, getAll, getAllWithFilter, getById, getCharactersInFilm, update } from "../services/filmService";
import Filter from "../models/filmFilter";
import { Authenticate } from "../utils/jwt.strategy";
import Character from "../models/character";
 
const router = Router();
const jsonParser = bodyParser.json();
 
router.get("/", Authenticate, async (req, res) => {
    try {
        let order: "ASC" | "DESC" = (req.query?.order as string) === "DESC" ? "DESC" : "ASC";
        
        const filter: Filter = {
            titulo: req.query?.titulo as string,
            order: order
        };
        
        if (filter.titulo) {
            const peliculas: Film[] = await getAllWithFilter(req.app?.locals.db, filter);
            res.status(200).json(peliculas);
            return;
        }

        const peliculas: Film[] = await getAll(req.app?.locals.db);
        res.status(200).json(peliculas);
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
        
        const film: Film = await getById(req.app?.locals.db, id);
        const charactersInFilm: Character[] = await getCharactersInFilm(req.app?.locals.db, id);
        res.status(200).json({ film, characters: charactersInFilm });
    } catch (err) {
        console.log(err);
        res.status(500).send("server error");
    }
});
 
router.post("/", Authenticate, jsonParser, async (req, res) => {
    try {
        const film: Film = req.body;
 
        await create(req.app?.locals.db, film);
 
        res.status(200).send("pelicula creada");
    } catch (err) {
        console.log(err);
        res.status(500).send("server error");
    }
});
 
router.put("/", Authenticate, jsonParser, async (req, res) => {
    try {
        const pelicula: Film = req.body;
 
        const rowsAffected = await update(req.app?.locals.db, pelicula);
 
        if (!rowsAffected) {
            res.status(404).send("pelicula no encontrada");
            return;
        }
 
        res.status(200).send("pelicula actualizada");
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
            res.status(404).send("pelicula no encontrada");
            return;
        }
 
        res.status(200).send("pelicula eliminada");
    } catch (err) {
        console.log(err);
        res.status(500).send("server error");
    }
});
 
export default router;
