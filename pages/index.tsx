import axios from "axios";
import { useEffect, useState } from "react";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import Questions from "@/components/Questions/Questions";
import { QuestionType } from "@/types";
import cookie from "js-cookie";
import { useRouter } from "next/router";

const MainPage = () => {
  const [getToken, setgetToken] = useState(cookie.get("jwt-token"));
  const [questions, setQuestions] = useState<null | QuestionType[]>(null);
  const getQuestions = async () => {
    const response = await axios.get("http://localhost:3002/questions");
    setQuestions(response.data.questions);
  };
  const router = useRouter();

  const logOut = () => {
    if (getToken) {
      setgetToken(cookie.remove("jwt-token")!);
      router.reload();
    } else {
      console.log("No token!");
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);
  return (
    <>
      <PageTemplate getToken={getToken!} logOut={logOut}>
        {questions && <Questions questions={questions} />}
      </PageTemplate>
    </>
  );
};
export default MainPage;
