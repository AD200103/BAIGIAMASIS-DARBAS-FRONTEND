import styles from "./styles.module.css";
import { useRouter } from "next/router";
const RegionSelect = () => {
  const router = useRouter();
  return (
    <div className={styles.main}>
      <div className={styles.dropdownContainer}>
        <p>Select region:</p>
        <select
          className={styles.dropdown}
          onChange={(e) => {
            localStorage.setItem("region", e.target.value);
            router.reload();
          }}
        >
          <option value="">------</option>
          <option value="Europe/Vilnius">Lithuania</option>
          <option value="Europe/London">England</option>
        </select>
      </div>
    </div>
  );
};
export default RegionSelect;
