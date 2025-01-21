type BodyType = {
  pressed: string;
};
const updateLikesDislikes = (
  body: BodyType,
  userIdFromToken: string | undefined,
  setUserDislikeIdArr: React.Dispatch<React.SetStateAction<string[]>>,
  setUserLikeIdArr: React.Dispatch<React.SetStateAction<string[]>>,
  userLikeIdArr: string[],
  userDislikeIdArr: string[]
) => {
  if (body.pressed == "like pressed") {
    if (userLikeIdArr.includes(userIdFromToken!)) {
      setUserLikeIdArr((prev) => prev.filter((p) => p !== userIdFromToken));
    }
    if (!userLikeIdArr.includes(userIdFromToken!)) {
      setUserLikeIdArr((prev) => [...prev, userIdFromToken!]);
    }
    if (userDislikeIdArr.includes(userIdFromToken!)) {
      setUserDislikeIdArr((prev) => prev.filter((p) => p !== userIdFromToken));
    }
    if (!userDislikeIdArr.includes(userIdFromToken!)) {
      setUserDislikeIdArr(userDislikeIdArr);
    }
    return;
  }
  if (body.pressed == "dislike pressed") {
    if (userDislikeIdArr.includes(userIdFromToken!)) {
      setUserDislikeIdArr((prev) => prev.filter((p) => p !== userIdFromToken));
    }
    if (!userDislikeIdArr.includes(userIdFromToken!)) {
      setUserDislikeIdArr((prev) => [...prev, userIdFromToken!]);
    }
    if (userLikeIdArr.includes(userIdFromToken!)) {
      setUserLikeIdArr((prev) => prev.filter((p) => p !== userIdFromToken));
    }
    if (!userLikeIdArr.includes(userIdFromToken!)) {
      setUserLikeIdArr(userLikeIdArr);
    }
    return;
  }
};
export default updateLikesDislikes;
