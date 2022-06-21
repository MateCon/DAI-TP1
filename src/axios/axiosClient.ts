import axios from "axios";
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

// interface Pizza {}

// export const createPizzas = async (pizza: Pizza) => {
//     axiosClient.post('/pizza', pizza, {
//         headers: {
//             Authorization: ""
//         }
//     })
//         .then(res => {
//             if (res.status < 300) return res.data;
//             else console.log(`Response with status code ${res.status}`);
//         })
//         .catch(err => {
//             console.log(err);
//         })
// }