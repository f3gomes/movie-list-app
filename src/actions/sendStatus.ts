import { api } from "./api";

export const sendStatus = async (
  id: string,
  status: boolean,
  setIsLoading: (value: boolean) => void
) => {
  try {
    setIsLoading(true);
    await api.patch(`/api/movie/watched/${id}`, { watched: status });
  } catch (err) {
    console.log(err);
  }
};
