import React, { useEffect, useState } from "react";

const SearchList = ({ searchResults }) => {
  const [searchArray, setSearchArray] = useState(Object.values(searchResults));

  useEffect(() => {
    setSearchArray(Object.values(searchResults))
  }, [searchResults])

  return (
    <div className="text-black">
      {
      searchArray.map((item, i) => (
        <div key={i}>{item.title}</div>
      ))
      }
    </div>
  );
};

export default SearchList;
