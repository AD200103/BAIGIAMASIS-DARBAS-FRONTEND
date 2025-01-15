export const signinValidation = (property, setPlaceHolder, setRedAlert) => {
  setRedAlert(true);
  setPlaceHolder(`${property} is required!`);
  setTimeout(() => {
    setRedAlert(false);
    setPlaceHolder(`${property}`);
  }, 2000);
  return;
};
