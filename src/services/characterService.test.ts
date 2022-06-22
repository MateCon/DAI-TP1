import { ConnectionPool } from "mssql";
import * as characterService from "./characterService";
import config from "../utils/database";

test('get all characters', async () => {
	const appPool = new ConnectionPool(config);
    const response = await characterService.getAll(appPool);
    console.log(response);
    // expect(sum(1, 2)).toBe(3);
});