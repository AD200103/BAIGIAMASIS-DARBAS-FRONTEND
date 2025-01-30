import styles from "./styles.module.css";
import LogoRegion from "../LogoRegion/LogoRegion";
import { useRouter } from "next/router";

const DropdownRegionCont = () => {
  const router = useRouter();
  const countries = [
    { region: "Europe/Vilnius", shortCut: "LTU" },
    { region: "Europe/London", shortCut: "UK" },
  ];
  return (
    <div className={styles.regionContainer}>
      {countries.map((country) => (
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
  );
};
export default DropdownRegionCont;
