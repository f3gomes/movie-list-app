import { apiIMDB } from "./api";

export const getGenres = async (setResultList: (value: any) => void) => {
  const url = `${import.meta.env.VITE_IMDB_URL}/genre/movie/list`;
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
