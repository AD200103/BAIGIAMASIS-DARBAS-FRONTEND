import {
  InputValidityPropsType,
  inputValidationPropsType,
  valuePropsType,
  LoginValuePropsType,
} from "@/types";
export const values = ({
  question,
  questionReq,
  questionPlaceholder,
  setQuestPLaceholder,
  setRedQuestAlert,
  setQuestion,
  title,
  titleReq,
  titlePlacholder,
  setTitlePLaceholder,
  setRedTitleAlert,
  setTitle,
}: valuePropsType) => {
  return [
    {
      value: question,
      valueReq: questionReq,
      valuePlaceHold: questionPlaceholder,
      setValPlace: setQuestPLaceholder,
      setAlert: setRedQuestAlert,
      setValue: setQuestion,
    },
    {
      value: title,
      valueReq: titleReq,
      valuePlaceHold: titlePlacholder,
      setValPlace: setTitlePLaceholder,
      setAlert: setRedTitleAlert,
      setValue: setTitle,
    },
  ];
};

export const loginValues = ({
  email,
  t,
  setEmailPLaceholder,
  setRedEmailAlert,
  setEmail,
  password,
  setPassPLaceholder,
  setRedPasAlert,
  setPassword,
}: LoginValuePropsType) => {
  return [
    {
      value: email,
      valueReq: t("emailReq"),
      valuePlaceHold: t("email"),
      setValPlace: setEmailPLaceholder,
      setAlert: setRedEmailAlert,
      setValue: setEmail,
    },
    {
      value: password,
      valueReq: t("passwordReq"),
      valuePlaceHold: t("password"),
      setValPlace: setPassPLaceholder,
      setAlert: setRedPasAlert,
      setValue: setPassword,
    },
  ];
};

export const inputValidation = ({
  property,
  propertyTwo,
  setPlaceHolder,
  setRedAlert,
  setProperty,
}: inputValidationPropsType) => {
  setRedAlert(true);
  setPlaceHolder(`${property}`);
  setProperty("");

  setTimeout(() => {
    setRedAlert(false);
    setPlaceHolder(`${propertyTwo}`);
  }, 2000);
  return;
};

export const inputValidity = (
  valuesForErrorCase: InputValidityPropsType[],
  setLoaderVis: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const matchTrue = valuesForErrorCase.find((c) => c.value.trim() == "");
  if (matchTrue) {
    setLoaderVis(false);
  }
  for (let i = 0; i <= valuesForErrorCase.length - 1; i++) {
    if (
      !valuesForErrorCase[i].value ||
      valuesForErrorCase[i].value.trim() == ""
    ) {
      inputValidation({
        property: valuesForErrorCase[i].valueReq,
        propertyTwo: valuesForErrorCase[i].valuePlaceHold,
        setPlaceHolder: valuesForErrorCase[i].setValPlace,
        setRedAlert: valuesForErrorCase[i].setAlert,
        setProperty: valuesForErrorCase[i].setValue,
      });
    }
  }
};
