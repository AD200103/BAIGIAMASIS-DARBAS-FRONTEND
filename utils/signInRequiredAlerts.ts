import { Dispatch, SetStateAction } from "react";
import { inputValidation } from "./inputValidation";
type inputFieldPropsType = {
  inputVal: string;
  required: string;
  input: string;
  setPlaceHolder: Dispatch<SetStateAction<string>>;
  setRedAlert: Dispatch<SetStateAction<boolean>>;
  setInput: Dispatch<SetStateAction<string>>;
};
type signInRequiredAlertsPropsType = {
  inputFields: inputFieldPropsType[];
  setLoaderVis: Dispatch<SetStateAction<boolean>>;
};
const signInRequiredAlerts = ({
  inputFields,
  setLoaderVis,
}: signInRequiredAlertsPropsType) => {
  for (let i = 0; i <= inputFields.length - 1; i++) {
    if (!inputFields[i].inputVal || inputFields[i].inputVal.trim() == "") {
      setLoaderVis(false);
      inputValidation(
        inputFields[i].required,
        inputFields[i].input,
        inputFields[i].setPlaceHolder,
        inputFields[i].setRedAlert,
        inputFields[i].setInput
      );
    }
  }
};

export default signInRequiredAlerts;
