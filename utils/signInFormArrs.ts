import { Dispatch, SetStateAction } from "react";
export const getInputArrProps = ({
  name,
  setName,
  redNameAlert,
  namePlacholder,
  email,
  setEmail,
  redEmailAlert,
  emailPlaceholder,
  password,
  setPassword,
  redPasAlert,
  passwordPlacholder,
}: {
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
}) => {
  return [
    {
      key: 1,
      redAlert: redNameAlert || redNameAlert,
      value: name,
      maxLength: 20,
      type: "text",
      placeholder: namePlacholder,
      onChangeFunction: setName,
    },
    {
      key: 2,
      redAlert: redEmailAlert,
      value: email,
      maxLength: 60,
      type: "text",
      placeholder: emailPlaceholder,
      onChangeFunction: setEmail,
    },
    {
      key: 3,
      redAlert: redPasAlert,
      value: password,
      maxLength: 20,
      type: "password",
      placeholder: passwordPlacholder,
      onChangeFunction: setPassword,
    },
  ];
};

export const getInputFields = ({
  name,
  email,
  password,
  t,
  setNamePLaceholder,
  setEmailPLaceholder,
  setPassPLaceholder,
  setRedNameAlert,
  setRedEmailAlert,
  setRedPasAlert,
  setName,
  setEmail,
  setPassword,
}: {
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
}) => {
  return [
    {
      inputVal: name,
      required: t("signNameReq"),
      input: t("Name"),
      setPlaceHolder: setNamePLaceholder,
      setRedAlert: setRedNameAlert,
      setInput: setName,
    },
    {
      inputVal: email,
      required: t("signEmailReq"),
      input: t("Email"),
      setPlaceHolder: setEmailPLaceholder,
      setRedAlert: setRedEmailAlert,
      setInput: setEmail,
    },
    {
      inputVal: password,
      required: t("signPassReq"),
      input: t("Password"),
      setPlaceHolder: setPassPLaceholder,
      setRedAlert: setRedPasAlert,
      setInput: setPassword,
    },
  ];
};
