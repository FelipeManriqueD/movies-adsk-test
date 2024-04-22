import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="shadow-md bg-gray-400">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-white sm:text-center dark:text-gray-400">
          © 2024{" "}
          <Link to={'/'} className="hover:underline">
            Movies App
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
