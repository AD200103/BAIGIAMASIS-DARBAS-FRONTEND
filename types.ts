export type QuestionType = {
  id: string;
  question_text: string;
  date: Date;
  user_id: string;
  email: string;
  title: string;
};
export type AnswerType = {
  id: string;
  answer_text: string;
  date: Date;
  gained_likes_number: number;
  gained_dislikes_number: number;
  question_id: string;
  email: string;
};
