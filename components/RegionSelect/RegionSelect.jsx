import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import LogoRegion from "../LogoRegion/LogoRegion";
const RegionSelect = () => {
  const router = useRouter();
  const [region, setRegion] = useState("");
  useEffect(() => {
    {
      const country = localStorage.getItem("region");
      if (country == "Europe/Vilnius") {
        setRegion("LTU");
      }
      if (country == "Europe/London") {
        setRegion("UK");
      }
    }
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.dropdownContainer}>
        <select
          className={styles.dropdown}
          onChange={(e) => {
            localStorage.setItem("region", e.target.value);
            router.reload();
          }}
        >
          <option className={styles.optionOne} value="">
            {region}
          </option>
          <option value="Europe/Vilnius">LTU</option>
          <option value="Europe/London">UK</option>
        </select>
        <LogoRegion />
      </div>
    </div>
  );
};
export default RegionSelect;
