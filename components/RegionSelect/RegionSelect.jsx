import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import LogoRegion from "../LogoRegion/LogoRegion";
const RegionSelect = () => {
  const router = useRouter();
  const [counties, setCountries] = useState([
    { region: "Europe/Vilnius", shortCut: "LTU" },
    { region: "Europe/London", shortCut: "UK" },
  ]);
  const [region, setRegion] = useState("" || "LTU");
  const [logoRegion, setLogoRegion] = useState("" || "Europe/Vilnius");

  useEffect(() => {
    {
      const country = localStorage.getItem("region");
      if (country == "Europe/Vilnius") {
        setRegion("LTU");
      }
      if (country == "Europe/London") {
        setRegion("UK");
      }
      setLogoRegion(country);
    }
  }, [logoRegion]);

  return (
    <div className={styles.main}>
      <ul className={styles.dropdownContainer}>
        <li>
          {region}
          <LogoRegion region={logoRegion} />
        </li>
        <div tabIndex={"0"} className={styles.countryListContainer}>
          {counties.map((country) => (
            <li
              key={country.shortCut}
              onClick={() => {
                localStorage.setItem("region", country.region);
                router.reload();
              }}
            >
              {country.shortCut}
              <LogoRegion region={country.region} />
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
};
export default RegionSelect;
