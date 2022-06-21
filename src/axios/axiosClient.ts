import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:4000"
});

export const getAllPizzas = async () => {
    axiosClient.get('/pizzas', {
        headers: {
            Authorization: ""
        }
    })
        .then(res => {
            if (res.status < 300) return res.data;
            else console.log(`Response with status code ${res.status}`);
        })
        .catch(err => {
            console.log(err);
        })
}

interface Pizza {}

export const createPizzas = async (pizza: Pizza) => {
    axiosClient.post('/pizza', pizza, {
        headers: {
            Authorization: ""
        }
    })
        .then(res => {
            if (res.status < 300) return res.data;
            else console.log(`Response with status code ${res.status}`);
        })
        .catch(err => {
            console.log(err);
        })
}