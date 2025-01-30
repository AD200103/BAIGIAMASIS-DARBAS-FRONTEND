import React from "react";

type RegionSelectPropsType = {
  country: string;
  setLogoRegion: React.Dispatch<React.SetStateAction<string>>;
  setRegion: React.Dispatch<React.SetStateAction<string>>;
};
export const regionSelect = ({
  country,
  setLogoRegion,
  setRegion,
}: RegionSelectPropsType) => {
  if (country == "Europe/Vilnius") {
    setRegion("LTU");
  }
  if (country == "Europe/London") {
    setRegion("UK");
  }
  return setLogoRegion(country);
};
