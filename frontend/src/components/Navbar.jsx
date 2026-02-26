import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, logout } from "../utils/auth";
import { toast } from "react-toastify";

export default function Navbar() {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();

  const handleLogout = () => {
    logout();
    toast.success("Logout successful ✅");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">
        <Link to="/">MyBlog</Link>
      </h1>

      <ul className="flex gap-6 items-center">
        <li>
          <Link to="/" className="hover:text-blue-400">
            Home
          </Link>
        </li>

        <li>
          <Link to="/about" className="hover:text-blue-400">
            About
          </Link>
        </li>

        {loggedIn && (
          <>
            <li>
              <Link to="/create" className="hover:text-blue-400">
                Create Blog
              </Link>
            </li>

            <li>
              <Link to="/dashboard" className="hover:text-blue-400">
                Dashboard
              </Link>
            </li>
          </>
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
