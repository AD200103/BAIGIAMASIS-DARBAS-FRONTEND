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
  userDislikeIdArr: string[],
  likesAmmount: number
) => {
  if (body.pressed == "like pressed") {
    if (userLikeIdArr.includes(userIdFromToken!)) {
      setUserLikeIdArr((prev) => prev.filter((p) => p !== userIdFromToken));
    }
    setLikesAmmount(userLikeIdArr.length);
    if (!userLikeIdArr.includes(userIdFromToken!)) {
      setUserLikeIdArr((prev) => [...prev, userIdFromToken!]);
    }
    setLikesAmmount(userLikeIdArr.length);
    if (userDislikeIdArr.includes(userIdFromToken!)) {
      setUserDislikeIdArr((prev) => prev.filter((p) => p !== userIdFromToken));
      setDislikesAmmount(userDislikeIdArr.length);
    }
    if (!userDislikeIdArr.includes(userIdFromToken!)) {
      setUserDislikeIdArr(userDislikeIdArr);
      setDislikesAmmount(userDislikeIdArr.length);
    }
    console.log(userLikeIdArr);
    console.log(likesAmmount);
    return;
  }
  if (body.pressed == "dislike pressed") {
    if (userDislikeIdArr.includes(userIdFromToken!)) {
      setUserDislikeIdArr((prev) => prev.filter((p) => p !== userIdFromToken));
      setDislikesAmmount(userDislikeIdArr.length);
    }
    if (!userDislikeIdArr.includes(userIdFromToken!)) {
      setUserDislikeIdArr((prev) => [...prev, userIdFromToken!]);
      setDislikesAmmount(userDislikeIdArr.length);
    }
    if (userLikeIdArr.includes(userIdFromToken!)) {
      setUserLikeIdArr((prev) => prev.filter((p) => p !== userIdFromToken));
      setLikesAmmount(userLikeIdArr.length);
    }
    if (!userLikeIdArr.includes(userIdFromToken!)) {
      setUserLikeIdArr(userLikeIdArr);
      setLikesAmmount(userLikeIdArr.length);
    }
    return;
  }
};
export default updateLikesDislikes;
