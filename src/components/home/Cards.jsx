import React, { useState, useEffect } from "react";
import axios from "axios";
const Cards = ({ title, fetchURL }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(fetchURL).then((response) => {
      setMovies(response.data.results);
    });
  }, [fetchURL]);

  console.log(movies);
  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div className="relative flex items-center">
        <div id={"slider"}>
          {movies.map((item, id) => (
            <div
              key={id}
              className="w-40 sm:w-52 md:w-64 lg:w-72 inline-block cursor-pointer relative p-2 m-1 hover:scale-110 transition-all duration-300"
            >
              <img
                className="w-full h-auto block"
                src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
                alt="{item?.title}"
              />
              <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100  text-white">
                <p className=" text-xs md:text-sm font-bold ">{item?.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cards;
