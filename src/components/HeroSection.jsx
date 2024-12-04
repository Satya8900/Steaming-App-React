import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const [movieData, setMovieData] = useState([]);
  const [isFetching, setIsFetching] = useState(true); // To track if data is being fetched
  const navigate = useNavigate()

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzFjYzVlMWNkZTgzM2RmNzYzMDhlYjA5YjA1MjMyYyIsIm5iZiI6MTczMjI5MzMwOS42MzYzNjM3LCJzdWIiOiI2NzE5M2M2NTVkMGRlODkwNDJkOGNjYzEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.D8PuTAUcytmByfmtlnRTVnAjjMRnQm-FLgvFxF5dtYs",
    },
  };

  useEffect(() => {
    if (isFetching) {
      // Fetch data from page 1 and page 2
      Promise.all([
        fetch(
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
          options
        ).then((response) => response.json()),
        fetch(
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=2",
          options
        ).then((response) => response.json()),
      ])
        .then(([result1, result2]) => {
          // Concatenate the arrays from both results
          setMovieData([...result1.results, ...result2.results]); // Combine results
          setIsFetching(false); // Mark fetching as complete
        })
        .catch((error) => {
          console.error("Error fetching movie data:", error);
          setIsFetching(false);
        });
    }
  }, [isFetching]);

  return (
    <div className="bg-black2 relative z-0">
      <div className="grid grid-cols-8 gap-3 sm-max:gap-0 relative bottom-[92px] -z-10 pt-1 bg-black2 gradient">
        {movieData.map((data, index) => {
          return (
            <div key={index}>
              <img
                className="rounded-lg sm-max:rounded-none"
                src={`https://image.tmdb.org/t/p/w500/${data.backdrop_path}`}
                alt=""
              />
            </div>
          );
        })}
        <img
          className="absolute top-0 w-full"
          src={assets.topGradiant}
          alt=""
        />
        <img
          className="absolute inset-0 mx-auto my-auto top-1/2 transform -translate-y-1/2 w-[250px] xl-max:w-[150px] md-max:w-[50px]"
          src={assets.abstract}
          alt=""
        />
        <img
          className="absolute top-[120px] w-full"
          src={assets.bottomGradiant}
          alt=""
        />
      </div>

      <div className=" relative bottom-[100px] flex flex-col justify-center items-center text-center bg-black2 text-white pb-[50px] md-max:pb-[0px]">
        <h1 className="relative bottom-5 font-semibold text-5xl xl-max:text-4xl sm-max:text-3xl">
          The Best Streaming Experience
        </h1>
        <p className="px-32 xl-max:px-16 sm-max:px-2 mt-3 text-lg xl-max:text-base sm-max:text-xs text-gray1">
          StreamVibe is the best streaming experience for watching your favorite
          movies and shows on demand, anytime, anywhere. With StreamVibe, you
          can enjoy a wide variety of content, including the latest
          blockbusters, classic movies, popular TV shows, and more. You can also
          create your own watchlists, so you can easily find the content you
          want to watch.
        </p>
        <button
          onClick={() => navigate('/movies')}
          className="mt-10 bg-red1 hover:bg-red4 px-2 sm-max:px1 py-3 xl-max:py-2 sm-max:py-1 sm-max:text-sm flex items-center rounded-xl"
        >
          <img className="inline sm-max:w-6" src={assets.playButton} alt="" />{" "}
          Explore Now
        </button>

      </div>
    </div>
  );
}

export default HeroSection;
