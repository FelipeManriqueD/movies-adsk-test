import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

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
            <NavLink
              to={"/home"}
              className={({ isActive }) =>
                isActive
                  ? "text-gray-800 hover:text-gray-800"
                  : "text-gray-600 hover:text-gray-800"
              }
            >
              Home
            </NavLink>
            <NavLink
              to={"/favorite"}
              className={({ isActive }) =>
                isActive
                  ? "text-gray-800 hover:text-gray-800"
                  : "text-gray-600 hover:text-gray-800"
              }
            >
              Favorites
            </NavLink>
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
      </div>
    </header>
  );
}
