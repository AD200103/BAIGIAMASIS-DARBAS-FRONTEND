import styles from "./styles.module.css";
type BurgerModalPropsType = {
  showBurgerModal: boolean;
};
const BurgerModal = ({ showBurgerModal }: BurgerModalPropsType) => {
  return (
    <div
      className={`${styles.burgerModal} ${
        showBurgerModal && styles.burgerModalShow
      }`}
    ></div>
  );
};
export default BurgerModal;
