import sql, { ConnectionPool } from "mssql";
import Filter from "../models/filter";
import { Personaje } from "../models/personaje";
 
export const getAll = async (db: ConnectionPool, query: Filter): Promise<Personaje[]> => {
    let condiciones = [];
 
    if (query.nombres.length > 0) condiciones.push('nombre = ' + query.nombres
        .map(nombre => `'${nombre}'`)
        .join(` or nombre = `));
    if (query.edades.length > 0) condiciones.push('edad = ' + query.edades.join(` or edad = `));
    if (query.pesos.length > 0) condiciones.push('peso = ' + query.pesos.join(` or peso = `));
 
    condiciones = condiciones.map(c => ` (${c}) `);
 
    const condicion = "WHERE" + condiciones.join("and")
    console.log(condicion)
 
    const response = await db.request().query(`
        SELECT * FROM Personajes ${condicion !== "WHERE" ? condicion : ""};
    `);
    return response.recordset as Personaje[];
};
 
export const getById = async (
    db: ConnectionPool,
    id: number
): Promise<Personaje> => {
    const response = await db
        .request()
        .input("id", sql.Int, id)
        .execute(`getById`);
    return response.recordset[0] as Personaje;
};
 
export const create = async (
    db: ConnectionPool,
    personaje: Personaje
): Promise<number> => {
    const response = await db
        .request()
        .input("nombre", sql.VarChar(255), personaje.nombre ?? "")
        .input("imagen", sql.VarChar(255), personaje.imagen ?? "")
        .input("edad", sql.Int, personaje.edad ?? 0)
        .input("peso", sql.Int, personaje.peso ?? 0)
        .input("historia", sql.VarChar(600), personaje.historia ?? "")
        .execute(`create`);
    return response.rowsAffected[0];
};
 
export const update = async (
    db: ConnectionPool,
    personaje: Personaje
): Promise<number> => {
    if (!personaje.id) throw new Error("Id es requerida");
    const response = await db
        .request()
        .input("id", sql.Int, personaje.id)
        .input("nombre", sql.VarChar(255), personaje.nombre ?? "")
        .input("imagen", sql.VarChar(255), personaje.imagen ?? "")
        .input("edad", sql.Int, personaje.edad ?? 0)
        .input("peso", sql.Int, personaje.peso ?? 0)
        .input("historia", sql.VarChar(600), personaje.historia ?? "")
        .execute(`update`);
    return response.rowsAffected[0];
};
 
export const deleteById = async (
    db: ConnectionPool,
    id: number
): Promise<number> => {
    const response = await db
        .request()
        .input("id", sql.Int, id)
        .execute(`deleteById`);
    return response.rowsAffected[0];
};
