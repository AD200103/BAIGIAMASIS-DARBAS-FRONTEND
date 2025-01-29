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
export const gettingQuestions = async (
  page: number,
  questionNumberPerPage: number
) => {
  const response = await axios.get(
    `${process.env.BASE_URL}/questions?p=${page}&q=${questionNumberPerPage}`
  );
  return response;
};
export const getQuestion = async (id: string) => {
  const response = await axios.get(`${process.env.BASE_URL}/questions/${id}`);
  return response;
};
export const updateAnswersNumberToQuestion = async (
  body: object,
  id: string
) => {
  const response = await axios.put(
    `${process.env.BASE_URL}/question/${id}`,
    body
  );
  return response;
};
