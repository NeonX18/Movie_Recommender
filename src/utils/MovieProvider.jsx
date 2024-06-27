import React, { createContext, useState } from "react";
export const MovieContext = createContext({});

const genresList = [
  "Action",
  "Drama",
  "History",
  "Documentary",
  "War",
  "Biography",
  "Family",
  "Crime",
  "Animation",
  "Adventure",
  "Comedy",
  "Romance",
  "Sport",
  "Music",
  "Fantasy",
  "News",
  "Western",
  "Mystery",
  "Sci-Fi",
  "Thriller",
  "Short",
  "Musical",
  "Horror",
  "Film-Noir",
];
export const MovieProvider = ({ children }) => {
  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [movieGenres, setMovieGenres] = useState(genresList);

  const contextValues = {
    movieData,
    setMovieData,
    isLoading,
    setIsLoading,
    errorMessage,
    setErrorMessage,
    movieGenres,
    setMovieGenres,
  };

  return (
    <MovieContext.Provider value={contextValues}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;
