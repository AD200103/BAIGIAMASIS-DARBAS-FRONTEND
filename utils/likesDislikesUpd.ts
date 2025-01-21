type BodyType = {
  pressed: string;
};
const updateLikesDislikes = (
  body: BodyType,
  userIdFromToken: string | undefined,
  setUserDislikeIdArr: React.Dispatch<React.SetStateAction<string[]>>,
  setUserLikeIdArr: React.Dispatch<React.SetStateAction<string[]>>,
  setDislikesAmmount: React.Dispatch<React.SetStateAction<number>>,
  setLikesAmmount: React.Dispatch<React.SetStateAction<number>>,
  userLikeIdArr: string[],
  userDislikeIdArr: string[]
) => {
  if (body.pressed == "like pressed") {
    if (userLikeIdArr.includes(userIdFromToken!)) {
      setUserLikeIdArr((prev) => prev.filter((p) => p !== userIdFromToken));
    } else {
      setUserLikeIdArr((prev) => [...prev, userIdFromToken!]);
    }
    setLikesAmmount(userLikeIdArr.length);
    if (userDislikeIdArr.includes(userIdFromToken!)) {
      setUserDislikeIdArr((prev) => prev.filter((p) => p !== userIdFromToken));
    } else {
      setUserDislikeIdArr(userDislikeIdArr);
    }
    setDislikesAmmount(userDislikeIdArr.length);
    return;
  }
  if (body.pressed == "dislike pressed") {
    if (userDislikeIdArr.includes(userIdFromToken!)) {
      setUserDislikeIdArr((prev) => prev.filter((p) => p !== userIdFromToken));
    } else {
      setUserDislikeIdArr((prev) => [...prev, userIdFromToken!]);
    }
    setDislikesAmmount(userDislikeIdArr.length);
    if (userLikeIdArr.includes(userIdFromToken!)) {
      setUserLikeIdArr((prev) => prev.filter((p) => p !== userIdFromToken));
    } else {
      setUserLikeIdArr(userLikeIdArr);
    }
    setLikesAmmount(userLikeIdArr.length);
    return;
  }
};
export default updateLikesDislikes;

// const updateLikeDislike = (req, findAnswerToUpdate) => {
//     if (req.body.pressed == "dislike pressed") {
//       const body = {
//         usersWhoDislikedTheAnswer:
//           findAnswerToUpdate.usersWhoDislikedTheAnswer.includes(req.body.userId)
//             ? findAnswerToUpdate.usersWhoDislikedTheAnswer.filter(
//                 (id) => id !== req.body.userId
//               )
//             : [...findAnswerToUpdate.usersWhoDislikedTheAnswer, req.body.userId],
//         usersWhoLikedTheAnswer:
//           findAnswerToUpdate.usersWhoLikedTheAnswer.includes(req.body.userId)
//             ? findAnswerToUpdate.usersWhoLikedTheAnswer.filter(
//                 (id) => id !== req.body.userId
//               )
//             : findAnswerToUpdate.usersWhoLikedTheAnswer,
//       };
//       return body;
//     }
//     if (req.body.pressed == "like pressed") {
//       const body = {
//         usersWhoLikedTheAnswer:
//           findAnswerToUpdate.usersWhoLikedTheAnswer.includes(req.body.userId)
//             ? findAnswerToUpdate.usersWhoLikedTheAnswer.filter(
//                 (id) => id !== req.body.userId
//               )
//             : [...findAnswerToUpdate.usersWhoLikedTheAnswer, req.body.userId],
//         usersWhoDislikedTheAnswer:
//           findAnswerToUpdate.usersWhoDislikedTheAnswer.includes(req.body.userId)
//             ? findAnswerToUpdate.usersWhoDislikedTheAnswer.filter(
//                 (id) => id !== req.body.userId
//               )
//             : findAnswerToUpdate.usersWhoDislikedTheAnswer,
//       };
//       return body;
//     }
//   };
//   export default updateLikeDislike;
