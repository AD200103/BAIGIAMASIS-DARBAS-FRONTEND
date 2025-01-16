export const inputValidation = (
  property: string,
  setPlaceHolder: React.Dispatch<React.SetStateAction<string>>,
  setRedAlert: React.Dispatch<React.SetStateAction<boolean>>,
  setProperty: React.Dispatch<React.SetStateAction<string>>
) => {
  setRedAlert(true);
  setPlaceHolder(`${property} is required!`);
  setProperty("");

  setTimeout(() => {
    setRedAlert(false);
    setPlaceHolder(`${property}`);
  }, 2000);
  return;
};
