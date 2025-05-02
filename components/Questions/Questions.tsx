import styles from "./styles.module.css";
import QuestionCard from "../QuestionCard/QuestionCard";
import { QuestionType } from "@/types";
import React from "react";
import { useTranslation } from "react-i18next";
import SelectPageNum from "../SelectPageNum/SelectPageNum";
import SortQuestionsBy from "../SortQuestionsBy/SortQuestionBy";
type QuestionsPropsType = {
  questions: QuestionType[];
  setQuestionsPerPage: React.Dispatch<React.SetStateAction<number>>;
  questionsPerPage: number;
  pageNum: number;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
  pageNumArr: number[];
  setSliceStart: React.Dispatch<React.SetStateAction<number>>;
  setSliceEnd: React.Dispatch<React.SetStateAction<number>>;
  setSortVal: React.Dispatch<React.SetStateAction<string>>;
};
const Questions = ({
  setSortVal,
  questions,
  region,
  setQuestionsPerPage,
  questionsPerPage,
  setPageNum,
  pageNumArr,
  setSliceStart,
  setSliceEnd,
}: QuestionsPropsType & { region: string }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.main}>
      <h1>{t("questions")}</h1>
      <div className={styles.sorting}>
        <SortQuestionsBy setSortVal={setSortVal} setPageNum={setPageNum} />
        <SelectPageNum
          setQuestionsPerPage={setQuestionsPerPage}
          questionsPerPage={questionsPerPage}
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
