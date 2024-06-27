import React, { useEffect, useState } from "react";
import { IoPlay } from "react-icons/io5";
import { GoStarFill } from "react-icons/go";
import MovieSections from "../components/home/MovieSections";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const GET_MOVIE = "/movies";

const MoviePage = () => {
  const [movie, setMovie] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [similarMovieData, setSimilarMovieData] = useState([]);
  const [errorMessage2, setErrorMessage2] = useState(null);
  const [isLoading2, setIsLoading2] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const response = await axios.get(`${GET_MOVIE}/${id}`);
        response.data && setMovie(response.data[0]);
      } catch (err) {
        console.log(err);
        if (err?.response?.status === 404) {
          setErrorMessage("No results found");
        }
        if (err?.response?.status === 400) {
          setErrorMessage("No results found");
        } else {
          setErrorMessage("Something went wrong");
        }
      } finally {
        setIsLoading(false);
      }
    };

    getMovieDetails();
  }, []);

  useEffect(() => {
    const getMoviesSimilar = async () => {
      try {
        const response = await axios.get(`${GET_MOVIE}`, {
          query: {
            genres: movie.genres,
            limit: 30,
          },
        });
        // console.log(response.data);
        setSimilarMovieData(response.data);
      } catch (err) {
        console.log(err);
        if (err?.response?.status === 404) {
          setErrorMessage2("No results found");
        } else {
          setErrorMessage2("Something went wrong");
        }
      } finally {
        setIsLoading2(false);
      }
    };
    getMoviesSimilar();
  }, [movie]);

  // console.log(movie);

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <div key={movie._id} className="h-[150vh] w-full relative select-none">
          <img
            className="w-full h-full object-cover blur-xl z-0 brightness-[0.15]"
            src={movie.poster}
            alt="movie background"
          />
          {/* Movie Title and Ratings */}
          <div className="absolute top-[8%] w-full p-8">
            <div className="flex gap-14 absolute ml-2">
              <img
                src={movie.poster}
                alt="title"
                className="w-auto h-[80vh] object-cover brightness-90"
              />
              <div>
                <div className=" w-full flex justify-between items-center mb-1 pr-10">
                  <h1 className="text-5xl font-semibold  ">{movie.title}</h1>
                  <div className="flex mt-1 mr-6 items-center text-3xl ">
                    <p className=" font-semibold">8.3</p>
                    <GoStarFill size={30} className="text-yellow-400 ml-2" />
                  </div>
                </div>
                <div className="flex gap-4 text-gray-400 mb-6">
                  <p>
                    <span className="">{movie.year} </span>
                  </p>
                  <p>|</p>
                  <p>
                    <span className="">{movie.runtime} mins</span>
                  </p>
                </div>
                <div className="flex flex-col text-lg gap-5">
                  <div>
                    <p className="mr-10 line-clamp-6">
                      {movie.fullplot || movie.plot}
                    </p>
                  </div>
                  <div className="space-y-4 my-6">
                    <button
                      className="flex items-center gap-2 bg-white text-black py-2 pl-3 pr-4
                  font-semibold rounded-md hover:bg-primary-red hover:text-white
                  duration-300"
                    
                    onClick={() => navigate(`/play/${movie._id}`)}>
                      <IoPlay /> Play
                    </button>
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold mb-5">Details</h2>
                    <div className="flex gap-7">
                      <div className="flex flex-col gap-2 ">
                        <p>Cast</p>
                        <p>Director</p>
                        <p>Genre</p>
                      </div>
                      <div className="flex flex-col gap-2 text-blue-600">
                        <div className="flex">
                          {movie.cast.map((actor, index) => (
                            <div className="mr-4" key={index}>
                              <p>{actor}</p>
                            </div>
                          ))}
                        </div>
                        <div className="flex">
                          <p>{movie.director}</p>
                        </div>
                        <div className="flex">
                          {movie.genres.map((genre, index) => (
                            <div className="mr-4" key={index}>
                              <p>{genre}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isLoading2 ? (
            <LoadingSpinner />
          ) : errorMessage2 ? (
            <p>{errorMessage2}</p>
          ) : (
            <div className="absolute -bottom-0 w-full z-20 px-8">
              <div className="relative overflow-visible">
                <MovieSections
                  title="More Like This"
                  movieData={similarMovieData}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MoviePage;
