import { AxiosResponse } from "axios";

export const formArr = (response: AxiosResponse, questionPerPage: number) => {
  return Array.from(
    {
      length: Math.ceil(response.data.questionAmmount.length / questionPerPage),
    },
    (_, i) => i + 1
  );
};
