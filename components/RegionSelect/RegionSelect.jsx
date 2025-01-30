import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import LogoRegion from "../LogoRegion/LogoRegion";
import DropdownRegionCont from "../DropdownRegionCont/DropdownRegionCont";
import { regionSelect } from "@/utils/regionSetting";

const RegionSelect = () => {
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
      regionSelect({ country, setLogoRegion, setRegion });
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
        <DropdownRegionCont />
      </ul>
    </div>
  );
};
export default RegionSelect;
