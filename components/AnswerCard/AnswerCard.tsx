import cookie from "js-cookie";
import axios from "axios";
import styles from "./styles.module.css";
import { dateConvert } from "@/utils/dateAndEmail";
import { decodeToken, checkingAuth } from "@/utils/jwtTokenDecoded";
import { AnswerType } from "@/types";
import { useEffect, useState } from "react";
import LikeButton from "../LikeButton/LikeButton";
import DislikeButton from "../DislikeButton/DislikeButton";
type AnswerCardPropsType = {
  answer: string;
  date: Date;
  id: string;
  name: string;
  userId: string;
  likes: number;
  dislikes: number;
  likeStatus: boolean;
  usersWhoLikedTheAnswer: string[];
  usersWhoDislikedTheAnswer: string[];
  setAnswers: React.Dispatch<React.SetStateAction<AnswerType[] | null>>;
};

const AnswerCard = ({
  answer,
  date,
  name,
  id,
  userId,
  usersWhoLikedTheAnswer,
  usersWhoDislikedTheAnswer,
  setAnswers,
}: AnswerCardPropsType) => {
  const [token, setToken] = useState(cookie.get("jwt-token"));
  const userIdFromToken = decodeToken(token!);

  const [userLikeIdArr, setUserLikeIdArr] = useState(usersWhoLikedTheAnswer);
  const [likeState, setLikeState] = useState(
    userLikeIdArr.includes(userIdFromToken!)
  );
  const [likesAmmount, setLikesAmmount] = useState(
    usersWhoLikedTheAnswer.length
  );

  const [userDislikeIdArr, setUserDislikeIdArr] = useState(
    usersWhoDislikedTheAnswer
  );
  const [dislikeState, setDislikeState] = useState(
    userDislikeIdArr.includes(userIdFromToken!)
  );
  const [dislikesAmmount, setDislikesAmmount] = useState(
    usersWhoDislikedTheAnswer.length
  );

  useEffect(() => {
    if (token) {
      checkingAuth(token, setToken);
    }
  }, [token]);

  const deleteAnswer = async () => {
    const headers = { authorization: cookie.get("jwt-token") };
    try {
      const response = await axios.delete(
        `http://localhost:3002/answer/${id}`,
        { headers }
      );
      if (response.status == 200) {
        setAnswers((prev) => prev!.filter((a) => a.id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.main}>
      <p>{answer}</p>
      <div>
        <p>{dateConvert(date)}, UTC+00</p>
        {userIdFromToken == userId ? <p>You</p> : <p>{name}</p>}
      </div>
      <div>
        <div className={styles.likes}>
          {userIdFromToken !== userId ? (
            <LikeButton
              setLikesAmmount={setLikesAmmount}
              id={id}
              userIdFromToken={userIdFromToken!}
              usersWhoLikedTheAnswer={usersWhoLikedTheAnswer}
              setUserDislikeIdArr={setUserDislikeIdArr}
              userDislikeIdArr={userDislikeIdArr}
              dislikeState={dislikeState}
              setDislikeState={setDislikeState}
              setUserLikeIdArr={setUserLikeIdArr}
              userLikeIdArr={userLikeIdArr}
              likeState={likeState}
              setLikeState={setLikeState}
              setDislikesAmmount={setDislikesAmmount}
            />
          ) : (
            <button>Like</button>
          )}
          <p>Likes:{likesAmmount}</p>
        </div>
        <div className={styles.likes}>
          {userIdFromToken !== userId ? (
            <DislikeButton
              setDislikesAmmount={setDislikesAmmount}
              id={id}
              userIdFromToken={userIdFromToken!}
              usersWhoDislikedTheAnswer={usersWhoDislikedTheAnswer}
              setUserDislikeIdArr={setUserDislikeIdArr}
              userDislikeIdArr={userDislikeIdArr}
              dislikeState={dislikeState}
              setDislikeState={setDislikeState}
              setUserLikeIdArr={setUserLikeIdArr}
              userLikeIdArr={userLikeIdArr}
              likeState={likeState}
              setLikeState={setLikeState}
              setLikesAmmount={setLikesAmmount}
            />
          ) : (
            <button>Like</button>
          )}
          <p>Dislikes:{dislikesAmmount}</p>
        </div>
      </div>
      {userIdFromToken == userId ? (
        <button onClick={deleteAnswer}>Delete</button>
      ) : (
        <></>
      )}
    </div>
  );
};
export default AnswerCard;
