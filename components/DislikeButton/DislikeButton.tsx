/* eslint-disable @next/next/no-img-element */
import cookie from "js-cookie";
import styles from "./styles.module.css";
import dislike from "../../assets/img/dislike.svg";
import activeDislike from "../../assets/img/dislikeActive.svg";
import { AxiosError } from "axios";
import { LikeDislikeButtonPropsType } from "@/types";
import { updateAnswerDislikeLikeStatus } from "@/api/answer";
type DislikePropsType = LikeDislikeButtonPropsType & { dislikeState: boolean };

const DislikeButton = ({
  setDislikesAmmount,
  id,
  userIdFromToken,
  setUserDislikeIdArr,
  dislikeState,
  setDislikeState,
  userDislikeIdArr,
  userLikeIdArr,
  setUserLikeIdArr,
  setLikeState,
  setLikesAmmount,
  setShowLogModal,
}: DislikePropsType) => {
  const updateAnswerDislikeStatus = async () => {
    try {
      const token = cookie.get("jwt-token") as string;

      const body = {
        usersWhoLikedTheAnswer: userLikeIdArr.includes(userIdFromToken!)
          ? userLikeIdArr.filter((userid) => userid !== userIdFromToken!)
          : userLikeIdArr,

        usersWhoDislikedTheAnswer: userDislikeIdArr.includes(userIdFromToken!)
          ? userDislikeIdArr.filter((userid) => userid !== userIdFromToken!)
          : [...userDislikeIdArr, userIdFromToken!],
      };
      const response = await updateAnswerDislikeLikeStatus(id, body, token);
      if (response.status == 200) {
        const dislikedUsersArray =
          response.data.answer.usersWhoDislikedTheAnswer;
        const likedUsersArray = response.data.answer.usersWhoLikedTheAnswer;
        setUserDislikeIdArr(dislikedUsersArray);
        setDislikesAmmount(dislikedUsersArray.length);
        setDislikeState(dislikedUsersArray.includes(userIdFromToken!));

        setUserLikeIdArr(likedUsersArray);
        setLikeState(likedUsersArray.includes(userIdFromToken!));
        setLikesAmmount(likedUsersArray.length);
      }
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
