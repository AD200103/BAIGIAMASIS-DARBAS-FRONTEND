import { dateConvert } from "@/utils/dateAndEmail";
import styles from "./styles.module.css";
import { useTranslation } from "react-i18next";
type QCardPostedByPropsType = {
  userIdFromToken: string | undefined;
  user_id: string;
  name: string;
  date: Date;
  region: string;
};
const QCardPostedBy = ({
  userIdFromToken,
  user_id,
  name,
  date,
  region,
}: QCardPostedByPropsType) => {
  const { t } = useTranslation();
  return (
    <h4 className={styles.main}>
      <div className={styles.postedBy}>
        {t("PostedBy")}
        {userIdFromToken !== user_id ? (
          <span className={styles.userClass}>{name}</span>
        ) : (
          <span className={styles.yClass}>{t("You")}</span>
        )}
      </div>
      <>
        {t("time")}: {dateConvert(date, region)}
      </>
    </h4>
  );
};
export default QCardPostedBy;
