import sql, { IRecordSet } from "mssql";
import connect from "../utils/database";
import { Personaje } from "../models/personaje";

export const getAll = async (): Promise<IRecordSet<Personaje>> => {
	const request = await connect();
	const response = await request
		.execute(`getAll`);
	return response.recordset;
};

export const getById = async (id: number): Promise<IRecordSet<Personaje>> => {
	const request = await connect();
	const response = await request
		.input("id", sql.Int, id)
		.execute(`getById`);
	return response.recordset;
};

export const create = async (personaje: Personaje): Promise<number[]> => {
	const request = await connect();
	const response = await request
		.input("nombre", sql.VarChar(255), personaje.nombre ?? "")
		.input("imagen", sql.VarChar(255), personaje.imagen ?? "")
		.input("edad", sql.Int, personaje.edad ?? 0)
		.input("peso", sql.Int, personaje.peso ?? 0)
		.input("historia", sql.VarChar(600), personaje.historia ?? "")
		.execute(`create`);
	return response.rowsAffected;
};

export const update = async (personaje: Personaje): Promise<number[]> => {
	if (!personaje.id) throw new Error("Id es requerida");
	const request = await connect();
	const response = await request
		.input("id", sql.Int, personaje.id)
		.input("nombre", sql.VarChar(255), personaje.nombre ?? "")
		.input("imagen", sql.VarChar(255), personaje.imagen ?? "")
		.input("edad", sql.Int, personaje.edad ?? 0)
		.input("peso", sql.Int, personaje.peso ?? 0)
		.input("historia", sql.VarChar(600), personaje.historia ?? "")
		.execute(`update`);
	return response.rowsAffected;
};

export const deleteById = async (id: number): Promise<number[]> => {
	const request = await connect();
	const response = await request
		.input("id", sql.Int, id)
		.execute(`deleteById`);
	return response.rowsAffected;
};
