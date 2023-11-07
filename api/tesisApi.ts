import axios from "axios";

const tesisApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TESIS_BACKEND_API
});

export default tesisApi;