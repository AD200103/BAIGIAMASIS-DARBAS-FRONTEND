import cookie from "js-cookie";
import styles from "./styles.module.css";
import { decodeToken } from "@/utils/jwtTokenDecoded";
import { AnswerCardPropsType } from "@/types";
import { useState } from "react";
import LikesDislikes from "../LikesDislikes/LikesDislikes";
import LoginModal from "../LoginModal/LoginModal";
import { useTranslation } from "react-i18next";
import Loader from "../Loader/Loader";
import AnsCardDelBtn from "../AnswerCardDelBtn/AnswerCardDelBtn";
import AnsCardNameDate from "../AnswerCardNameDate/AnswerCardNameDate";
const AnswerCard = ({
  answer_text,
  date,
  name,
  id,
  userId,
  usersWhoLikedTheAnswer,
  usersWhoDislikedTheAnswer,
  region,
  setAnswers,
}: AnswerCardPropsType) => {
  const { t } = useTranslation();
  const userIdFromToken = decodeToken(cookie.get("jwt-token")!)?.id || null;
  const [showLogModal, setShowLogModal] = useState(false);
  const [message, setMessage] = useState(t("loginToRate"));
  const [loaderVis, setLoaderVis] = useState(false);

  return (
    <div className={styles.main}>
      <LoginModal
        showModal={showLogModal}
        setShowModal={setShowLogModal}
        message={message}
      />
      {loaderVis && <Loader />}
      <AnsCardDelBtn
        answer_text={answer_text}
        userIdFromToken={userIdFromToken}
        userId={userId}
        setLoaderVis={setLoaderVis}
        setAnswers={setAnswers}
        setMessage={setMessage}
        setShowLogModal={setShowLogModal}
        id={id}
      />
      <div className={styles.likesNameDate}>
        <LikesDislikes
          id={id}
          usersWhoLikedTheAnswer={usersWhoLikedTheAnswer}
          usersWhoDislikedTheAnswer={usersWhoDislikedTheAnswer}
          userIdFromToken={userIdFromToken!}
          userId={userId}
          setShowLogModal={setShowLogModal}
        />
        <AnsCardNameDate
          userIdFromToken={userIdFromToken}
          date={date}
          region={region}
          userId={userId}
          name={name}
        />
      </div>
    </div>
  );
};
export default AnswerCard;
