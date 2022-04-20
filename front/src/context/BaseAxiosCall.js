import axios from "axios";


export const API = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Authorization": `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`
  }
});
