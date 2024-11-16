import axios from "axios";
import { useEffect, useState } from "react";
import { API_KEY, ORIGINAL_IMG_BASE_URL } from "../utils/constants";
import { Link, useParams } from "react-router-dom";
import { Card } from "../components/ui/apple-cards-carousel";
import { Input } from "../components/ui/input";
import ShimmerButton from "../components/ui/shimmer-button";

export default function SearchPage() {
  const { searchQuery } = useParams();
  const [searchNewQuery, setSearchNewQuery] = useState("");
  const [searchedMovies, setSearchedMovies] = useState([]);

  const getSearchedMovie = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`
      );
      console.log(response);
      setSearchedMovies(response.data.results);
    } catch (error) {
      console.log("Error getting searched movie: ", error);
    }
  };
  useEffect(() => {
    getSearchedMovie();
  }, []);

  
  return (
    <div className="bg-black">
      <div className="flex items-center w-full justify-center">
        <form
          action={`/movie/${searchNewQuery}`}
          className="flex items-center gap-3 my-5"
        >
          <Input
            value={searchNewQuery}
            onChange={(e) => setSearchNewQuery(e.target.value)}
            className="w-96 text-white"
          />
          <ShimmerButton type="submit">Search</ShimmerButton>
        </form>
      </div>
      <div className="flex flex-wrap gap-4 mx-7">
        {searchedMovies.map((movies: any, idx: number) => (
          <div
            key={movies.backdrop_path}
          >
            <Link to={`/movie-details/${encodeURIComponent(JSON.stringify(movies))}`}><Card
              index={idx}
              card={{
                title: movies.title,
                src: ORIGINAL_IMG_BASE_URL + movies.backdrop_path,
              }}
            /></Link>
          </div>
        ))}
      </div>
    </div>
  );
}
