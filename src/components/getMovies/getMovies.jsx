import React, { useEffect } from "react";
import { useMovies } from "../../hooks/useMovies";
import axios from "../../api/axios";
import { Outlet } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const GET_MOVIE_DETAILS_URL = "/movies";

const GetMovies = () => {
  const {
    movieData,
    isLoading,
    setMovieData,
    setIsLoading,
    setErrorMessage,
    movieGenres,
    setMovieGenres,
  } = useMovies();

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const response = await axios.get(GET_MOVIE_DETAILS_URL, {
          params: { limit: 2000 },
        });

        // console.log(response.data);
        setMovieData(response.data);
        setMovieGenres([...new Set(movieGenres)]);
      } catch (err) {
        // console.log(err);
        // console.log(err.response);
        if (err?.response?.status === 422) {
          setErrorMessage("No results found");
        } else if (err?.response?.status === 404) {
          setErrorMessage("No results found");
        } else {
          setErrorMessage("Something went wrong");
        }
      } finally {
        setIsLoading(false);
      }
    };

    movieData.length === 0 ? getMovieDetails() : setIsLoading(false);
    // getMovieDetails();
    // console.log(movieData.length === 0);
  }, []);

  // useEffect(() => {
  //   movieData &&
  //     movieData.map((movie) => {
  //       movie.genres &&
  //         movie.genres.map((genre) => {
  //           movieGenres.push(genre);
  //         });
  //     });
  //   setMovieGenres([...new Set(movieGenres)]);
  // }, [movieData]);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <LoadingSpinner />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default GetMovies;
