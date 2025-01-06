// import jwt from "jsonwebtoken";
// import cookie from "js-cookie";
import "dotenv/config";
export const dateConvert = (date: Date) => {
  const dateFixed = date
    .toString()
    .replace(/[TZ]/g, " ")
    .slice(0, date.toString().length - 5);
  return dateFixed;
};
export const emailConvert = (email: string) => {
  const newEmail = email.replace("gmail.com", "");
  return newEmail;
};

// const tokenGet = cookie.get("jwt-token");
// console.log(tokenGet);
// export const tokenG = (token: string) => {
//   const getToken = token;

//   jwt.verify(
//     getToken,
//     "kweofkweofkweoifewifmewiofmewmfokwemckemokc",
//     (err, decoded) => {
//       if (err) {
//         console.log(err);
//       }
//       console.log(decoded);
//     }
//   );
// };
// tokenG(tokenGet);
