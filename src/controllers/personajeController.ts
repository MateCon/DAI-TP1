import { Router } from "express";
import bodyParser from "body-parser";
import { Personaje } from "../models/personaje";

const router = Router();
const jsonParser = bodyParser.json();

export default router;
