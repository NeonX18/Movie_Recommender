import React, { useState, useEffect, useRef } from "react";
import "./SearchBar.css";
import axios from "../../../api/axios";
import { useNavigate } from "react-router-dom";

const TITLE_SEARCH_URL = "/search/title";
const PLOT_SEARCH_URL = "/search/plot";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const debounceTimerRef = useRef(null); // Ref for debounce timer
  const [isTitle, setIsTitle] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleArrowKeyPress = (event) => {
      if (!showSuggestions || !suggestions.length) return;
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, -1));
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        setHighlightedIndex((prevIndex) =>
          Math.min(prevIndex + 1, suggestions.length - 1)
        );
      }
    };

    window.addEventListener("keydown", handleArrowKeyPress);

    return () => {
      window.removeEventListener("keydown", handleArrowKeyPress);
    };
  }, [showSuggestions, suggestions.length]);

  useEffect(() => {
    if (highlightedIndex !== -1 && suggestions[highlightedIndex]) {
      setQuery(suggestions[highlightedIndex].title);
    }
  }, [highlightedIndex, suggestions]);

  useEffect(() => {
    if (highlightedIndex !== -1 && suggestionsRef.current) {
      const highlightedItem = suggestionsRef.current.children[highlightedIndex];
      highlightedItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [highlightedIndex, suggestions]);

  useEffect(() => {
    if (!query.trim()) {
      setShowSuggestions(false);
      setHighlightedIndex(-1);
      setSuggestions([]);
    }
  }, [query]);

  const handleChange = async (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
    // Clear previous debounce timer
    clearTimeout(debounceTimerRef.current);

    // Start new debounce timer
    debounceTimerRef.current = setTimeout(async () => {
      if (!inputValue.trim()) {
        setShowSuggestions(false);
        setHighlightedIndex(-1);
        setSuggestions([]);
        return;
      }

      try {
        const response = await axios.get(
          `${isTitle ? TITLE_SEARCH_URL : PLOT_SEARCH_URL}/?query=${inputValue}`
        );
        setSuggestions(response.data);
        setShowSuggestions(true);
        setHighlightedIndex(-1);
      } catch (error) {
        console.error(
          "Error fetching autocomplete suggestions:",
          error.message
        );
      }
    }, 300); // Adjust the delay as needed
  };

  // Rest of the component remains the same...

  const handleSelectSuggestion = (movieTitle) => {
    setQuery(movieTitle);
    setShowSuggestions(false);
    setHighlightedIndex(-1);
    inputRef.current.focus();
  };

  const handleSearch = () => {
    console.log("Searching for:", query);
    setIsDropdownOpen(false);
    navigate(`/search?title=${isTitle}&query=${query}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (highlightedIndex !== -1 && suggestions[highlightedIndex]) {
        handleSelectSuggestion(suggestions[highlightedIndex].title);
      } else {
        handleSearch();
      }
    }
  };

  const handleBlur = () => {
    // Delay hiding suggestions to handle selection of suggestions
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  return (
    <div className="search-container flex gap-4">
      <div className="search-center">
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
            value={query}
            onChange={handleChange}
            onFocus={() => setShowSuggestions(query.trim() !== "")}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            placeholder="Search for movies..."
            className=" min-w-[400px] w-full border-l-[1px] border-b-[1px] border-gray-400 px-4 py-2 pl-12 rounded-md outline-none bg-black/15"
            ref={inputRef}
          />
        </div>

        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
        <div className={`relative`}>
          <button
            onClick={() => {
              setIsDropdownOpen(!isDropdownOpen);
            }}
            className="border-l-[1px] border-b-[1px] border-gray-400 px-4 py-2 rounded-md bg-black/15"
          >
            {isTitle ? "Title" : "Plot"}
          </button>
          <div
            className={`absolute top-12 bg-white text-black py-2 rounded-md z-[100]  ${isDropdownOpen ? "flex" : "hidden"}`}
          >
            <span
              className="w-full cursor-pointer px-6 py-2 select-none "
              onClick={() => {
                setIsTitle((prev) => !prev);
                setIsDropdownOpen(false);
              }}
            >
              {!isTitle ? "Title" : "Plot"}
            </span>
          </div>
        </div>
        {showSuggestions && (
          <ul className="suggestions-list text-black" ref={suggestionsRef}>
            {suggestions.map((movie, index) => (
              <li
                key={index}
                onClick={() => {
                  handleSelectSuggestion(movie.title);
                  navigate(`/movies/${movie._id}`);
                }}
                className={highlightedIndex === index ? "highlighted" : ""}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                {movie.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
