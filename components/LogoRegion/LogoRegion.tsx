/* eslint-disable @next/next/no-img-element */
import styles from "./styles.module.css";
import Lithuania from "../../assets/img/regions/Lithuania.webp";
import UK from "../../assets/img/regions/UK.webp";
import { useEffect, useState } from "react";
type LogoRegionPropsType = {
  region: string;
};
const LogoRegion = ({ region }: LogoRegionPropsType) => {
  const [country, setCountry] = useState(Lithuania);
  useEffect(() => {
    if (region == "Europe/Vilnius") {
      setCountry(Lithuania);
    }
    if (region == "Europe/London") {
      setCountry(UK);
    }
  }, [region]);
  return (
    <div className={styles.main}>
      <img src={country.src} alt="country-region" />
    </div>
  );
};
export default LogoRegion;
