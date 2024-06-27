import React from "react";
import { Hero, MovieSections } from "../components";
import { useMovies } from "../hooks/useMovies";

const Home = () => {
  const { movieData, isLoading, movieGenres, errorMessage } = useMovies();

  // console.log(movieGenres);
  return (
    !isLoading && (
      <>
        <Hero />
        {errorMessage ? (
          <p>{errorMessage}</p>
        ) : (
          <div className="overflow-x-hidden flex flex-col w-full px-8 py-2 mt-12">
            {movieData &&
              movieGenres.map((genre, index) => (
                <MovieSections
                  key={index}
                  title={`Top ${genre}`}
                  movieData={movieData.filter((movie) =>
                    genre.includes(movie.genres)
                  )}
                />
              ))}
          </div>
        )}
      </>
    )
  );
};

export default Home;
