import { BodyType } from "@/types";
const updateLikesDislikes = (
  body: BodyType,
  userIdFromToken: string | undefined,
  setUserDislikeIdArr: React.Dispatch<React.SetStateAction<string[]>>,
  setUserLikeIdArr: React.Dispatch<React.SetStateAction<string[]>>,
  userLikeIdArr: string[],
  userDislikeIdArr: string[],
  setLikeState: React.Dispatch<React.SetStateAction<boolean>>,
  setDislikeState: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (body.pressed == "like pressed") {
    setDislikeState(false);
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
    setLikeState(false);
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
