import styles from "./styles.module.css";
import QuestionCard from "../QuestionCard/QuestionCard";
import { QuestionType } from "@/types";
import React from "react";
import { useTranslation } from "react-i18next";
import SelectPageNum from "../SelectPageNum/SelectPageNum";
import SortQuestionsBy from "../SortQuestionsBy/SortQuestionBy";
type QuestionsPropsType = {
  questions: QuestionType[];
  setQuestions: React.Dispatch<React.SetStateAction<QuestionType[] | null>>;
  setQuestionsPerPage: React.Dispatch<React.SetStateAction<number>>;
  questionsPerPage: number;
  pageNum: number;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
  pageNumArr: number[];
  setSliceStart: React.Dispatch<React.SetStateAction<number>>;
  setSliceEnd: React.Dispatch<React.SetStateAction<number>>;
  setPageNumArr: React.Dispatch<React.SetStateAction<number[] | null>>;
  setSortVal: React.Dispatch<React.SetStateAction<string>>;
  setLoaderVis: React.Dispatch<React.SetStateAction<boolean>>;
};
const Questions = ({
  setSortVal,
  setPageNumArr,
  questions,
  setQuestions,
  region,
  setQuestionsPerPage,
  questionsPerPage,
  pageNum,
  setPageNum,
  pageNumArr,
  setSliceStart,
  setSliceEnd,
  setLoaderVis,
}: QuestionsPropsType & { region: string }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.main}>
      <h1>{t("questions")}</h1>
      <div className={styles.sorting}>
        <SortQuestionsBy
          setSortVal={setSortVal}
          setQuestions={setQuestions}
          pageNum={pageNum}
          setPageNumArr={setPageNumArr}
          setLoaderVis={setLoaderVis}
        />
        <SelectPageNum
          setQuestionsPerPage={setQuestionsPerPage}
          questionsPerPage={questionsPerPage}
          pageNum={pageNum}
          setPageNum={setPageNum}
          pageNumArr={pageNumArr}
          setSliceStart={setSliceStart}
          setSliceEnd={setSliceEnd}
        />
      </div>
      {questions.map((q) => (
        <QuestionCard key={q.id} {...q} region={region} />
      ))}
    </div>
  );
};
export default Questions;
