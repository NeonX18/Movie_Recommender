import React, { useRef, useState } from "react";
import Card from "../Card";
import { GrNext, GrPrevious } from "react-icons/gr";
import { motion } from "framer-motion";
const MovieSections = ({ title = "", movieData }) => {
  const ref = useRef(null);
  const [translate, setTranslate] = useState(0);

  if (!movieData) return null;
  const cardWidth = 192; // replace with the actual width of your card
  const cardSpacing = 16;
  const totalCards = movieData.length || 0;
  const totalCardWidth = (cardSpacing + cardWidth) * totalCards;

  const handleTranslate = (direction) => {
    const containerWidth = ref.current.offsetWidth;
    if (direction === "left") {
      if (translate < 0) {
        setTranslate(translate + window.innerWidth - 500);
      }
    } else if (direction === "right") {
      if (Math.abs(translate) < totalCardWidth - containerWidth) {
        setTranslate(translate - window.innerWidth + 500);
      }
    }
  };

  // console.log({ movieData, title, length: movieData.length });

  return (
    movieData &&
    movieData.length > 7 && (
      <div>
        <h3 className="text-2xl font-semibold px-2">{title}</h3>
        <div className="relative overflow-x-hidden">
          <div
            className="absolute left-0 bottom-0 bg-gradient-to-r from-primary-black to-transparent h-64 w-20 z-10 flex items-center justify-center cursor-pointer mb-8"
            onClick={() => {
              handleTranslate("left");
            }}
          >
            <GrPrevious size={50} className="z-50" />
          </div>
          <motion.div
            className="flex items-end gap-4 no-scrollbar py-8 px-4"
            animate={{ x: translate }}
            ref={ref}
            transition={{ type: "tween", duration: 0.5 }}
          >
            {movieData.map((movie) => (
              <Card key={movie._id} movie={movie} />
            ))}
          </motion.div>
          <div
            className="absolute right-0 bottom-0 bg-gradient-to-l from-primary-black to-transparent h-64 w-20 flex items-center justify-center cursor-pointer mb-8"
            onClick={() => handleTranslate("right")}
          >
            <GrNext size={50} className="z-50" />
          </div>
        </div>
      </div>
    )
  );
};

export default MovieSections;
