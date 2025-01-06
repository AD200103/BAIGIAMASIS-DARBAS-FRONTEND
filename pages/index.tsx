import axios from "axios";
import { useEffect, useState } from "react";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import Questions from "@/components/Questions/Questions";
import { QuestionType } from "@/types";

const MainPage = () => {
  const [questions, setQuestions] = useState<null | QuestionType[]>(null);
  const getQuestions = async () => {
    const response = await axios.get("http://localhost:3002/questions");
    setQuestions(response.data.questions);
  };
  useEffect(() => {
    getQuestions();
  }, []);
  return (
    <>
      <PageTemplate>
        {questions && <Questions questions={questions} />}
      </PageTemplate>
    </>
  );
};
export default MainPage;
