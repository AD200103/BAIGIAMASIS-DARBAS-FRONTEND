import cookie from "js-cookie";
import styles from "./styles.module.css";
import { dateConvert } from "@/utils/dateAndEmail";
import { decodeToken } from "@/utils/jwtTokenDecoded";
import { AnswerType } from "@/types";
import { useState } from "react";
import LikesDislikes from "../LikesDislikes/LikesDislikes";
import LoginModal from "../LoginModal/LoginModal";
import { deleteAnswer } from "@/api/answer";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import Loader from "../Loader/Loader";
type AnswerCardPropsType = {
  answer_text: string;
  date: Date;
  id: string;
  name: string;
  userId: string;
  usersWhoLikedTheAnswer: string[];
  usersWhoDislikedTheAnswer: string[];
  setAnswers: React.Dispatch<React.SetStateAction<AnswerType[] | null>>;
  region: string;
};
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
  const userIdFromToken = decodeToken(cookie.get("jwt-token")!);
  const [showLogModal, setShowLogModal] = useState(false);
  const [message, setMessage] = useState(t("loginToRate"));
  const [loaderVis, setLoaderVis] = useState(false);
  const deleteAnAnswer = async () => {
    const token = cookie.get("jwt-token") as string;
    if (token) {
      setLoaderVis(true);
    }
    try {
      const response = await deleteAnswer(id, token);
      if (response.status == 200) {
        setLoaderVis(false);
        setAnswers((prev) => prev!.filter((a) => a.id !== id));
      }
    } catch (err) {
      const error = err as AxiosError;
      if (error.status == 403) {
        setLoaderVis(false);
        setMessage(t("LoginToDeleteYourAnswer"));
        setShowLogModal(true);
      }
    }
  };

  return (
    <div className={styles.main}>
      <LoginModal
        showModal={showLogModal}
        setShowModal={setShowLogModal}
        message={message}
      />
      {loaderVis && <Loader />}
      <div className={styles.ansAndDelBtn}>
        <p className={styles.ansText}>
          {t("Answer")} {answer_text}
        </p>
        {userIdFromToken == userId && (
          <p className={styles.delBtn} onClick={deleteAnAnswer}>
            {t("Delete")}
          </p>
        )}
      </div>
      <div className={styles.likesNameDate}>
        <LikesDislikes
          id={id}
          usersWhoLikedTheAnswer={usersWhoLikedTheAnswer}
          usersWhoDislikedTheAnswer={usersWhoDislikedTheAnswer}
          userIdFromToken={userIdFromToken!}
          userId={userId}
          setShowLogModal={setShowLogModal}
        />
        <div className={styles.nameDate}>
          <h4>
            {t("AnsweredBy")}{" "}
            {userIdFromToken == userId ? (
              <span className={styles.youClass}>{t("You")}</span>
            ) : (
              <span className={styles.userClass}>{name}</span>
            )}
          </h4>
          <h4>
            {t("time")}: {dateConvert(date, region)}
          </h4>
        </div>
      </div>
    </div>
  );
};
export default AnswerCard;
