import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Header() {
  const user = useSelector((state) => state.login);
  const dispatch = useDispatch();
  return (
    <header className="shadow-md bg-gray-400">
      <div className="container mx-auto flex justify-between items-center py-4 px-8">
        {/* Logo */}
        <div className="flex items-center">
          <Link to={"/"} className="text-lg font-semibold text-gray-800">
            Movies App
          </Link>
        </div>
        {/* Navigation */}
        {user.isLoggedIn && (
          <nav className="hidden md:flex space-x-4">
            <Link to={"/home"} className="text-gray-600 hover:text-gray-800">
              Home
            </Link>
            <Link
              to={"/favorite"}
              className="text-gray-600 hover:text-gray-800"
            >
              Favorites
            </Link>
          </nav>
        )}
        {/* Login */}
        <div className="md:flex items-center">
          <Link
            to={!user.isLoggedIn ? "/login" : "/"}
            className="text-gray-600 hover:text-gray-800"
            onClick={() => {
              if (user.isLoggedIn) {
                dispatch({
                  type: "LOGOUT",
                });
              }
            }}
          >
            {!user.isLoggedIn ? "Login" : "Logout"}
          </Link>
        </div>
        {/* Mobile menu button (hidden on larger screens) */}
        <div className="md:hidden flex items-center">
          <button
            id="mobile-menu-button"
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile menu (hidden on larger screens) */}
      <div id="mobile-menu" className="md:hidden bg-white">
        <div className="px-4 py-2">
          <a
            href="#"
            className="block text-gray-600 py-2 border-b border-gray-200"
          >
            Home
          </a>
          <a
            href="#"
            className="block text-gray-600 py-2 border-b border-gray-200"
          >
            About
          </a>
          <a
            href="#"
            className="block text-gray-600 py-2 border-b border-gray-200"
          >
            Services
          </a>
          <a
            href="#"
            className="block text-gray-600 py-2 border-b border-gray-200"
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
}
