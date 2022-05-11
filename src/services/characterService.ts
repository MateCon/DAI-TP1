import sql, { ConnectionPool } from "mssql";
import Character from "../models/character";
import Filter from "../models/characterFilter";

export const getAll = async (db: ConnectionPool): Promise<Character[]> => {
    const response = await db
        .request()
        .execute(`getAllPersonajes`);
    return response.recordset as Character[];
};
 
export const getAllWithFilter = async (db: ConnectionPool, query: Filter): Promise<Character[]> => {
    let condiciones = [];
 
    if (query.nombres.length > 0) condiciones.push('nombre = ' + query.nombres
        .map(nombre => `'${nombre}'`)
        .join(` or nombre = `));
    if (query.edades.length > 0) condiciones.push('edad = ' + query.edades.join(` or edad = `));
    if (query.pesos.length > 0) condiciones.push('peso = ' + query.pesos.join(` or peso = `));
 
    condiciones = condiciones.map(c => ` (${c}) `);
    const condicion = "WHERE" + condiciones.join("and")

    console.log(condicion);
    

    const response = await db.request().query(`
        SELECT * FROM Personaje ${condicion !== "WHERE" ? condicion : ""};
    `);
    return response.recordset as Character[];
};
 
export const getById = async (
    db: ConnectionPool,
    id: number
): Promise<Character> => {
    const response = await db
        .request()
        .input("id", sql.Int, id)
        .execute(`getPersonajeById`);
    return response.recordset[0] as Character;
};
 
export const create = async (
    db: ConnectionPool,
    personaje: Character
): Promise<number> => {
    const response = await db
        .request()
        .input("nombre", sql.VarChar(255), personaje.nombre ?? "")
        .input("imagen", sql.VarChar(255), personaje.imagen ?? "")
        .input("edad", sql.Int, personaje.edad ?? 0)
        .input("peso", sql.Int, personaje.peso ?? 0)
        .input("historia", sql.VarChar(600), personaje.historia ?? "")
        .execute(`createPersonaje`);
    return response.rowsAffected[0];
};
 
export const update = async (
    db: ConnectionPool,
    personaje: Character
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
        .execute(`updatePersonaje`);
    return response.rowsAffected[0];
};
 
export const deleteById = async (
    db: ConnectionPool,
    id: number
): Promise<number> => {
    const response = await db
        .request()
        .input("id", sql.Int, id)
        .execute(`deletePersonajeById`);
    return response.rowsAffected[0];
};
