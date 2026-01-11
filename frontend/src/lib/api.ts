import type { loginType, registerType, verifyEmailType } from "@/types/api.types";
import API from "./axios-client";

export const getCurrentUserQueryFn = async () => {
  const response = await API.get("/user/current");
  return response.data;
};

export const registerMutationFn = async (value: registerType) => {
  const repsonse = await API.post("/auth/register", value);
  return repsonse.data;
};

export const loginMutationFn = async (value: loginType) => {
  const response = await API.post("/auth/login", value);
  return response.data;
};

export const logoutMutationFn = async () => {
  const response = await API.post("/auth/logout");
  return response.data;
};


export const verifyEmailMutationFn = async(code : verifyEmailType ) => {
  const response = await API.post(`/auth/confirm-account` , code)
  return response.data
}