export type QuestionType = {
  id: string;
  question_text: string;
  date: Date;
  user_id: string;
  email: string;
  title: string;
  name: string;
  answers: number;
};
export type AnswerType = {
  id: string;
  answer_text: string;
  date: Date;
  gained_likes_number: number;
  gained_dislikes_number: number;
  question_id: string;
  name: string;
  userId: string;
  like_status: boolean;
  usersWhoLikedTheAnswer: string[];
  usersWhoDislikedTheAnswer: string[];
};
export type TokenType = {
  id: string;
  email: string;
  name: string;
};
export type LikeDislikeButtonPropsType = {
  setLikesAmmount: React.Dispatch<React.SetStateAction<number>>;
  userIdFromToken: string | undefined;
  id: string;
  setUserDislikeIdArr: React.Dispatch<React.SetStateAction<string[]>>;
  userDislikeIdArr: string[];
  setDislikeState: React.Dispatch<React.SetStateAction<boolean>>;
  setDislikesAmmount: React.Dispatch<React.SetStateAction<number>>;
  setUserLikeIdArr: React.Dispatch<React.SetStateAction<string[]>>;
  userLikeIdArr: string[];
  setLikeState: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLogModal: React.Dispatch<React.SetStateAction<boolean>>;
};
