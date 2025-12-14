import axios from "axios";
const chatAxios = axios.create({
  baseURL: "https://elhamiryelhag.nami-tec.com/api-chat",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  // withCredentials: true,
});

export default chatAxios;
