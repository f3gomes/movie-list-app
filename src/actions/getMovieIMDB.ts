import { apiIMDB } from "./api";

export const getMovieIMDB = async (
  query: string,
  setResultList: (value: any) => void
) => {
  const url = `/search/movie?query=${query}&include_adult=false&language=pt-BR&page=1`;
  const headers = {
    Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
  };

  try {
    const response = await apiIMDB.get(url, { headers });
    setResultList(response.data.results);
  } catch (err) {
    console.log(err);
  }
};
