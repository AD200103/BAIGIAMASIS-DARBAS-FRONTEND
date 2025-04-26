import {
  InputValidityPropsType,
  inputValidationPropsType,
  valuePropsType,
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

const inputValidation = ({
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
