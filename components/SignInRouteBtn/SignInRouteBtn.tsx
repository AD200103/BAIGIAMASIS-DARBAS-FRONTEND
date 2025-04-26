import { useRouter } from "next/router";
import styles from "./styles.module.css";
import { useTranslation } from "react-i18next";
type SignInRouteBtnPropsType = {
  setLoaderVis: React.Dispatch<React.SetStateAction<boolean>>;
  signIn: string;
};
const SignInRouteBtn = ({ setLoaderVis, signIn }: SignInRouteBtnPropsType) => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <div className={styles.signInProps}>
      <p>{t("NotMember")}</p>
      <p
        className={styles.signInText}
        onClick={() => {
          setLoaderVis(true);
          router.push("/signin");
        }}
      >
        {signIn}
      </p>
    </div>
  );
};
export default SignInRouteBtn;
