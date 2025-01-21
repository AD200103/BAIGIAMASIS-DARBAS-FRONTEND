/* eslint-disable @next/next/no-img-element */
import cookie from "js-cookie";
import styles from "./styles.module.css";
import dislike from "../../assets/img/dislike.svg";
import activeDislike from "../../assets/img/dislikeActive.svg";
import { AxiosError } from "axios";
import { LikeDislikeButtonPropsType } from "@/types";
import { updateAnswerDislikeLikeStatus } from "@/api/answer";
import updateLikesDislikes from "@/utils/likesDislikesUpd";
type DislikePropsType = LikeDislikeButtonPropsType & {
  dislikeState: boolean;
  dislikesAmmount: number;
};
const DislikeButton = ({
  setDislikesAmmount,
  id,
  userIdFromToken,
  setUserDislikeIdArr,
  dislikeState,
  setDislikeState,
  setUserLikeIdArr,
  setLikesAmmount,
  setShowLogModal,
  userLikeIdArr,
  userDislikeIdArr,
  dislikesAmmount,
}: DislikePropsType) => {
  const updateAnswerDislikeStatus = async () => {
    try {
      const token = cookie.get("jwt-token") as string;
      const body = {
        pressed: "dislike pressed",
      };
      if (token) {
        setDislikeState(!dislikeState);
        updateLikesDislikes(
          body,
          userIdFromToken,
          setUserDislikeIdArr,
          setUserLikeIdArr,
          setDislikesAmmount,
          setLikesAmmount,
          userLikeIdArr,
          userDislikeIdArr,
          dislikesAmmount
        );
      }
      await updateAnswerDislikeLikeStatus(id, token, body);
    } catch (err: unknown) {
      const error = err as AxiosError;
      if (error.status == 403) {
        setShowLogModal(true);
        console.log(err);
      }
    }
  };
  return (
    <button
      className={styles.main}
      onClick={() => {
        updateAnswerDislikeStatus();
      }}
    >
      {dislikeState ? (
        <img src={activeDislike.src} alt="active-like" />
      ) : (
        <img src={dislike.src} alt="like" />
      )}
    </button>
  );
};
export default DislikeButton;
