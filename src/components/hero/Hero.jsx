import React from "react";
import MovieSections from "../home/MovieSections";
import { GoStarFill } from "react-icons/go";
import { IoPlay } from "react-icons/io5";
import { useMovies } from "../../hooks/useMovies";
import { Link } from "react-router-dom";
const Hero = () => {
  const { movieData } = useMovies();

  return (
    <div className="sm:w-full h-[50rem] text-white relative select-none">
      <div className="w-full h-full">
        <div className="absolute w-full h-inherit bg-gradient-to-r from-black z-10" />
        <img
          className="w-full h-full object-cover blur-sm z-[-1] brightness-[0.35]"
          src={`/register.jpg`}
          alt="{movie background}"
        />
        <div className="absolute w-1/2 top-[12%] p-6 md:p-10">
          <h1 className="text-5xl font-semibold ">
            Transformers: Age of Extinction
          </h1>
          <h2 className="mt-4 text-lg line-clamp-2 text-[#d6d5d4]">
            The Avengers is a 2012 American superhero film based on the Marvel
            Comics superhero team of the same name. Produced by Marvel Studios
            and
          </h2>
          <div className="my-4 text-lg">
            <Link to ="/play/573a13d7f29313caabda1952"><button className="flex items-center gap-2 bg-white text-black py-2 pl-3 pr-4 font-semibold rounded-md hover:bg-primary-red hover:text-white duration-300">
              <IoPlay /> Play
            </button></Link>
          </div>
          <div>
            <p className=" text-md mb-2">Released : 2008</p>
            <div className="flex items-center text-md ">
              <p className=" text-xl font-semibold">8.3</p>
              <p className=" text-orange-200 text-lg mr-2">/10</p>
              <GoStarFill size={22} className="text-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute w-full h-64 bottom-0 z-10 bg-gradient-to-b from-transparent to-primary-black" />

      <div className="absolute w-full -bottom-12 z-20 px-8">
        <div className="relative overflow-visible">
          {movieData && (
            <MovieSections
              movieData={movieData.filter((movie) => movie.imdbRating >= "8.5")}
              title="Top Rated"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
