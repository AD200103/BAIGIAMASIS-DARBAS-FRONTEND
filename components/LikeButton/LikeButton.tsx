/* eslint-disable @next/next/no-img-element */
import styles from "./styles.module.css";
import like from "../../assets/img/like.svg";
import activeLike from "../../assets/img/likeActive.svg";
const LikeButton = ({
  likeState,
  userLikeIdArr,
  setUserLikeIdArr,
  setLikesAmmount,
  setLikeState,
  updateAnswerLikeStatus,
}) => {
  return (
    <button
      className={styles.main}
      onClick={() => {
        updateAnswerLikeStatus(
          userLikeIdArr,
          setUserLikeIdArr,
          setLikesAmmount,
          setLikeState
        );
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
