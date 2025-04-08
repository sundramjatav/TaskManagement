import { backendConfig } from "../constants/mainContent";
import axios from "axios";

const origin = backendConfig?.origin;

export const getTodaytask = async () => {
  try {
    const response = await axios.get(`${origin}/tasks/today-tasks`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};