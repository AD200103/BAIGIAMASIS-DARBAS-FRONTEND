import { useEffect, useState } from "react";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import Questions from "@/components/Questions/Questions";
import { QuestionType } from "@/types";
import { gettingQuestions } from "@/api/question";
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
        {questions && <Questions questions={questions} />}
      </PageTemplate>
    </>
  );
};
export default MainPage;
