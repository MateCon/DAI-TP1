import { ConnectionPool } from "mssql";
import * as characterService from "./characterService";
import config from "../utils/database";

test('get all characters', async () => {
	const appPool = new ConnectionPool(config);
    const response = await characterService.getAll(appPool);
    expect(response).toBeTruthy();
});

test('create character', async () => {
	const appPool = new ConnectionPool(config);
    const response = await characterService.create(appPool, {
        nombre: "Mate",
        edad: 17
    });
    expect(response).toBe(1);
});