import sql, { ConnectionPool } from "mssql";
import Film from "../models/film";
import Filter from "../models/filmFilter";
import { getCurrDate } from "../utils/date";
 
export const getAll = async (db: ConnectionPool): Promise<Film[]> => {
    const response = await db.request().execute(`getAllSeries`);
    return response.recordset as Film[];
};

export const getAllWithFilter = async (db: ConnectionPool, query: Filter): Promise<Film[]> => {
    let condicion = "";
 
    if (query.titulo) condicion += `WHERE titulo LIKE '%${query.titulo}%'`

    console.log(`
    SELECT * FROM Serie ${condicion} ORDER BY fechaCreacion ${query.order};
`);

    const response = await db.request().query(`
        SELECT * FROM Serie ${condicion} ORDER BY fechaCreacion ${query.order};
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
        .execute(`getSerieById`);
    return response.recordset[0] as Film;
};
 
export const create = async (
    db: ConnectionPool,
    serie: Film
): Promise<number> => {
    const response = await db
        .request()
        .input("titulo", sql.VarChar(255), serie.titulo ?? "")
        .input("imagen", sql.VarChar(255), serie.imagen ?? "")
        .input("fechaCreacion", sql.Date, serie.fechaCreacion ?? getCurrDate())
        .input("calificacion", sql.Int, serie.calificacion ?? "")
        .execute(`createSerie`);
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
        .input("titulo", sql.VarChar(255), serie.titulo ?? "")
        .input("imagen", sql.VarChar(255), serie.imagen ?? "")
        .input("calificacion", sql.Int, serie.calificacion ?? 0)
        .input("fechaCreacion", sql.Date, serie.fechaCreacion ?? 0)
        .execute(`updateSerie`);
    return response.rowsAffected[0];
};
 
export const deleteById = async (
    db: ConnectionPool,
    id: number
): Promise<number> => {
    const response = await db
        .request()
        .input("id", sql.Int, id)
        .execute(`deleteSerieById`);
    return response.rowsAffected[0];
};
