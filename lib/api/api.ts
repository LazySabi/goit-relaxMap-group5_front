import axios from "axios";

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SITE_URL + "/api",
  withCredentials: true,
});