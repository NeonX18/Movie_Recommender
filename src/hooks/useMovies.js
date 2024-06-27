import { useContext } from "react";
import { MovieContext } from "../utils/MovieProvider";


export const useMovies = () => {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};