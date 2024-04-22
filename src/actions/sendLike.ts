import { api } from "./api";

export const sendLike = async (
  id: string,
  like: number,
  setIsLoading: (value: boolean) => void
) => {
  try {
    setIsLoading(true);
    await api.patch(`/api/movie/likes/${id}`, { likes: like });
  } catch (err) {
    console.log(err);
  }
};
