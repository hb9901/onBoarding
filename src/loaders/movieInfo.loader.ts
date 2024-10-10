import api from "../api/api";

const moviesLoader = async () => {
  const data = await api.movie.getMovies();
  return data;
};

export default moviesLoader;
