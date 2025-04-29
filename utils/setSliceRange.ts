type FuncPropType = {
  setSliceStart: React.Dispatch<React.SetStateAction<number>>;
  setSliceEnd: React.Dispatch<React.SetStateAction<number>>;
};
const setSliceRange = ({ setSliceStart, setSliceEnd }: FuncPropType) => {
  if (window.innerWidth <= 798) {
    setSliceStart(0);
    setSliceEnd(3);
  }
  if (window.innerWidth > 798) {
    setSliceStart(0);
    setSliceEnd(5);
  }
};
export default setSliceRange;
