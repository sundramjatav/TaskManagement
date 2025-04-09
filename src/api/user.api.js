import { backendConfig } from "../constants/mainContent";
import axios from "axios";

const origin = backendConfig?.origin;

export const userLogin = async (payload) => {
  try {
    const response = await axios.post(`${origin}/auth/login`, payload);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const userRegister = async (payload) => {
  try {
    const response = await axios.post(`${origin}/auth/register`, payload);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const verifyOtp = async (payload) => {
  try {
    const response = await axios.post(`${origin}/auth/verify-otp`, payload);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getProfile = async () => {
  try {
    // console.log("Token:", sessionStorage.getItem("token"))
    const response = await axios.get(`${origin}/user/profile`, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log(error);
      // sessionStorage.clear();
      // sessionStorage.clear();
      // window.location.href = "/login";
  }
};

export const updateProfile = async (payload) => {
  try {
    const response = await axios.put(`${origin}/user/updateProfile`, payload, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log(error);
      // sessionStorage.clear();
      // sessionStorage.clear();
      // window.location.href = "/login";
  }
};

export const updateEmailNotification = async (payload) => {
  try {
    const response = await axios.put(`${origin}/user/updateEmailNotification`, payload, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      withCredentials: true,
    });
    return response;
  }
catch (error) {
    console.log(error);
      // sessionStorage.clear();
      // sessionStorage.clear();
      // window.location.href = "/login";
  }
}

export const getSuggestedTask = async () => {
  try {
    const response = await axios.get(`${origin}/chatbot/today-tasks`, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
      // sessionStorage.clear();
      // sessionStorage.clear();
      // window.location.href = "/login";
  }
};

export const updateSuggestedTask = async (payload) => {
  try {
    const response = await axios.post(`${origin}/chatbot/task-action`, payload, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
      // sessionStorage.clear();
      // sessionStorage.clear();
      // window.location.href = "/login";
  }
};


