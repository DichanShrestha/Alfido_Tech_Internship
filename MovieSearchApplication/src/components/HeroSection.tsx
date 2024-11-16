import axios from "axios";
import { useEffect, useState } from "react";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";
import BoxReveal from "./ui/box-reveal";
import ShimmerButton from "./ui/shimmer-button";
import { Card, Carousel } from "./ui/apple-cards-carousel";
import { Input } from "./ui/input";

type PopularMovie = {
  image: string;
  title: string;
  overview: string;
  date: string;
};

export default function HeroSection() {
  const [popularMovies, setPopularMovies] = useState<any>([]);
  const [popularMovie, setPopularMovie] = useState<PopularMovie>({
    image: "",
    overview: "",
    title: "",
    date: "",
  });
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const cards = popularMovies.map((movies: any, idx: number) => (
    <Card
      index={idx}
      key={ORIGINAL_IMG_BASE_URL + movies.known_for[0].backdrop_path}
      card={{
        src: ORIGINAL_IMG_BASE_URL + movies.known_for[0].backdrop_path,
        title: movies.known_for[0].original_title,
      }}
    />
  ));

  const nowPlayingCards = nowPlayingMovies.map((movies: any, idx: number) => (
    <Card
      index={idx}
      key={ORIGINAL_IMG_BASE_URL + movies.backdrop_path}
      card={{
        src: ORIGINAL_IMG_BASE_URL + movies.backdrop_path,
        title: movies.original_title,
      }}
    />
  ));

  const getOnePopularMovie = async () => {
    const page = Math.floor(Math.random() * 20 + 1);
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/person/popular?language=en-US&page=${page}`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZDQ5NDJiNjIwZmFlMzljYjk5NGJhOGI3ODc3ZTRmOSIsIm5iZiI6MTczMTMyNDU0MS4wOTIzNDg4LCJzdWIiOiI2NzMxZTU4NmJjM2ZmN2I0ZDFiZWViZGQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.tpQMghGmmFzLKCnwbwlztEWW_jmdJ6-Vdo2cznNoQTY",
      },
    };
    try {
      const response = await axios.request(options);
      setPopularMovies(response.data.results);
      setPopularMovie({
        image:
          ORIGINAL_IMG_BASE_URL +
          response.data.results[0].known_for[0].backdrop_path,
        date: response.data.results[0].known_for[0].release_date,
        overview: response.data.results[0].known_for[0].overview,
        title: response.data.results[0].known_for[0].original_title,
      });
    } catch (error) {
      console.log("Error while getting hero popular section: ", error);
    }
  };

  const getNowPlayingMovies = async () => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZDQ5NDJiNjIwZmFlMzljYjk5NGJhOGI3ODc3ZTRmOSIsIm5iZiI6MTczMTMyNDU0MS4wOTIzNDg4LCJzdWIiOiI2NzMxZTU4NmJjM2ZmN2I0ZDFiZWViZGQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.tpQMghGmmFzLKCnwbwlztEWW_jmdJ6-Vdo2cznNoQTY",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response, 78);

      setNowPlayingMovies(response.data.results);
    } catch (error) {
      console.log("Error getting now playing movies: ", error);
    }
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []);

  useEffect(() => {
    getOnePopularMovie();
  }, []);

 

  return (
    <div className="bg-black">
      <div
        style={{ backgroundImage: `url(${popularMovie.image})` }}
        className={`w-full h-screen bg-cover bg-center relative`}
      >
        <div className="absolute right-5 top-10">
          <form
            action={`/movie/${searchQuery}`}
            className="flex items-center gap-3"
          >
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-96 text-white"
            />
            <ShimmerButton type="submit">Search</ShimmerButton>
          </form>
        </div>
        <div className="size-full max-w-lg items-center justify-center overflow-hidden absolute left-10 top-40">
          <BoxReveal boxColor={"#5046e6"} duration={0.5}>
            <p className="text-[3.5rem] font-semibold text-[#FFFFFF]">
              {popularMovie.title}
            </p>
          </BoxReveal>

          <BoxReveal boxColor={"#5046e6"} duration={0.5}>
            <h2 className="mt-[.5rem] text-[1rem] text-[#FFD700]">
              {popularMovie.date}
            </h2>
          </BoxReveal>

          <BoxReveal boxColor={"#5046e6"} duration={0.5}>
            <div className="mt-6 text-[#D3D3D3]">{popularMovie.overview}</div>
          </BoxReveal>

          <BoxReveal boxColor={"#5046e6"} duration={0.5}>
            <ShimmerButton className="mt-[1.6rem] text-white">
              View details
            </ShimmerButton>
          </BoxReveal>
        </div>
      </div>
      <div>
        <div className="w-full h-full py-20">
          <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-white dark:text-neutral-200 font-sans">
            Popular Movies
          </h2>
          <Carousel items={cards} />
        </div>
      </div>

      <div>
        <div className="w-full h-full">
          <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-white dark:text-neutral-200 font-sans">
            Now Playing Movies
          </h2>
          <Carousel items={nowPlayingCards} />
        </div>
      </div>
    </div>
  );
}
