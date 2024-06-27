import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Card from "../Card";
// import MoviesData from "./Moviedata";
import axios from "../../api/axios";
// import { useNavigate, useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
function Cards({ currentItems }) {
  return (
    <div className="grid grid-cols-5 gap-3">
      {currentItems &&
        currentItems.map((movie) => <Card key={movie._id} movie={movie} />)}
    </div>
  );
}

function PaginatedItems({ itemsPerPage = 10 }) {
  const location = useLocation();
  const [itemOffset, setItemOffset] = useState(0);
  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const queryParams = new URLSearchParams(location.search);
  const isTitle = queryParams.get("title");
  const query = queryParams.get("query");

  useEffect(() => {
    // let isMounted = true;
    // const controller = new AbortController();
    const getMovieDetails = async () => {
      try {
        const response = await axios.get(
          `/search/${isTitle === "true" ? "title" : "plot"}`,
          {
            params: { query: query, limit: 200 },
            // signal: controller.signal,
          }
        );
        // console.log(response.data);
        setMovieData(response.data);
      } catch (err) {
        console.log(err);
        console.log(err.response);
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
    getMovieDetails();
  }, [query, isTitle]);

  useEffect(() => {
    setMovieData(movieData);
  }, [movieData]);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = movieData.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(movieData.length / itemsPerPage);
  // console.log(currentItems)
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % movieData.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="flex flex-col justify-center items-center py-4 relative h-screen w-full min-h-screen">
      {isLoading ? (
        <LoadingSpinner />
      ) : errorMessage ? (
        <div>{errorMessage}</div>
      ) : (
        <div className="flex flex-col justify-center items-center py-4 relative h-screen w-full min-h-screen">
          <Cards currentItems={currentItems} />
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={1}
            pageCount={pageCount}
            previousLabel="< Previous"
            renderOnZeroPageCount={null}
            className="bottom-5 absolute flex justify-center items-center gap-2 "
            linkClass=" p-2 rounded-md border border-black"
            pageLinkClassName="p-2 rounded-md border"
            activeLinkClassName="bg-primary-red text-white p-2 rounded-md"
            previousLinkClassName="p-2 rounded-md border"
            nextLinkClassName="p-2 rounded-md border"
            breakLinkClassName="p-2 rounded-md border"
            disabledLinkClassName="text-primary-black border-0 cursor-default"
          />
        </div>
      )}
    </div>
  );
}
export default PaginatedItems;
