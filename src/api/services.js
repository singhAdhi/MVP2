import createAxiosInstance from "./axios";
import { ENDPOINTS_BASE_URL } from "../config";

const shopApi = createAxiosInstance("http://localhost:5173"); //(ENDPOINTS_BASE_URL.shop);
const hotelApi = createAxiosInstance("http://localhost:5173"); //(ENDPOINTS_BASE_URL.hotel);
const flightApi = createAxiosInstance("http://localhost:5173"); //(ENDPOINTS_BASE_URL.flight);

export { shopApi, hotelApi, flightApi };
