import axios from "axios";
export const deleteAnswer = async (id: string, token: string) => {
  const headers = { authorization: token };
  const response = await axios.delete(`${process.env.BASE_URL}/answer/${id}`, {
    headers,
  });
  return response;
};
export const addAnswer = async (token: string, body: object, id: string) => {
  const headers = {
    authorization: token,
  };
  const response = await axios.post(
    `${process.env.BASE_URL}/question/${id}/answers`,
    body,
    {
      headers,
    }
  );
  return response;
};
export const getAnswers = async (id: string) => {
  const response = await axios.get(
    `${process.env.BASE_URL}/question/${id}/answers`
  );
  return response;
};
export const updateAnswerDislikeLikeStatus = async (
  id: string,
  token: string,
  body: object
) => {
  const headers = { authorization: token };
  const response = await axios.put(
    `${process.env.BASE_URL}/answer/${id}`,
    body,
    {
      headers,
    }
  );
  return response;
};
