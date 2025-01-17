import axios from "axios";
export const deleteQuestion = async (token: string, id: string) => {
  const headers = { authorization: token };
  const response = await axios.delete(
    `${process.env.BASE_URL}/question/${id}`,
    {
      headers,
    }
  );
  return response;
};
export const addQuestion = async (body: object, token: string) => {
  const headers = {
    authorization: token,
  };
  const response = await axios.post(`${process.env.BASE_URL}/question`, body, {
    headers,
  });
  return response;
};
export const gettingQuestions = async () => {
  const response = await axios.get(`${process.env.BASE_URL}/questions`);
  return response;
};
