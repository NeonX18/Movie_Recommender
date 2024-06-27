import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "../../../api/axios";
import SearchList from "./SearchList";
const TITLE_SEARCH_URL = "/search/title";
const PLOT_SEARCH_URL = "/search/plot";

const Search = () => {
  const [input, setInput] = useState("");
  const [isTitle, setIsTitle] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchResults, setSearchResults] = useState();
  const debounceTimerRef = useRef(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  useEffect(() => {
    const handleArrowKeyPress = (event) => {
      if (!showSuggestions || !searchResults.length) return;
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setHighlightedIndex(prevIndex => Math.max(prevIndex - 1, -1));
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        setHighlightedIndex(prevIndex => Math.min(prevIndex + 1, searchResults.length - 1));
      }
    };

    window.addEventListener('keydown', handleArrowKeyPress);

    return () => {
      window.removeEventListener('keydown', handleArrowKeyPress);
    };
  }, [showSuggestions, searchResults.length]);





  const getPlotSearchResult = async (value) => {
    if (!value) {
      setSearchResults({});
      return;
    }
    try {
      const response = await axios.get(PLOT_SEARCH_URL, {
        params: { plot: value },
        headers: {
          "Content-Type": "application/json",
        },
      });
      response && setSearchResults(response.data);
    } catch (error) {
      if (error?.response?.status === 422) {
        return;
      }
    }
  };

  const getTitleSearchResult = async (value) => {
    if (!value) {
      setSearchResults({});
      return;
    }



    try {
      const response = await axios.get(TITLE_SEARCH_URL, {
        params: { title: value },
        headers: {
          "Content-Type": "application/json",
        },
      });
      response && setSearchResults(response.data);
    } catch (error) {
      if (error?.response?.status === 422) {
        return;
      }
    }
  }
  const handleChange = (value) => {
    setInput(value);
    if (isTitle) {
      getTitleSearchResult(value);
    } else {
      getPlotSearchResult(value);
    }
  };

  return (
    <div className="flex gap-4 items-center justify-center">
      <div className={`relative`}>
        <button
          onClick={() => {
            setIsDropdownOpen(!isDropdownOpen);
          }}
          className="border-[1px] border-gray-500 px-4 py-2 rounded-md"
        >
          {isTitle ? "Title" : "Plot"}
        </button>
        <div
          className={`absolute top-12 bg-white text-black py-2 rounded-md z-[100]  ${isDropdownOpen ? "flex" : "hidden"}`}
        >
          <span
            className="w-full cursor-pointer hover:bg-slate-200 px-6 py-2 select-none"
            onClick={() => {
              setIsTitle((prev) => !prev);
              setIsDropdownOpen(false);
            }}
          >
            {!isTitle ? "Title" : "Plot"}
          </span>
        </div>
      </div>
      <div className="relative">
        <div className="absolute left-3 top-1/2 translate-y-[-50%]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>

        <input
          type="text"
          className=" min-w-[400px] w-full border-[1px] border-gray-600 px-4 py-2 pl-12 rounded-md outline-none bg-black/15"
          placeholder={`Search for movies ${isTitle ? "titles" : "plots"}...`}
          value={input}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
        />

        <div className="absolute top-12 bg-white">
          {searchResults && <SearchList searchResults={searchResults} />}
        </div>
      </div>
    </div>
  );
};

export default Search;
