/* eslint-disable @next/next/no-img-element */
import cookie from "js-cookie";
import styles from "./styles.module.css";
import like from "../../assets/img/like.svg";
import activeLike from "../../assets/img/likeActive.svg";
import { AxiosError } from "axios";
import { LikeDislikeButtonPropsType } from "@/types";
import { updateAnswerDislikeLikeStatus } from "@/api/answer";
import updateLikesDislikes from "@/utils/likesDislikesUpd";
type LikePropsType = LikeDislikeButtonPropsType & {
  likeState: boolean;
};
const LikeButton = ({
  userIdFromToken,
  id,
  setUserDislikeIdArr,
  setUserLikeIdArr,
  likeState,
  setLikeState,
  setShowLogModal,
  userLikeIdArr,
  userDislikeIdArr,
}: LikePropsType) => {
  const updateAnswerLikeStatus = async () => {
    try {
      const token = cookie.get("jwt-token") as string;
      const body = {
        pressed: "like pressed",
      };
      if (token) {
        updateLikesDislikes(
          body,
          userIdFromToken,
          setUserDislikeIdArr,
          setUserLikeIdArr,
          userLikeIdArr,
          userDislikeIdArr
        );
        setLikeState(userLikeIdArr.includes(userIdFromToken!));
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
        updateAnswerLikeStatus();
      }}
    >
      {likeState ? (
        <img src={activeLike.src} alt="active-like" />
      ) : (
        <img src={like.src} alt="like" />
      )}
    </button>
  );
};
export default LikeButton;
