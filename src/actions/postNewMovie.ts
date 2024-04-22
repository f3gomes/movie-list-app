import { MovieDataProps } from "../components/Header";
import { api } from "./api";

export const addNewMovie = async (
  data: MovieDataProps,
  setIsLoading: (value: boolean) => void
) => {
  try {
    setIsLoading(true);
    await api.post(`/api/movie/new`, data);
  } catch (err) {
    console.log(err);
  }
};
