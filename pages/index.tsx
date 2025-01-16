import { useEffect, useState } from "react";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import Questions from "@/components/Questions/Questions";
import { QuestionType } from "@/types";
import { gettingQuestions } from "@/api/question";
import Loader from "@/components/Loader/Loader";
const MainPage = () => {
  const [questions, setQuestions] = useState<null | QuestionType[]>(null);
  const getQuestions = async () => {
    try {
      const response = await gettingQuestions();
      setQuestions(response.data.questions);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);
  return (
    <>
      <PageTemplate>
        {questions ? <Questions questions={questions} /> : <Loader />}
      </PageTemplate>
    </>
  );
};
export default MainPage;
