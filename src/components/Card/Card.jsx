import { imageBaseURL } from "../../utils/constants";

export default function Card({
  title,
  image,
  releaseDate,
  description,
  shouldAddToFavorite = false,
  onClick,
}) {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-full">
      <img
        className="object-cover w-full h-96 md:h-auto rounded-t-lg"
        src={`${imageBaseURL}${image}`}
        alt=""
      />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <h6 className="mb-3 font-bold text-gray-700 dark:text-gray-400">
          {releaseDate}
        </h6>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        {shouldAddToFavorite && (
          <button
            onClick={onClick}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            Add To Favorites
          </button>
        )}
      </div>
    </div>
  );
}
