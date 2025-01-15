import styles from "./styles.module.css";
import LoginForm from "../LoginForm/LoginForm";
import React from "react";
type LoginModalProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
};
const LoginModal = ({ showModal, setShowModal, message }: LoginModalProps) => {
  return (
    <div className={`${styles.modal} ${showModal && styles.showModal}`}>
      <LoginForm message={message} setShowModal={setShowModal} />
    </div>
  );
};
export default LoginModal;
