import axios from "axios";
export const deleteQuestion = async (token: string, id: string) => {
  const headers = { authorization: token };
  const response = await axios.delete(`http://localhost:3002/question/${id}`, {
    headers,
  });
  return response;
};
export const addQuestion = async (body: object, token: string) => {
  const headers = {
    authorization: token,
  };
  const response = await axios.post("http://localhost:3002/question", body, {
    headers,
  });
  return response;
};
export const gettingQuestions = async () => {
  const response = await axios.get("http://localhost:3002/questions");
  return response;
};
