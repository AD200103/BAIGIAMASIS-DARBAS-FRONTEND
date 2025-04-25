import { DataType } from "@/types";
import { AxiosError } from "axios";
type inputErrMsgType = {
  msg: string;
  errMsg: string;
  redNameAlertState: boolean;
  redEmailAlertState: boolean;
};
type signErrFuncPropsType = {
  setLoaderVis: React.Dispatch<React.SetStateAction<boolean>>;
  error: AxiosError;
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
  setRedNameAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setRedEmailAlert: React.Dispatch<React.SetStateAction<boolean>>;
  inputErrMsg: inputErrMsgType[];
};
const signErrFunc = ({
  setLoaderVis,
  error,
  setErrorMsg,
  setRedNameAlert,
  setRedEmailAlert,
  inputErrMsg,
}: signErrFuncPropsType) => {
  setLoaderVis(false);
  const data = error.response!.data as DataType;
  const msg = data.message;
  for (let i = 0; i <= inputErrMsg.length - 1; i++) {
    if (msg == inputErrMsg[i].msg) {
      setErrorMsg(inputErrMsg[i].errMsg);
      setRedNameAlert(inputErrMsg[i].redNameAlertState);
      setRedEmailAlert(inputErrMsg[i].redEmailAlertState);
    }
  }
  setTimeout(() => {
    setErrorMsg("");
    setRedEmailAlert(false);
    setRedNameAlert(false);
  }, 2000);
};
export default signErrFunc;
