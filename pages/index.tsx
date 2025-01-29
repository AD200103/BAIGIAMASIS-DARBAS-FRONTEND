/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import Questions from "@/components/Questions/Questions";
import { QuestionType } from "@/types";
import { gettingQuestions } from "@/api/question";
import Loader from "@/components/Loader/Loader";
import PageNumBtnArr from "@/components/PageNumBtnArr/PageNumBtnArr";

const MainPage = () => {
  const [questions, setQuestions] = useState<null | QuestionType[]>(null);
  const [region, setRegion] = useState("");
  const [pageNum, setPageNum] = useState(0);
  const [loaderVis, setLoaderVis] = useState(false);
  const [questionPerPage, setQuestionPerPage] = useState(20);
  const [pageNumArr, setPageNumArr] = useState<null | number[]>(null);

  const getQuestions = async () => {
    setLoaderVis(true);
    try {
      const response = await gettingQuestions(pageNum, questionPerPage);
      if (response.status == 200) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setLoaderVis(false);
        setQuestions(response.data.questions);
        setPageNumArr(
          Array.from(
            {
              length: Math.ceil(
                response.data.questionAmmount / questionPerPage
              ),
            },
            (_, i) => i + 1
          )
        );
      }
    } catch (err) {
      console.log(err);
      setLoaderVis(false);
    }
  };

  useEffect(() => {
    setRegion(localStorage.getItem("region")!);
    getQuestions();
  }, [pageNum, questionPerPage]);

  return (
    <>
      <PageTemplate>
        {loaderVis && <Loader />}
        {questions && <Questions questions={questions} region={region} />}
        <PageNumBtnArr
          pageNum={pageNum}
          setPageNum={setPageNum}
          pageNumArr={pageNumArr}
        />
        <select onChange={(e) => setQuestionPerPage(parseInt(e.target.value))}>
          <option value="20">20</option>
          <option value="40">40</option>
          <option value="60">60</option>
        </select>
      </PageTemplate>
    </>
  );
};
export default MainPage;
