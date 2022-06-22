import axios from "axios";
import Character from "../models/character";
import { getSignedToken } from "../utils/jwt.strategy";

const axiosClient = axios.create({
    baseURL: "http://localhost:8080/",
    headers: {
        Authorization: `Bearer ${getSignedToken()}`
    }
});

export const getAllUsers = async () => {
    return axiosClient.get('character/')
        .then(res => {
            if (res.status < 300) return res.data;
            else console.log(`Response with status code ${res.status}`);
        })
        .catch(err => {
            console.log(err);
        })
}


export const createCharacter = async (character: Character) => {
    return axiosClient.post('character/', character)
        .then(res => {
            if (res.status < 300) return res.data;
            else console.log(`Response with status code ${res.status}`);
        })
        .catch(err => {
            console.log(err);
        })
}