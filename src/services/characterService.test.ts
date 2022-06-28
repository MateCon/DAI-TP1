import { ConnectionPool } from "mssql";
import * as characterService from "./characterService";
import config from "../utils/database";

describe('character service', () => {
    it('gets all', async () => {
        const appPool = await new ConnectionPool(config).connect();
        const response = await characterService.getAll(appPool);
        expect(response).toBeTruthy();
    });

    it('creates', async () => {
        const appPool = await new ConnectionPool(config).connect();
        const response = await characterService.create(appPool, {
            nombre: "Mate",
            edad: 17
        });
        expect(response).toBe(1);
    });

    it('gets by id', async () => {
        const appPool = await new ConnectionPool(config).connect();
        const [{ id }] = await characterService.getAll(appPool);
        const response = await characterService.getById(appPool, id!);
        expect(response).toBeTruthy();
        expect(response.edad).toBeDefined();
    });

    it('gets by filter', async () => {
        const appPool = await new ConnectionPool(config).connect();
        const response = await characterService.getAllWithFilter(appPool, {
            nombres: ["Mate"],
            edades: [],
            pesos: []
        });
        expect(response).toBeTruthy();
    });

    it('updates', async () => {
        const appPool = await new ConnectionPool(config).connect();
        const [{ id }] = await characterService.getAll(appPool);
        await characterService.update(appPool, { id: id, nombre: "Fausto" })
        const response = await characterService.getById(appPool, id!);
        expect(response).toBeTruthy();
        expect(response.nombre).toEqual("Fausto");
    });

    it('deletes', async () => {
        const appPool = await new ConnectionPool(config).connect();
        const [{ id }] = await characterService.getAll(appPool);
        const response = await characterService.deleteById(appPool, id!);
        expect(response).toBe(1);
    });
});