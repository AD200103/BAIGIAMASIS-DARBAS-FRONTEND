import { useEffect, useState } from "react";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import cookie from "js-cookie";
import LoginModal from "@/components/LoginModal/LoginModal";
import QuestionForm from "@/components/QuestionForm/QuestionForm";
const AskPage = () => {
  const [showModal, setShowModal] = useState(false);

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
      <QuestionForm setShowModal={setShowModal} />
      <LoginModal
        showModal={showModal}
        setShowModal={setShowModal}
        message={"Login to ask a question!"}
      />
    </PageTemplate>
  );
};
export default AskPage;
