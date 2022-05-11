import sql, { ConnectionPool } from "mssql";
import Film from "../models/film";
import Filter from "../models/filmFilter";
 
export const getAll = async (db: ConnectionPool): Promise<Film[]> => {
    const response = await db.request().execute(`getAllSeries`);
    return response.recordset as Film[];
};

export const getAllWithFilter = async (db: ConnectionPool, query: Filter): Promise<Film[]> => {
    let condicion = "";
 
    if (query.titulo) condicion += `WHERE titulo = ${query.titulo}`
 
    const response = await db.request().query(`
        SELECT * FROM Serie ${condicion !== "WHERE" ? condicion : ""} ORDER BY titulo = ${query.order};
    `);
    return response.recordset as Film[];
};
 
export const getById = async (
    db: ConnectionPool,
    id: number
): Promise<Film> => {
    const response = await db
        .request()
        .input("id", sql.Int, id)
        .execute(`getSeriesById`);
    return response.recordset[0] as Film;
};
 
export const create = async (
    db: ConnectionPool,
    serie: Film
): Promise<number> => {
    const response = await db
        .request()
        .input("nombre", sql.VarChar(255), serie.titulo ?? "")
        .input("imagen", sql.VarChar(255), serie.imagen ?? "")
        .input("edad", sql.Int, serie.calificacion ?? 0)
        .input("peso", sql.Date, serie.fechaCreacion ?? "")
        .execute(`createSeries`);
    return response.rowsAffected[0];
};
 
export const update = async (
    db: ConnectionPool,
    serie: Film
): Promise<number> => {
    if (!serie.id) throw new Error("Id es requerida");
    const response = await db
        .request()
        .input("id", sql.Int, serie.id)
        .input("nombre", sql.VarChar(255), serie.titulo ?? "")
        .input("imagen", sql.VarChar(255), serie.imagen ?? "")
        .input("edad", sql.Int, serie.calificacion ?? 0)
        .input("peso", sql.Date, serie.fechaCreacion ?? 0)
        .execute(`updateSeries`);
    return response.rowsAffected[0];
};
 
export const deleteById = async (
    db: ConnectionPool,
    id: number
): Promise<number> => {
    const response = await db
        .request()
        .input("id", sql.Int, id)
        .execute(`deleteSeriesById`);
    return response.rowsAffected[0];
};