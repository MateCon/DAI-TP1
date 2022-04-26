import sql, { IRecordSet } from "mssql";
import connect from "../utils/database";
import { Personaje } from "../models/personaje";

export const getAll = async (): Promise<IRecordSet<Personaje>> => {
	const request = await connect();
	const response = await request.query(`exec getAll`);
	return response.recordset;
};

export const getById = async (id: number): Promise<IRecordSet<Personaje>> => {
	const request = await connect();
	const response = await request
		.input("input_parameter", sql.Int, id)
		.query(`exec getAll`);
	return response.recordset;
};
