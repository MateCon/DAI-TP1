import { IRecordSet } from "mssql";
import connect from "../utils/database";
import { Personaje } from "../models/personaje";

export const getAll = async (): Promise<IRecordSet<Personaje>> => {
	const request = await connect();
	const response = await request.query(`exec getAll`);
	return response.recordset;
};
