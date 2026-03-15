import { auth } from "../firebase";
import { signOut } from "firebase/auth";

// ✅ Check if user is logged in
export const isLoggedIn = () => {
  return !!auth.currentUser || !!localStorage.getItem("user");
};

// ✅ Logout
export const logout = async () => {
  await signOut(auth);
  localStorage.removeItem("user");
};
