import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, logout } from "../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Link to="/">MyBlog</Link>
      </h1>

      <ul className="flex gap-6 items-center">
        <li>
          <Link to="/" className="hover:text-blue-400">
            Home
          </Link>
        </li>

        {loggedIn && (
          <li>
            <Link to="/create" className="hover:text-blue-400">
              Create Blog
            </Link>
          </li>
        )}

        {!loggedIn ? (
          <>
            <li>
              <Link to="/login" className="hover:text-blue-400">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-blue-400">
                Register
              </Link>
            </li>
          </>
        ) : (
          <li>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
