/* eslint-disable @next/next/no-img-element */
import cookie from "js-cookie";
import axios, { AxiosError } from "axios";
import styles from "./styles.module.css";
import { dateConvert } from "@/utils/dateAndEmail";
import { decodeToken, checkingAuth } from "@/utils/jwtTokenDecoded";
import { AnswerType } from "@/types";
import { useEffect, useState } from "react";
import LikeButton from "../LikeButton/LikeButton";

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
  setAnswers: React.Dispatch<React.SetStateAction<AnswerType[] | null>>;
};

const AnswerCard = ({
  answer,
  date,
  name,
  id,
  userId,
  usersWhoLikedTheAnswer,
  setAnswers,
}: AnswerCardPropsType) => {
  const [token, setToken] = useState(cookie.get("jwt-token"));
  const userIdFromToken = decodeToken(token!);

  const [likesAmmount, setLikesAmmount] = useState(
    usersWhoLikedTheAnswer.length
  );
  const [userLikeIdArr, setUserLikeIdArr] = useState(usersWhoLikedTheAnswer);
  const [likeState, setLikeState] = useState(
    userLikeIdArr.includes(userIdFromToken!)
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

  const updateAnswerLikeStatus = async (
    userLikeIdArr: string[],
    setUserLikeIdArr: React.Dispatch<React.SetStateAction<string[]>>,
    setLikesAmmount: React.Dispatch<React.SetStateAction<number>>,
    setLikeState: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      const headers = { authorization: cookie.get("jwt-token") };

      const body = {
        usersWhoLikedTheAnswer: userLikeIdArr.includes(userIdFromToken!)
          ? userLikeIdArr.filter((userid) => userid !== userIdFromToken!)
          : [...userLikeIdArr, userIdFromToken!],
      };

      const response = await axios.put(
        `http://localhost:3002/answer/${id}`,
        body,
        {
          headers,
        }
      );

      if (response.status == 200) {
        const usersArray = response.data.answer.usersWhoLikedTheAnswer;
        setUserLikeIdArr(usersArray);
        setLikesAmmount(usersArray.length);

        if (usersArray.includes(userIdFromToken!)) {
          setLikeState(true);
        }
        if (!usersArray.includes(userIdFromToken!)) {
          setLikeState(false);
        }
      }
    } catch (err: unknown) {
      const error = err as AxiosError;
      if (error.status == 403) {
        console.log(err);
      }
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
              likeState={likeState}
              userLikeIdArr={userLikeIdArr}
              setUserLikeIdArr={setUserLikeIdArr}
              setLikesAmmount={setLikesAmmount}
              setLikeState={setLikeState}
              updateAnswerLikeStatus={updateAnswerLikeStatus}
            />
          ) : (
            <button>Like</button>
          )}
          <p>Likes:{likesAmmount}</p>
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
