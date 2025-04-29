import { useTranslation } from "react-i18next";
import styles from "./style.module.css";
import { dateConvert } from "@/utils/dateAndEmail";
type AnsCardNameDateType = {
  userIdFromToken: string | null;
  date: Date;
  region: string;
  userId: string;
  name: string;
};
const AnsCardNameDate = ({
  userIdFromToken,
  date,
  region,
  userId,
  name,
}: AnsCardNameDateType) => {
  const { t } = useTranslation();
  return (
    <div className={styles.nameDate}>
      <h4>
        {t("AnsweredBy")}{" "}
        {userIdFromToken == userId ? (
          <span className={styles.youClass}>{t("You")}</span>
        ) : (
          <span className={styles.userClass}>{name}</span>
        )}
      </h4>
      <h4>
        {t("time")}: {dateConvert(date, region)}
      </h4>
    </div>
  );
};
export default AnsCardNameDate;
