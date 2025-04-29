/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import Questions from "@/components/Questions/Questions";
import { QuestionType } from "@/types";
import { gettingQuestions } from "@/api/question";
import Loader from "@/components/Loader/Loader";
import PageNumBtnArr from "@/components/PageNumBtnArr/PageNumBtnArr";
import { formArr } from "@/utils/formArray";

const MainPage = () => {
  const [questions, setQuestions] = useState<null | QuestionType[]>(null);
  const [region, setRegion] = useState("");
  const [pageNum, setPageNum] = useState(0);
  const [loaderVis, setLoaderVis] = useState(false);
  const [questionsPerPage, setQuestionsPerPage] = useState(2);
  const [pageNumArr, setPageNumArr] = useState<null | number[]>(null);
  const [sliceStart, setSliceStart] = useState(0);
  const [sliceEnd, setSliceEnd] = useState(5);
  const [sortVal, setSortVal] = useState("All");
  const [isReady, setIsReady] = useState(false);

  const getQuestions = async () => {
    try {
      setLoaderVis(true);
      const questionPerPage = parseInt(
        sessionStorage.getItem("questionPerPage") || "2"
      );
      const response = await gettingQuestions(
        pageNum,
        questionPerPage,
        sortVal
      );
      if (response.status == 200) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setLoaderVis(false);
        setQuestions(response.data.questions);
        setPageNumArr(formArr(response, questionPerPage));
      }
    } catch (err) {
      console.log(err);
      setLoaderVis(false);
    }
  };

  useEffect(() => {
    const reg = sessionStorage.getItem("region") || "Europe/Vilnius";
    const sort = sessionStorage.getItem("SortBy") || "All";
    const qpp = parseInt(sessionStorage.getItem("questionPerPage") || "2");
    setRegion(reg);
    setSortVal(sort);
    setQuestionsPerPage(qpp);
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) {
      getQuestions();
      console.log("henderson");
    }
  }, [pageNum, questionsPerPage, sortVal, isReady]);
  return (
    <>
      <PageTemplate>
        {loaderVis && <Loader />}
        {questions && (
          <Questions
            questions={questions}
            setQuestions={setQuestions}
            region={region}
            setQuestionsPerPage={setQuestionsPerPage}
            questionsPerPage={questionsPerPage}
            pageNum={pageNum}
            setSortVal={setSortVal}
            setPageNum={setPageNum}
            pageNumArr={pageNumArr! && pageNumArr}
            setSliceStart={setSliceStart}
            setSliceEnd={setSliceEnd}
            setPageNumArr={setPageNumArr}
            setLoaderVis={setLoaderVis}
          />
        )}
        {pageNumArr && (
          <PageNumBtnArr
            pageNum={pageNum}
            setPageNum={setPageNum}
            pageNumArr={pageNumArr}
            sliceStart={sliceStart}
            setSliceStart={setSliceStart}
            sliceEnd={sliceEnd}
            setSliceEnd={setSliceEnd}
          />
        )}
      </PageTemplate>
    </>
  );
};
export default MainPage;
