import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { imageBaseURL } from "../../utils/constants";
import { useMovies } from "../../hooks/useMovies";
import { useEffect } from "react";

export default function Detail() {
  let { id } = useParams();
  const { movies, loading, error, getMovieByID } = useMovies({});
  const movie = movies[0];

  useEffect(() => {
    getMovieByID({ movieID: id });
  }, [id]);

  if (loading && !movie) {
    return <Loading />;
  }

  if (!loading && !movie && error) {
    return <p>Error</p>;
  }

  const { title, poster_path, overview } = movie;

  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="mb-8 md:mb-0">
            <img
              className="object-cover w-full h-96 md:h-auto rounded-t-lg"
              src={`${imageBaseURL}${poster_path}`}
              alt={title}
            />
          </div>
          <div>
            <div className="mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
                {title}
              </h2>
              <div className="grid grid-cols-1 gap-8">
                <div className="bg-white shadow overflow-hidden rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      {overview}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
