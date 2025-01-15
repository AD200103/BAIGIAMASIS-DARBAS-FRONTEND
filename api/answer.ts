import axios from "axios";
export const deleteAnswer = async (id: string, token: string) => {
  const headers = { authorization: token };
  const response = await axios.delete(`http://localhost:3002/answer/${id}`, {
    headers,
  });
  return response;
};
export const addAnswer = async (token: string, body: object, id: string) => {
  const headers = {
    authorization: token,
  };
  const response = await axios.post(
    `http://localhost:3002/question/${id}/answers`,
    body,
    { headers }
  );
  return response;
};
export const getAnswers = async (id: string) => {
  const response = await axios.get(
    `http://localhost:3002/question/${id}/answers`
  );
  return response;
};
export const updateAnswerDislikeLikeStatus = async (
  id: string,
  body: object,
  token: string
) => {
  const headers = { authorization: token };
  const response = await axios.put(`http://localhost:3002/answer/${id}`, body, {
    headers,
  });
  return response;
};
