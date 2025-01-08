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
};
export type TokenType = {
  id: string;
  email: string;
  name: string;
};
