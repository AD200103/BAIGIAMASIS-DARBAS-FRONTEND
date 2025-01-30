import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import LogoRegion from "../LogoRegion/LogoRegion";
const RegionSelect = () => {
  const router = useRouter();
  const [counties, setCountries] = useState([
    { region: "Europe/Vilnius", shortCut: "LTU" },
    { region: "Europe/London", shortCut: "UK" },
  ]);
  const [showReg, setShowReg] = useState(false);
  const [region, setRegion] = useState("" || "LTU");
  const [logoRegion, setLogoRegion] = useState("" || "Europe/Vilnius");
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowReg(false);
    }
  };
  useEffect(() => {
    {
      const country = sessionStorage.getItem("region");
      if (country == "Europe/Vilnius") {
        setRegion("LTU");
      }
      if (country == "Europe/London") {
        setRegion("UK");
      }
      setLogoRegion(country);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [logoRegion]);

  return (
    <div ref={dropdownRef} className={styles.main}>
      <ul
        tabIndex={"0"}
        className={`${styles.dropdownContainer} ${showReg && styles.showReg}`}
      >
        <li onClick={() => setShowReg(!showReg)} className={styles.logoRegion}>
          {region}
          <LogoRegion region={logoRegion} />
        </li>
        <div className={styles.regionContainer}>
          {counties.map((country) => (
            <li
              key={country.shortCut}
              onClick={() => {
                sessionStorage.setItem("region", country.region);
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
