import { useParams } from "react-router-dom";

interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const MovieDetailsPage = () => {
  const { movie } = useParams();
  const decodedMovie: MovieDetails = JSON.parse(decodeURIComponent(movie!));

  const {
    backdrop_path,
    poster_path,
    title,
    overview,
    release_date,
    vote_average,
    vote_count,
    genre_ids,
  } = decodedMovie;

  const posterUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;
  const backdropUrl = `https://image.tmdb.org/t/p/w1280${backdrop_path}`;

  // Map genre IDs to names (this mapping should ideally come from TMDB API documentation or constants)
  const genreMap: { [key: number]: string } = {
    16: "Animation",
    12: "Adventure",
    28: "Action",
    14: "Fantasy",
    10751: "Family",
  };

  const formattedGenres = genre_ids
    .map((id) => genreMap[id] || "Unknown")
    .join(", ");

  return (
    <div className="bg-gray-900 text-white">
      {/* Backdrop Image */}
      <div
        className="relative w-full h-96 bg-cover bg-center"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        {/* Movie Header */}
        <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
          {/* Movie Poster */}
          <div className="flex-shrink-0 mb-6 md:mb-0">
            <img
              src={posterUrl}
              alt={title}
              className="w-64 h-96 object-cover rounded-lg shadow-lg"
            />
          </div>

          <div className="flex flex-col space-y-6 md:w-2/3">
            <h1 className="text-4xl font-extrabold leading-tight">{title}</h1>

            {/* Overview */}
            <div>
              <h2 className="text-2xl font-semibold">Overview</h2>
              <p className="mt-2 text-lg">{overview}</p>
            </div>

            {/* Movie Details */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div>
                <strong>Genres:</strong>
                <p>{formattedGenres}</p>
              </div>
              <div>
                <strong>Release Date:</strong>
                <p>{new Date(release_date).toLocaleDateString()}</p>
              </div>
              <div>
                <strong>Rating:</strong>
                <p>
                  {vote_average} ({vote_count} votes)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default MovieDetailsPage;
