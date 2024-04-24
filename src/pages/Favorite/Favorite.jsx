import { useSelector } from "react-redux";
import Card from "../../components/Card/Card";
import { truncateText } from "../../utils/utils";

function NoResults() {
  return (
    <div className="flex justify-center items-center py-10 text-4xl h-dvh">
      No Favorite Movies
    </div>
  );
}

export default function Favorite() {
  const movies = useSelector((state) => state.movies.movies);

  return (
    <div>
      <h2 className="text-4xl font-extrabold dark:text-white">
        Favorite movies
      </h2>
      {!movies || movies.length === 0 ? (
        <NoResults />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4" role="grid">
          {movies.length > 0 && movies.map(({ id, title, overview, poster_path, release_date }) => (
            <Card
              key={id}
              title={title}
              description={truncateText(overview)}
              image={poster_path}
              releaseDate={release_date}
            />
          ))}
        </div>
      )}
    </div>
  );
}
