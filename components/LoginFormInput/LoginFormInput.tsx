import { Dispatch, SetStateAction } from "react";
import styles from "./styles.module.css";
type LoginInputPropsType = {
  email: string;
  redEmailAlert: boolean;
  emailPlaceholder: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  redPasAlert: boolean;
  passwordPlacholder: string;
  setPassword: Dispatch<SetStateAction<string>>;
};
const LoginFormInputs = ({
  email,
  redEmailAlert,
  emailPlaceholder,
  setEmail,
  redPasAlert,
  password,
  passwordPlacholder,
  setPassword,
}: LoginInputPropsType) => {
  const values = [
    {
      value: email,
      maxLenght: 60,
      type: "text",
      placeHolder: emailPlaceholder,
      setValue: setEmail,
      alert: redEmailAlert,
    },
    {
      value: password,
      maxLenght: 30,
      type: "password",
      placeHolder: passwordPlacholder,
      setValue: setPassword,
      alert: redPasAlert,
    },
  ];
  return (
    <>
      {values.map((v) => (
        <input
          key={v.maxLenght}
          className={`${styles.input} ${v.alert && styles.redAlert}`}
          value={v.value}
          maxLength={v.maxLenght}
          type={v.type}
          placeholder={v.placeHolder}
          onChange={(e) => v.setValue(e.target.value)}
        />
      ))}
    </>
  );
};
export default LoginFormInputs;
