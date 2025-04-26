import { DataType } from "@/types";
import { AxiosError } from "axios";

type signErrFuncPropsType = {
  setLoaderVis: React.Dispatch<React.SetStateAction<boolean>>;
  error: AxiosError;
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
  setRedNameAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setRedEmailAlert: React.Dispatch<React.SetStateAction<boolean>>;
  t: (val: string) => string;
};
const inputErrMsg = [
  {
    msg: "Username already exists!",
    errMsg: "singUsrnExists",
    redNameAlertState: true,
    redEmailAlertState: false,
  },
  {
    msg: "Email and username already exists!",
    errMsg: "singUsrnEmailExists",
    redNameAlertState: true,
    redEmailAlertState: true,
  },
  {
    msg: "Email already exists!",
    errMsg: "singEmailExists",
    redNameAlertState: false,
    redEmailAlertState: true,
  },
];
const signErrFunc = ({
  setLoaderVis,
  error,
  setErrorMsg,
  setRedNameAlert,
  setRedEmailAlert,
  t,
}: signErrFuncPropsType) => {
  setLoaderVis(false);
  const data = error.response!.data as DataType;
  const msg = data.message;
  const match = inputErrMsg.find((m) => m.msg == msg);
  if (match) {
    setErrorMsg(t(match.errMsg));
    setRedNameAlert(match.redNameAlertState);
    setRedEmailAlert(match.redEmailAlertState);
  }

  setTimeout(() => {
    setErrorMsg("");
    setRedEmailAlert(false);
    setRedNameAlert(false);
  }, 2000);
};
export default signErrFunc;
