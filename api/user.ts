import axios from "axios";
export const signingIn = async (body: object) => {
  const response = await axios.post("http://localhost:3002/register", body);
  return response;
};
export const logingIn = async (body: object) => {
  const response = await axios.post("http://localhost:3002/login", body);
  return response;
};
