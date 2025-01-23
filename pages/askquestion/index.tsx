/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import cookie from "js-cookie";
import LoginModal from "@/components/LoginModal/LoginModal";
import QuestionForm from "@/components/QuestionForm/QuestionForm";
import styles from "./styles.module.css";
import { useTranslation } from "react-i18next";

const AskPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [askQuestion, setAskQuestion] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    setAskQuestion(t("AskAQuestion"));
    setMessage(t("LoginToAskAQuestion"));
  }, [askQuestion]);
  const { t } = useTranslation();
  useEffect(() => {
    setTimeout(() => {
      if (!cookie.get("jwt-token")) {
        setShowModal(true);
      }
      if (cookie.get("jwt-token")) {
        setShowModal(false);
      }
    }, 100);
  }, []);

  return (
    <PageTemplate>
      <h1 className={styles.askQustionTitle}>{askQuestion}!</h1>
      <QuestionForm setShowModal={setShowModal} />
      <LoginModal
        showModal={showModal}
        setShowModal={setShowModal}
        message={message}
      />
    </PageTemplate>
  );
};
export default AskPage;
