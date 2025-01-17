import axios from "axios";
export const signingIn = async (body: object) => {
  const response = await axios.post(`${process.env.BASE_URL}/register`, body);
  return response;
};
export const logingIn = async (body: object) => {
  const response = await axios.post(`${process.env.BASE_URL}/login`, body);
  return response;
};
