export const inputValidation = (
  property: string,
  propertyTwo: string,
  setPlaceHolder: React.Dispatch<React.SetStateAction<string>>,
  setRedAlert: React.Dispatch<React.SetStateAction<boolean>>,
  setProperty: React.Dispatch<React.SetStateAction<string>>
) => {
  setRedAlert(true);
  setPlaceHolder(`${property}`);
  setProperty("");

  setTimeout(() => {
    setRedAlert(false);
    setPlaceHolder(`${propertyTwo}`);
  }, 2000);
  return;
};
