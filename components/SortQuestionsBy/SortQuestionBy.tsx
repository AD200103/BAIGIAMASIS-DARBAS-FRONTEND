import React, { SetStateAction } from "react";
import styles from "./styles.module.css";
import { useTranslation } from "react-i18next";
type SortQuestionsByPropType = {
  setSortVal: React.Dispatch<SetStateAction<string>>;
};
const SortQuestionsBy = ({ setSortVal }: SortQuestionsByPropType) => {
  const { t } = useTranslation();
  return (
    <div className={styles.dropdownContainer}>
      <p>{t("SortQuestionsBy")}:</p>
      <select
        className={styles.dropdown}
        onChange={(e) => setSortVal(e.target.value)}
      >
        <option value="All">{t("All")}</option>
        <option value="Answered">{t("Answered")}</option>
        <option value="Unanswered">{t("Unanswered")}</option>
      </select>
    </div>
  );
};
export default SortQuestionsBy;
