import { Dispatch, SetStateAction } from "react";

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
  exp: number;
};
export type LikeDislikeButtonPropsType = {
  userIdFromToken: string | undefined;
  id: string;
  setUserDislikeIdArr: React.Dispatch<React.SetStateAction<string[]>>;
  userDislikeIdArr: string[];
  setDislikeState: React.Dispatch<React.SetStateAction<boolean>>;
  setUserLikeIdArr: React.Dispatch<React.SetStateAction<string[]>>;
  userLikeIdArr: string[];
  setLikeState: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLogModal: React.Dispatch<React.SetStateAction<boolean>>;
};
export type DataType = {
  message: string;
};
export type BodyType = {
  pressed: string;
};
export type InputValidityPropsType = {
  value: string;
  valueReq: string;
  valuePlaceHold: string;
  setValPlace: React.Dispatch<React.SetStateAction<string>>;
  setAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};
export type inputValidationPropsType = {
  property: string;
  propertyTwo: string;
  setPlaceHolder: React.Dispatch<React.SetStateAction<string>>;
  setRedAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setProperty: React.Dispatch<React.SetStateAction<string>>;
};
export type valuePropsType = {
  question: string;
  questionReq: string;
  questionPlaceholder: string;
  setQuestPLaceholder: Dispatch<SetStateAction<string>>;
  setRedQuestAlert: Dispatch<SetStateAction<boolean>>;
  setQuestion: Dispatch<SetStateAction<string>>;
  title: string;
  titleReq: string;
  titlePlacholder: string;
  setTitlePLaceholder: Dispatch<SetStateAction<string>>;
  setRedTitleAlert: Dispatch<SetStateAction<boolean>>;
  setTitle: Dispatch<SetStateAction<string>>;
};
export type GetInputArrPropsType = {
  name: string;
  setName: (val: string) => void;
  redNameAlert: boolean;
  namePlacholder: string;
  email: string;
  setEmail: (val: string) => void;
  redEmailAlert: boolean;
  emailPlaceholder: string;
  password: string;
  setPassword: (val: string) => void;
  redPasAlert: boolean;
  passwordPlacholder: string;
};
export type GetInputFieldsType = {
  name: string;
  email: string;
  password: string;
  t: (key: string) => string;
  setNamePLaceholder: Dispatch<SetStateAction<string>>;
  setEmailPLaceholder: Dispatch<SetStateAction<string>>;
  setPassPLaceholder: Dispatch<SetStateAction<string>>;
  setRedNameAlert: Dispatch<SetStateAction<boolean>>;
  setRedEmailAlert: Dispatch<SetStateAction<boolean>>;
  setRedPasAlert: Dispatch<SetStateAction<boolean>>;
  setName: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
};
export type LoginValuePropsType = {
  email: string;
  t: (key: string) => string;
  setEmailPLaceholder: Dispatch<SetStateAction<string>>;
  setRedEmailAlert: Dispatch<SetStateAction<boolean>>;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassPLaceholder: Dispatch<SetStateAction<string>>;
  setRedPasAlert: Dispatch<SetStateAction<boolean>>;
  setPassword: Dispatch<SetStateAction<string>>;
};
export type SignInCheckEmailType = {
  t: (val: string) => string;
  setLoaderVis: Dispatch<SetStateAction<boolean>>;
  setErrorMsg: Dispatch<SetStateAction<string>>;
  setRedEmailAlert: Dispatch<SetStateAction<boolean>>;
};
