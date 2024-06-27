import React from "react";
import SubsCard from "../components/subscription/SubsCard";
const Subscription = () => {
  return (
    <div className="px-4 py-10 sm:py-28 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 ">
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <div>
          <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider uppercase rounded-full bg-teal-accent-400">
            Our Subscriptions
          </p>
        </div>
        <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight sm:text-4xl md:mx-auto">
          <span className="relative inline-block">
            <svg
              viewBox="0 0 52 24"
              fill="currentColor"
              className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
            >
              <defs>
                <pattern
                  id="7e5e8ff8-1960-4094-a63a-2a0c0f922d69"
                  x="0"
                  y="0"
                  width=".135"
                  height=".30"
                >
                  <circle cx="1" cy="1" r=".7" />
                </pattern>
              </defs>
              <rect
                fill="url(#7e5e8ff8-1960-4094-a63a-2a0c0f922d69)"
                width="52"
                height="24"
              />
            </svg>
            <span className="relative">KGPLAY</span>
          </span>{" "}
          <span></span>
        </h2>
        <p className="text-base md:text-lg">
          Choose the plan that’s right for you
        </p>
      </div>
      <div className="grid max-w-md gap-10 row-gap-5 lg:max-w-screen-lg sm:row-gap-10 lg:grid-cols-3 md:grid-cols-2 xl:max-w-screen-lg sm:mx-auto">
        <SubsCard
          title={"Basic"}
          price={99}
          res={"Stream at 480p "}
         
        />
        <SubsCard
          title={"Standard"}
          price={199}
          res={"Stream at 720p(HD)"}
          
        />
        <SubsCard
          title={"Premium"}
          price={499}
          res={"Stream at 1080p(Full HD)"}
          
        />
      </div>
    </div>
  );
};

export default Subscription;
